import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../categories/useCategories'
import { useFormValidation } from '../general/useFormValidation'
import { useLanguage } from '../general/useLanguage'
import { useBrands } from '../brands/useBrands'

export const useProductAdding = () => {
  const navigate = useNavigate()
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const [productNameAr, setProductNameAr] = useState('')
  const [productNameEng, setProductNameEng] = useState('')
  const [productNameHeb, setProductNameHeb] = useState('')
  const [loading, setLoading] = useState(false)
  const [productPriceNIS, setProductPriceNIS] = useState('0')
  const [productPriceUSD, setProductPriceUSD] = useState('0')
  const [productPriceJOD, setProductPriceJOD] = useState('0')
  const [images, setImages] = useState([])
  const [productVideo, setProductVideo] = useState(null)
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEng, setDescriptionEng] = useState('')
  const [descriptionHeb, setDescriptionHeb] = useState('')
  const [categoryID, setCategoryID] = useState('')
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [isMultipleSize, setIsMultipleSize] = useState(false)
  const [isMultipleColor, setIsMultipleColor] = useState(false)
  const { categories } = useCategories()
  const { brands } = useBrands()
  const [brandId, setBrandId] = useState('')
  const [visible, setVisible] = useState(false)
  const [hex, setHex] = useState('')
  const [colorImage, setColorImage] = useState()
  const [colorCode, setColorCode] = useState()
  const [editedColor, setEditedColor] = useState(null)
  const [isOffer, setIsOffer] = useState(false)
  const [discountPercentage, setDiscountPercentage] = useState(0)
  const [uploadProgress, setUploadProgress] = useState({
    file: null,
    progress: 0,
    visible: false,
    status: null,
  })

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setProductVideo(file)
    if (file.type.startsWith('video/')) {
      const reader = new FileReader()
      reader.onloadstart = () => {
        setUploadProgress({ file, progress: 0, visible: true, status: null })
      }
      reader.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded * 100) / event.total)
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            progress,
          }))
        }
      }
      reader.onloadend = () => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          progress: 100,
          status: 'success',
        }))
        setTimeout(() => {
          setUploadProgress((prevProgress) => ({
            ...prevProgress,
            visible: false,
          }))
        }, 1000)
      }
      reader.onerror = () => {
        setUploadProgress((prevProgress) => ({
          ...prevProgress,
          visible: false,
          status: 'failure',
        }))
      }
      reader.readAsDataURL(file)
    } else {
      setUploadProgress({ file, progress: 100, visible: false, status: 'success' })
    }
  }

  const addProduct = async () => {
    setLoading(true)

    let formData = new FormData()
    console.log('start filling form', colors)
    images.forEach((image, index) => {
      formData.append(`image[${index}]`, image)
      if (index === images.length - 1 && productVideo !== null) {
        formData.append(`image[${index + 1}]`, productVideo)
      }
    })

    if (sizes.length > 0) {
      sizes.forEach((size, index) => {
        formData.append(`size[${index}]`, size.size)
        formData.append(`size_price_nis[${index}]`, size.priceNIS)
        formData.append(`size_price_usd[${index}]`, size.priceUSD)
      })
    }
    if (colors.length > 0) {
      colors.forEach((color, index) => {
        formData.append(`color[${index}]`, color.color)
        formData.append(`color_image[${index}]`, color.image)
        formData.append(`color_code[${index}]`, color.code)
      })
    }

    isArabic === 'true'
      ? formData.append('name_ar', productNameAr)
      : formData.append('name_ar', 'empty')
    isEnglish === 'true'
      ? formData.append('name_en', productNameEng)
      : formData.append('name_en', 'empty')
    isHebrew === 'true'
      ? formData.append('name_he', productNameHeb)
      : formData.append('name_he', 'empty')
    isArabic === 'true'
      ? formData.append('description_ar', descriptionAr)
      : formData.append('description_ar', 'empty')
    isEnglish === 'true'
      ? formData.append('description_en', descriptionEng)
      : formData.append('description_en', 'empty')
    isHebrew === 'true'
      ? formData.append('description_he', descriptionHeb)
      : formData.append('description_he', 'empty')
    formData.append('price_nis', productPriceNIS)
    formData.append('price_usd', productPriceUSD)
    formData.append('price_jod', productPriceJOD)
    formData.append('category_id', categoryID)
    formData.append('available', true)
    formData.append('is_offer', isOffer)
    formData.append('discount_percentage', discountPercentage)
    formData.append('brand_id', brandId)
    console.log(formData.getAll('name_ar'))
    const resGet = await axios
      .post(`${API_ROUTE}/products`, formData)
      .then((response) => {
        setLoading(false)
        notifyAdd()
        setTimeout(() => {
          navigate('/products')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
    setLoading(false)
  }

  const { handleSubmit, validated, checkValidated, setCheckValidated } =
    useFormValidation(addProduct)
  useEffect(() => {
    if (colors.length < 1 && isMultipleColor) {
      setCheckValidated(false)
    } else {
      setCheckValidated(true)
    }
  }, [isMultipleColor, colors])

  const handleSizeChange = (index, field, event) => {
    const newSize = [...sizes]
    newSize[index][field] = event.target.value
    setSizes(newSize)
  }
  const addSize = () => {
    setSizes([...sizes, { size: '', priceNIS: '0', priceUSD: '0', priceJOD: '0' }])
  }

  const deleteSize = (index) => {
    const newSize = sizes.filter((size, sizeIndex) => sizeIndex !== index)
    setSizes(newSize)
  }

  const addColor = () => {
    setColors([...colors, { color: hex, image: colorImage, code: colorCode }])
    setHex('')
    setColorCode('')
    setColorImage(undefined)
    console.log(colors)
  }

  const deleteColor = (index) => {
    const newColors = colors.filter((color, colorIndex) => colorIndex !== index)
    setColors(newColors)
  }

  const editColor = (index) => {
    const newColors = [...colors]
    newColors[index] = { color: hex, image: colorImage, code: colorCode }
    setColors(newColors)
    setEditedColor(null)
    setHex('')
    setColorCode('')
    setColorImage(undefined)
  }
  return {
    productNameAr,
    setProductNameAr,
    loading,
    images,
    setImages,
    descriptionAr,
    setDescriptionAr,
    categoryID,
    setCategoryID,
    categories,
    sizes,
    setSizes,
    isMultipleSize,
    setIsMultipleSize,
    addProduct,
    handleSizeChange,
    addSize,
    handleSubmit,
    validated,
    visible,
    setVisible,
    deleteSize,
    productNameEng,
    setProductNameEng,
    productNameHeb,
    setProductNameHeb,
    descriptionEng,
    setDescriptionEng,
    descriptionHeb,
    setDescriptionHeb,
    isMultipleColor,
    setIsMultipleColor,
    colors,
    setColors,
    hex,
    setHex,
    colorImage,
    setColorImage,
    addColor,
    deleteColor,
    editColor,
    editedColor,
    setEditedColor,
    productPriceJOD,
    productPriceNIS,
    productPriceUSD,
    setProductPriceJOD,
    setProductPriceNIS,
    setProductPriceUSD,
    handleFileChange,
    uploadProgress,
    productVideo,
    setProductVideo,
    checkValidated,
    setCheckValidated,
    brands,
    brandId,
    setBrandId,
    isOffer,
    setIsOffer,
    discountPercentage,
    setDiscountPercentage,
    colorCode,
    setColorCode,
  }
}
