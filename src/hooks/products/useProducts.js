import { useState, useEffect } from 'react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'
import { notifyEdit, notifyEdit2 } from 'src/utils/util'
import { useDelete } from '../general/useDelete'
import { useDeleteMarked } from '../general/useDeleteMarked'

export const useProducts = () => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [links, setLinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [categoryFilter, setCategoryFilter] = useState()
  const [searchQuery, setSearchQuery] = useState('')
  // const [loadingSwitch, setLoadingSwitch] = useState(false)
  const [loadingId, setLoadingId] = useState()
  const [sortKey, setSortKey] = useState('')
  const [selectedProduct, setSelectedProduct] = useState()
  const [productDialog, setProductDialog] = useState(false)
  const [loadingOfferId, setLoadingOfferId] = useState()
  const [offerDialog, setOfferDialog] = useState(false)
  const [discount, setDiscount] = useState('')
  const [offerId, setOfferId] = useState('')

  const truncateDescription = (description, maxLength) => {
    if (description.length > maxLength) {
      return description.slice(0, maxLength) + '...'
    }
    return description
  }

  const openOfferDialog = (id, itemDiscount) => {
    setDiscount(itemDiscount)
    setOfferId(id)
    setOfferDialog(true)
  }

  const getProducts = async () => {
    setLoading(true)
    const response = await fetch(`${API_ROUTE}/products?page=${currentPage}`)
    const data = await response.json()
    setProducts(data['data'])
    setLinks(data['links'])
    setLoading(false)
  }

  const getFilteredProducts = async () => {
    const response = await fetch(`${API_ROUTE}/search_product/${searchQuery}`)
    const data = await response.json()
    setProducts(data.products)
    setLoading(false)
  }

  const getProductsByCategory = async () => {
    const response = await fetch(`${API_ROUTE}/products_by_category/${categoryFilter}`)
    const data = await response.json()
    setProducts(data['products'])
    setLoading(false)
  }

  const updateAvailability = async (id, availability) => {
    setLoadingId(id)
    const updatedProducts = products.map((product) =>
      product.id === id
        ? { ...product, available: availability === 'true' ? 'false' : 'true' }
        : product,
    )
    setProducts(updatedProducts)

    const formData = new FormData()
    formData.append('product_id', id)
    formData.append('available', availability === 'true' ? 'false' : 'true')

    try {
      await axios.post(`${API_ROUTE}/update_product_status`, formData)
      notifyEdit2()
      setLoadingId(null)
    } catch (error) {
      console.error(error)
      const failedProductsUpdate = products.map((product) =>
        product.id === id ? { ...product, available: availability } : product,
      )
      setProducts(failedProductsUpdate)
    }
  }
  const updateOffer = async (id, isOffer) => {
    setLoadingOfferId(id)
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, is_offer: isOffer === 'true' ? 'false' : 'true' } : product,
    )
    setProducts(updatedProducts)

    const formData = new FormData()
    formData.append('product_id', id)
    formData.append('is_offer', isOffer === 'true' ? 'false' : 'true')
    formData.append('discount_percentage', discount)

    try {
      await axios.post(`${API_ROUTE}/update_product_is_offer_status`, formData)
      notifyEdit2()
      setLoadingOfferId(null)
    } catch (error) {
      console.error(error)
      const failedProductsUpdate = products.map((product) =>
        product.id === id ? { ...product, is_offer: isOffer } : product,
      )
      setProducts(failedProductsUpdate)
    }
    setOfferDialog(false)
  }

  const { showDialog, confirmDelete, executeDelete, cancelDelete } = useDelete(
    'products',
    getProducts,
  )

  const {
    showDeleteDialog,
    markedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  } = useDeleteMarked(products, 'products', getProducts)

  useEffect(() => {
    getProducts()
  }, [currentPage])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      getProducts()
    } else {
      getFilteredProducts()
    }
  }, [searchQuery])

  useEffect(() => {
    if (categoryFilter === '') {
      getProducts()
    } else {
      getProductsByCategory()
    }
  }, [categoryFilter])

  const handlePageClick = (page) => {
    setCurrentPage(page)
  }

  const handleDeletePage = () => {
    deleteMarked()
    setCurrentPage(1)
  }

  const handleOnDragEnd = async (result) => {
    if (!result.destination) return
    const items = Array.from(products)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    console.log(result)

    setProducts(items)
    try {
      await axios.put(`${API_ROUTE}/products/${result.draggableId}/order-number`, {
        order_number: result.destination.index + 1,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    products,
    loading,
    showDialog,
    confirmDelete,
    executeDelete,
    cancelDelete,
    handlePageClick,
    truncateDescription,
    categoryFilter,
    setCategoryFilter,
    toggleMarkedItem,
    markedItems,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
    showDeleteDialog,
    currentPage,
    setCurrentPage,
    links,
    updateAvailability,
    searchQuery,
    setSearchQuery,
    handleDeletePage,
    loadingId,
    setProducts,
    handleOnDragEnd,
    sortKey,
    setSortKey,
    selectedProduct,
    setSelectedProduct,
    productDialog,
    setProductDialog,
    updateOffer,
    loadingOfferId,
    offerDialog,
    setOfferDialog,
    discount,
    setDiscount,
    openOfferDialog,
    offerId,
  }
}
