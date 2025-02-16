/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap/esm'
import { NotePencil, Trash } from 'phosphor-react'
import axios from 'axios'
import { API_ROUTE } from 'src/routes'

const NotificationFirebase = () => {
  const [Notification, setNotification] = useState([])
  const navigate = useNavigate()
  const [deleteId, setDeleteId] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  const getNotification = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${API_ROUTE}/Notification`)
      const data = await response.json()
      setNotification(data.Notification)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const confirmDelete = (id) => {
    setDeleteId(id)
    setShowDialog(true)
  }

  const cancelDelete = () => {
    setDeleteId(null)
    setShowDialog(false)
  }

  const executeDelete = async () => {
    try {
      await axios.delete(`${API_ROUTE}/Notification/${deleteId}`)
      getNotification()
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteId(null)
      setShowDialog(false)
    }
  }
  useEffect(() => {
    getNotification()
  }, [])
  return (
    <CRow>
      <CCol xs>
        <CCard className="mb-4">
          <CCardHeader> الإشعارات</CCardHeader>
          <CCardBody>
            {/* <CButton
              color="primary"
              style={{ width: '160px', margin: '5px', marginBottom: '10px' }}
              onClick={() => {
                navigate('/add_category')
              }}
            >
              <span style={{ fontWeight: 'bolder' }}>إضافة قسم</span>
            </CButton> */}
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <CTable align="middle" className="mb-0 border" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell className="text-center">الاسم</CTableHeaderCell>
                    <CTableHeaderCell className="text-center">الصورة</CTableHeaderCell>
                    <CTableHeaderCell className="text-center"> الإجراءات </CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {Notification.map((item, index) => (
                    <CTableRow v-for="item in tableItems" key={item.id}>
                      <CTableDataCell className="text-center">{item.name}</CTableDataCell>

                      <CTableDataCell className="text-center">
                        <img src={item.image} alt="image" width="100" height="100" />
                      </CTableDataCell>

                      <CTableDataCell>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <>
                            <div
                              // ref={ref}
                              style={{
                                backgroundColor: '#ff3a31',
                                width: '85px',
                                // margin: '20',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                borderRadius: '10px',
                                padding: '5px',
                                margin: '10px',
                                cursor: 'pointer',
                              }}
                              onClick={() => confirmDelete(item.id)}
                            >
                              <Trash size={22} color="white" />
                              <span style={{ color: 'white' }}>حذف</span>
                            </div>
                          </>
                          <div
                            style={{
                              backgroundColor: '#38b0f1',
                              width: '85px',
                              // margin: '20',
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'space-evenly',
                              borderRadius: '10px',
                              padding: '5px',
                              margin: '10px',
                              cursor: 'pointer',
                            }}
                            onClick={() => navigate(`/edit_category/${item.id}`)}
                          >
                            <NotePencil size={22} weight="duotone" color="white" />
                            <span style={{ color: 'white' }}>تعديل</span>
                          </div>
                        </div>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>
      <Dialog
        open={showDialog}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" color="white" style={{ backgroundColor: '#ff3a31' }}>
          هل أنت متأكد من رغبتك بحذف هذا الاشعار ؟
        </DialogTitle>
        <DialogActions>
          <Button onClick={cancelDelete}>إلغاء</Button>
          <Button onClick={executeDelete} style={{ backgroundColor: '#ff3a31', color: 'white' }}>
            نعم بالتأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </CRow>
  )
}

export default NotificationFirebase
