import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyDelete, notifyEdit, notifyFailed } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useCategories } from '../categories/useCategories'
import { useLanguage } from '../general/useLanguage'
import { useBrands } from '../brands/useBrands'

export const useProductEditing = (productId, item) => {
  const {
    name_ar,
    name_en,
    name_he,
    category_id,
    description_ar,
    description_en,
    description_he,
    price_nis,
    price_usd,
    price_jod,
    images,
    product_sizes,
    product_colors,
    available,
    brand_id,
    is_offer,
    discount_percentage,
  } = item
  const [productNameAr, setProductNameAr] = useState('')
  const [productNameEng, setProductNameEng] = useState('')
  const [productNameHeb, setProductNameHeb] = useState('')
  const [productPriceNIS, setProductPriceNIS] = useState('0')
  const [productPriceUSD, setProductPriceUSD] = useState('0')
  const [productPriceJOD, setProductPriceJOD] = useState('0')
  const [categoryID, setCategoryID] = useState('')
  const [descriptionAr, setDescriptionAr] = useState('')
  const [descriptionEng, setDescriptionEng] = useState('')
  const [descriptionHeb, setDescriptionHeb] = useState('')
  const [image, setImage] = useState([])
  const [imagesURL, setImagesURL] = useState(images)
  const [loading, setLoading] = useState(false)
  const [isAvailable, setIsAvailable] = useState('')
  const { categories } = useCategories()
  const { brands } = useBrands()
  const [brandId, setBrandId] = useState(0)
  const [visible, setVisible] = useState(false)
  const [sizes, setSizes] = useState([])
  const [colors, setColors] = useState([])
  const [hex, setHex] = useState('')
  const [colorImage, setColorImage] = useState()
  const [colorCode, setColorCode] = useState()
  const [ProductVideoEdited, setProductVideoEdited] = useState()
  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const [showDeleteImageDialog, setShowDeleteImageDialog] = useState(false)
  const [deletedImageId, setDeletedImageId] = useState()
  const [deletedImageIndex, setDeletedImageIndex] = useState()
  const [isVideoEdited, setIsVideoEdited] = useState(false)
  const [isMultipleSizes, setIsMultipleSizes] = useState(false)
  const [isMultipleColors, setIsMultipleColors] = useState(false)
  const [showColorDialog, setShowColorDialog] = useState(false)
  const [deletedColorId, setDeletedColorId] = useState()
  const [deletedColorIndex, setDeletedColorIndex] = useState()
  const [newColors, setNewColors] = useState([])
  const [isOffer, setIsOffer] = useState('false')
  const [discountPercentage, setDiscountPercentage] = useState(0)

  const navigate = useNavigate()
  const getProduct = async () => {
    const url = `${API_ROUTE}/products/${productId}`
    const response = await fetch(url)
    const item = await response.json()
    setProductNameAr(item['product']['name_ar'])
    setProductNameEng(item['product']['name_en'])
    setProductNameHeb(item['product']['name_he'])
    setProductPriceNIS(item['product']['price_nis'])
    setProductPriceUSD(item['product']['price_usd'])
    setProductPriceJOD(item['product']['price_jod'])
    setImage(item['product']['images'])
    setCategoryID(item['product']['category_id'])
    setDescriptionAr(item['product']['description_ar'])
    setDescriptionEng(item['product']['description_en'])
    setDescriptionHeb(item['product']['description_he'])
    setSizes(item['product']['product_sizes'])
    setColors(item['product']['product_colors'])
    setIsAvailable(item['product']['available'])
    setBrandId(item['product']['brand_id'] || 0)
    setIsOffer(item['product']['is_offer'])
    setDiscountPercentage(item['product']['discount_percentage'])
    if (colors.length > 0) {
      setIsMultipleColors(true)
    }
    if (sizes.length > 0) {
      setIsMultipleSizes(true)
    }
  }

  useEffect(() => {
    getProduct()
  }, [])

  const startDelete = (id, index) => {
    setShowDeleteImageDialog(true)
    setDeletedImageIndex(index)
    setDeletedImageId(id)
  }

  const cancelDeleteImage = () => {
    setShowDeleteImageDialog(false)
    setDeletedImageIndex(null)
    setDeletedImageId(null)
  }

  const DeleteProductImage = async () => {
    try {
      await axios.delete(`${API_ROUTE}/product-image/${deletedImageId}`)
      notifyDelete()
    } catch (error) {
      console.error(error)
      // notifyFailed()
    } finally {
      setShowDeleteImageDialog(false)
      setImage(image.filter((item, index) => index !== deletedImageIndex))
    }
  }

  const startDeleteColor = (id, index) => {
    setShowColorDialog(true)
    setDeletedColorId(id)
    setDeletedColorIndex(index)
  }

  const cancelDeleteColor = () => {
    setShowColorDialog(false)
    setDeletedColorId(null)
    setDeletedColorIndex(null)
  }

  const deleteProductColor = async () => {
    try {
      await axios.delete(`${API_ROUTE}/product-color/${deletedColorId}`)
      notifyDelete()
    } catch (error) {
      console.error(error)
      // notifyFailed()
    } finally {
      setShowColorDialog(false)
      const colorsAfterDelete = colors.filter(
        (color, colorIndex) => colorIndex !== deletedColorIndex,
      )
      setColors(colorsAfterDelete)
    }
  }

  const update = () => {
    setLoading(true)
    const formData = new FormData()
    {
      isArabic === 'true'
        ? formData.append('name_ar', productNameAr)
        : formData.append('name_ar', 'empty')
    }
    {
      isEnglish === 'true'
        ? formData.append('name_en', productNameEng)
        : formData.append('name_en', 'empty')
    }
    {
      isHebrew === 'true'
        ? formData.append('name_he', productNameHeb)
        : formData.append('name_he', 'empty')
    }
    {
      isArabic === 'true'
        ? formData.append('description_ar', descriptionAr)
        : formData.append('description_ar', 'empty')
    }
    {
      isEnglish === 'true'
        ? formData.append('description_en', descriptionEng)
        : formData.append('description_en', 'empty')
    }
    {
      isHebrew === 'true'
        ? formData.append('description_he', descriptionHeb)
        : formData.append('description_he', 'empty')
    }
    formData.append('price_nis', productPriceNIS)
    formData.append('price_usd', productPriceUSD)
    formData.append('price_jod', productPriceJOD)
    formData.append('category_id', categoryID)
    formData.append('available', isAvailable)
    formData.append('brand_id', brandId)
    formData.append('is_offer', isOffer)
    formData.append('discount_percentage', discountPercentage)
    if (sizes.length > 0) {
      sizes.forEach((size, index) => {
        formData.append(`size[${index}]`, size.size)
        formData.append(`size_price_nis[${index}]`, size.size_price_nis)
        formData.append(`size_price_usd[${index}]`, size.size_price_usd)
        // formData.append(`size_price_jod[${index}]`. size.size_price_jod)
      })
    }
    // console.log(image)
    image.forEach((img, index) => {
      if (isVideoEdited && img.type === 'video') {
      } else {
        formData.append(`image[${index}]`, img)
        if (index === image.length - 1 && isVideoEdited) {
          formData.append(`image[${index + 1}]`, ProductVideoEdited)
        }
      }
    })
    console.log(colors)
    if (newColors.length > 0) {
      newColors.forEach((color, index) => {
        formData.append(`color[${index}]`, color.color)
        formData.append(`color_image[${index}]`, color.color_image)
        formData.append(`color_code[${index}]`, color.color_code)
      })
    }
    axios
      .post(`${API_ROUTE}/products/${productId}?_method=PUT`, formData)
      .then((res) => {
        setLoading(false)
        notifyEdit()
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        setVisible(true)
      })
  }

  const saveAndExit = () => {
    update()
    setTimeout(() => {
      navigate('/products')
    }, 500)
  }

  const saveAndStay = () => {
    update()
    setTimeout(() => {
      getProduct()
    }, 500)
  }

  const handleSizeChange = (index, field, event) => {
    const newSize = [...sizes]
    newSize[index][field] = event.target.value
    setSizes(newSize)
  }
  const addSize = () => {
    setSizes([...sizes, { size: '', priceNIS: '' }])
  }

  const deleteSize = (index) => {
    const newSize = sizes.filter((size, sizeIndex) => sizeIndex !== index)
    setSizes(newSize)
  }

  const addColor = () => {
    setColors([...colors, { color: hex, color_image: colorImage, color_code: colorCode }])
    setNewColors([...newColors, { color: hex, color_image: colorImage, color_code: colorCode }])
    setHex('')
    setColorCode('')
    setColorImage('')
    console.log(colors)
    console.log('newColors', newColors)
  }

  const deleteColor = (index) => {
    const colorsAfterDelete = newColors.filter((color, colorIndex) => colorIndex !== index)
    setColors(colorsAfterDelete)
    setNewColors(colorsAfterDelete)
  }
  return {
    productNameAr,
    productNameEng,
    productNameHeb,
    productPriceNIS,
    setProductPriceNIS,
    productPriceUSD,
    productPriceJOD,
    setProductPriceJOD,
    setProductPriceUSD,
    categories,
    categoryID,
    descriptionAr,
    descriptionEng,
    descriptionHeb,
    image,
    loading,
    isChecked: isAvailable,
    update,
    setProductNameAr,
    setProductNameEng,
    setProductNameHeb,
    setImage,
    setCategoryID,
    setDescriptionAr,
    setDescriptionEng,
    setDescriptionHeb,
    setIsChecked: setIsAvailable,
    visible,
    setVisible,
    sizes,
    handleSizeChange,
    addSize,
    deleteSize,
    colors,
    hex,
    setHex,
    colorImage,
    setColorImage,
    colorCode,
    setColorCode,
    addColor,
    deleteColor,
    imagesURL,
    setImagesURL,
    ProductVideoEdited,
    setProductVideoEdited,
    showDeleteImageDialog,
    setShowDeleteImageDialog,
    DeleteProductImage,
    cancelDeleteImage,
    startDelete,
    isVideoEdited,
    setIsVideoEdited,
    isMultipleSizes,
    isMultipleColors,
    setIsMultipleColors,
    setIsMultipleSizes,
    showColorDialog,
    setShowColorDialog,
    startDeleteColor,
    cancelDeleteColor,
    deleteProductColor,
    saveAndExit,
    brands,
    brandId,
    setBrandId,
    discountPercentage,
    setDiscountPercentage,
    isOffer,
    setIsOffer,
    saveAndStay,
  }
}
