import { useState } from 'react'
import { notifyDelete, notifyFailed } from 'src/utils/util'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'

export const useDeleteMarked = (items, path, refreshFunction) => {
  const [markedItems, setMarkedItems] = useState([])
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const toggleMarkedItem = (id) => {
    if (markedItems.find((itemId) => itemId === id)) {
      const newItems = markedItems.filter((itemId) => itemId !== id)
      setMarkedItems([...newItems])
    } else {
      const newItems = [...markedItems, id]
      setMarkedItems([...newItems])
    }
  }

  const markAll = () => {
    if (markedItems.length === items.length) {
      setMarkedItems([])
    } else {
      const newItems = items.map((item) => item.id)
      setMarkedItems([...newItems])
    }
  }

  const deleteMarked = () => {
    setShowDeleteDialog(true)
  }

  const cancelDeleteMarked = () => {
    setShowDeleteDialog(false)
  }

  const executeDeleteMarked = () => {
    try {
      const newItems = markedItems.map(async (item) => {
        try {
          await axios.delete(`${API_ROUTE}/${path}/${item}`)
        } catch (error) {
          console.error(error)
          notifyFailed()
        } finally {
          refreshFunction()
        }
      })
    } catch (error) {
      console.error(error)
      notifyFailed()
    } finally {
      setShowDeleteDialog(false)
      refreshFunction()
      notifyDelete()
      setMarkedItems([])
    }
  }

  return {
    showDeleteDialog,
    markedItems,
    setMarkedItems,
    toggleMarkedItem,
    markAll,
    deleteMarked,
    cancelDeleteMarked,
    executeDeleteMarked,
  }
}
