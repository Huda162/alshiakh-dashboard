/* eslint-disable react/jsx-key */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSwitch,
  CPagination,
  CPaginationItem,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTooltip,
} from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap/esm'
import {
  ArrowDown,
  ArrowsDownUp,
  ArrowUp,
  CheckSquare,
  Eye,
  NotePencil,
  Percent,
  Tag,
  Trash,
} from 'phosphor-react'
import Pagination from 'src/components/Pagination'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useProducts } from 'src/hooks/products/useProducts'
import AppDialog from 'src/components/AppDialog'
import { Theme } from 'src/constants/colors'
import PageTitle from 'src/components/PageTitle'
import AppTooltip from 'src/components/Tooltip'
import { AppBreadcrumb } from 'src/components'
import '../../components/test.css'
import { useLanguage } from 'src/hooks/general/useLanguage'
import image from '../../assets/images/image.png'
import EmptyPage from 'src/components/EmptyPage'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ProductDialog from 'src/components/ProductDialog'
import { Input } from 'reactstrap'
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'

const Products = () => {
  const navigate = useNavigate()
  const {
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
    links,
    updateAvailability,
    searchQuery,
    setSearchQuery,
    handleDeletePage,
    loadingId,
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
    offerId
  } = useProducts()

  const { isEnglish, isArabic, isHebrew } = useLanguage()

  return (
    <CRow className="h-100">
      <CCol xs>
        <PageTitle
          title="المنتجات"
          addText="اضافة منتج"
          addPath="add_product"
          filterValue={searchQuery}
          setFilterValue={setSearchQuery}
          filterItems={true}
          addItem={true}
          filterByCategory={true}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          icon={<Tag size={25} />}
          mark={true}
          deleteMarked={handleDeletePage}
          markedItems={markedItems}
        />
        <AppBreadcrumb />

        <div>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {products && products.length > 0 ? (
                <div
                  className="rounded my-3"
                  style={{
                    backgroundColor: Theme.white,
                    boxShadow: '0px 2px 3px #c8c8c8',
                    width: '100%',
                    overflowX: 'scroll',
                  }}
                >
                  <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="products">
                      {(provided) => (
                        <CTable
                          className=" mb-3 products"
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          align="middle"
                          hover
                          responsive
                          striped
                          width={1000}
                        >
                          <CTableHead color="light">
                            <CTableRow>
                              <CTableHeaderCell className="text-center" style={{ width: 100 }}>
                                <CButton
                                  style={{
                                    backgroundColor: Theme.primary1,
                                    border: 'none',
                                  }}
                                  onClick={markAll}
                                >
                                  <CheckSquare size={20} /> الكل
                                </CButton>
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">الاسم</CTableHeaderCell>
                              <CTableHeaderCell>
                                <div className="d-flex h-100 align-items-center justify-content-between">
                                  {sortKey === '' && (
                                    <ArrowsDownUp
                                      size={20}
                                      onClick={() => {
                                        setSortKey('price_asc')
                                      }}
                                      className="hovarableText"
                                    />
                                  )}
                                  {sortKey === 'price_asc' && (
                                    <ArrowDown
                                      size={20}
                                      onClick={() => setSortKey('price_desc')}
                                      style={{ color: Theme.primaryLight, cursor: 'pointer' }}
                                    />
                                  )}
                                  {sortKey === 'price_desc' && (
                                    <ArrowUp
                                      size={20}
                                      onClick={() => {
                                        setSortKey('')
                                      }}
                                      style={{ color: Theme.primaryLight, cursor: 'pointer' }}
                                    />
                                  )}
                                  السعر
                                </div>
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center">الصورة</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">الوصف</CTableHeaderCell>
                              <CTableHeaderCell className="text-center">
                                {' '}
                                الإجراءات{' '}
                              </CTableHeaderCell>
                              <CTableHeaderCell className="text-center"> العروض </CTableHeaderCell>
                              <CTableHeaderCell className="text-center"> متوفر </CTableHeaderCell>
                            </CTableRow>
                          </CTableHead>
                          <CTableBody>
                            {products.map((item, index) => (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <CTableRow
                                    v-for="item in tableItems"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <CTableDataCell className="text-center fw-medium">
                                      <div className="d-flex justify-content-center align-items-center">
                                        <CFormCheck
                                          id="index"
                                          className="customCheckbox"
                                          label=" "
                                          reverse
                                          checked={markedItems.find((id) => id === item.id)}
                                          onChange={() => {
                                            toggleMarkedItem(item.id)
                                          }}
                                        />
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex flex-column h-100 align-items-center">
                                        {isArabic === 'true' && (
                                          <button
                                            className="hovarableText"
                                            onClick={() =>
                                              navigate(`/edit_product/${item.id}`, {
                                                state: { item },
                                              })
                                            }
                                          >
                                            {item.name_ar}
                                          </button>
                                        )}
                                        {isEnglish === 'true' && (
                                          <button
                                            className="hovarableText"
                                            onClick={() =>
                                              navigate(`/edit_product/${item.id}`, {
                                                state: { item },
                                              })
                                            }
                                          >
                                            {item.name_en}
                                          </button>
                                        )}
                                        {isHebrew === 'true' && (
                                          <button
                                            className="hovarableText"
                                            onClick={() =>
                                              navigate(`/edit_product/${item.id}`, {
                                                state: { item },
                                              })
                                            }
                                          >
                                            {item.name_he}
                                          </button>
                                        )}
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      ₪{item.price_nis}
                                    </CTableDataCell>
                                    <CTableDataCell className="text-center">
                                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        {item.images.length > 1 ? (
                                          <div style={{ position: 'relative' }} className="mb-2">
                                            <div
                                              style={{
                                                width: 100,
                                                height: 100,
                                                backgroundColor: Theme.gray,
                                                borderRadius: 5,
                                              }}
                                            />
                                            <div
                                              style={{
                                                width: 100,
                                                height: 100,
                                                backgroundColor: Theme.grayDark,
                                                borderRadius: 5,
                                                position: 'absolute',
                                                top: 4,
                                                right: 4,
                                              }}
                                            />

                                            <img
                                              src={item.images[0] ? item.images[0].url : image}
                                              onError={(e) => {
                                                e.target.onError = null
                                                e.target.src = image
                                              }}
                                              alt={`image-${item.images[0].id}`}
                                              width="100"
                                              height="100"
                                              style={{
                                                boxShadow: '0px 2px 3px #c8c8c8',
                                                borderRadius: 5,
                                                position: 'absolute',
                                                top: 8,
                                                right: 8,
                                                backgroundColor: Theme.base,
                                              }}
                                            />
                                          </div>
                                        ) : (
                                          <img
                                            src={item.images[0] ? item.images[0].url : image}
                                            onError={(e) => {
                                              e.target.onError = null
                                              e.target.src = image
                                            }}
                                            alt={`image-`}
                                            width="100"
                                            height="100"
                                            style={{
                                              boxShadow: '0px 2px 3px #c8c8c8',
                                              borderRadius: 5,
                                            }}
                                          />
                                        )}
                                      </div>
                                    </CTableDataCell>
                                    {item.description_ar !== null ? (
                                      <CTableDataCell className="text-center">
                                        {truncateDescription(item.description_ar, 30)}
                                      </CTableDataCell>
                                    ) : (
                                      <CTableDataCell className="text-center">
                                        لا يوجد وصف
                                      </CTableDataCell>
                                    )}
                                    <CTableDataCell
                                      className="text-center"
                                      style={{ width: '20%' }}
                                    >
                                      <AppTooltip
                                        type="delete"
                                        onClick={() => confirmDelete(item.id)}
                                      />
                                      <AppTooltip
                                        type="edit"
                                        onClick={() =>
                                          navigate(`/edit_product/${item.id}`, { state: { item } })
                                        }
                                      />
                                      <AppTooltip
                                        type="view"
                                        onClick={() => {
                                          setSelectedProduct(item)
                                          setProductDialog(true)
                                        }}
                                      />
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex align-items-center justify-content-center">
                                        {loadingOfferId === item.id ? (
                                          <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </Spinner>
                                        ) : (
                                          <CFormSwitch
                                            size="lg"
                                            id="activeApp"
                                            checked={item.is_offer === 'true'}
                                            style={
                                              item.is_offer === 'true'
                                                ? {
                                                    boxShadow: 'none',
                                                    backgroundColor: Theme.primaryLight,
                                                    borderColor: Theme.primaryLight,
                                                  }
                                                : { boxShadow: 'none' }
                                            }
                                            onChange={() => {
                                              item.is_offer === 'true'
                                                ? updateOffer(item.id, item.is_offer)
                                                : openOfferDialog(item.id, item.discount_percentage)
                                            }}
                                          />
                                        )}
                                      </div>
                                    </CTableDataCell>
                                    <CTableDataCell>
                                      <div className="d-flex align-items-center justify-content-center">
                                        {loadingId === item.id ? (
                                          <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                          </Spinner>
                                        ) : (
                                          <CFormSwitch
                                            size="lg"
                                            id="activeApp"
                                            checked={item.available === 'true'}
                                            style={
                                              item.available === 'true'
                                                ? {
                                                    boxShadow: 'none',
                                                    backgroundColor: Theme.primary1,
                                                    borderColor: Theme.primary1,
                                                  }
                                                : { boxShadow: 'none' }
                                            }
                                            onChange={() => {
                                              updateAvailability(item.id, item.available)
                                            }}
                                          />
                                        )}
                                      </div>
                                    </CTableDataCell>
                                  </CTableRow>
                                )}
                              </Draggable>
                            ))}
                          </CTableBody>
                          {provided.placeholder}
                        </CTable>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              ) : (
                <EmptyPage emptyItems="منتجات" />
              )}
            </>
          )}
        </div>
        {searchQuery.trim() === '' && (
          <CPagination align="center">
            {links &&
              links.map((item, index) => (
                <CPaginationItem
                  active={item.active}
                  key={index}
                  onClick={() => {
                    if (item.url) {
                      const page = new URL(item.url).searchParams.get('page')
                      handlePageClick(Number(page))
                    }
                  }}
                  disabled={item.url == null}
                >
                  {item.label === 'Next &raquo;' ? (
                    <>&raquo;</>
                  ) : item.label === '&laquo; Previous' ? (
                    <>&laquo;</>
                  ) : (
                    <>{item.label}</>
                  )}
                </CPaginationItem>
              ))}
          </CPagination>
        )}
      </CCol>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف هذا المنتج ؟"
        open={showDialog}
        onClose={cancelDelete}
        actionCancel={cancelDelete}
        actionExecute={executeDelete}
        deleteDialog={true}
      />
      <ProductDialog
        product={selectedProduct}
        open={productDialog}
        onClose={() => {
          setProductDialog(false)
          setSelectedProduct(null)
        }}
      />
      <Dialog
        open={offerDialog}
        onClose={() => setOfferDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle
          id="customized-dialog-title"
          color="black"
          style={{ width: '300px', textAlign: 'center', fontSize: '22px' }}
        >
          أضف نسبة خصم
        </DialogTitle>
        <DialogContent>
          <div className="col" style={{ textAlign: '' }}>
            <CFormInput value={discount} onChange={(e) => setDiscount(e.target.value)} />
          </div>
        </DialogContent>
        <DialogActions className="flex justify-content-center">
          <CButton
            onClick={()=>updateOffer(offerId, false)}
            style={{ backgroundColor: Theme.primary1, borderColor: Theme.primary1 }}
          >
            نعم بالتأكيد
          </CButton>
          <CButton
            onClick={() => setOfferDialog(false)}
            style={{ backgroundColor: Theme.primaryRed, margin: '0.5rem', color: Theme.white }}
          >
            إلغاء
          </CButton>
        </DialogActions>
      </Dialog>
      <AppDialog
        title="هل أنت متأكد من رغبتك بحذف جميع المنتجات التي تم تحديدها ؟"
        open={showDeleteDialog}
        onClose={cancelDeleteMarked}
        actionCancel={cancelDeleteMarked}
        actionExecute={executeDeleteMarked}
        deleteDialog={true}
      />
      <ToastContainer />
    </CRow>
  )
}

export default Products
