import { useState } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyAdd } from 'src/utils/util'
import { useNavigate } from 'react-router-dom'
import { useProducts } from '../products/useProducts'
import { useFormValidation } from '../general/useFormValidation'
import { useCategories } from '../categories/useCategories'

export const useSliderAdding = () => {
  const [sliderImage, setSliderImage] = useState('')
  const [sliderImageMobile, setSliderImageMobile] = useState('')
  const [productID, setProductID] = useState('')
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const { products } = useProducts()
  const { categories } = useCategories()
  const navigate = useNavigate()
  const [type, setType] = useState('product')

  const addSlider = async () => {
    setLoading(true)
    let formData = new FormData()
    formData.append('image', sliderImage)
    formData.append('image_mobile', sliderImageMobile)
    formData.append('data_id', productID)
    formData.append('type', type)
    const response = await axios
      .post(`${API_ROUTE}/sliders`, formData)
      .then((res) => {
        setLoading(false)
        notifyAdd()
        setTimeout(() => {
          navigate('/sliders')
        }, 500)
      })
      .catch((err) => {
        console.error(err)
        setLoading(false)
        setVisible(true)
      })
  }

  const { handleSubmit, validated } = useFormValidation(addSlider)
  return {
    sliderImage,
    setSliderImage,
    sliderImageMobile,
    setSliderImageMobile,
    products,
    productID,
    setProductID,
    loading,
    addSlider,
    handleSubmit,
    validated,
    visible,
    setVisible,
    categories,
    type,
    setType,
  }
}
