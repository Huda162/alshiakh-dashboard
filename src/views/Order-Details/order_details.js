/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { useData } from 'src/context/DataContext'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { Spinner } from 'react-bootstrap/esm'
import { GoogleMap, Marker } from '@react-google-maps/api'
import { useOrderDetails } from 'src/hooks/orders/useOrderDetails'
import PageTitle from 'src/components/PageTitle'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import { Theme } from 'src/constants/colors'
import OrderCard from 'src/components/OrderCard'
import { Equals, Minus, ShoppingCartSimple, X } from 'phosphor-react'
import image from '../../assets/images/image.png'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useWidth } from 'src/hooks/general/useWidth'

const OrderDetails = () => {
  const { loading, order, OrderDetails, totals, isLoaded, coordinate, setCoordinates } =
    useOrderDetails()
  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  return (
    <>
      <CRow>
        <CCol xs>
          <PageTitle
            title="تفاصيل الطلبية"
            icon={<ShoppingCartSimple size={25} weight="light" />}
          />
          <AppBreadcrumb />
          <AppCard className="mb-2">
            <CCardBody
              className="d-flex justify-content-between"
              style={width < 768 ? { columnGap: 5, flexWrap: 'wrap' } : { columnGap: 5 }}
            >
              <OrderCard title="اسم الزبون:" info={order.customer_name} />
              <OrderCard title="رقم الهاتف:" info={order.phone} />
              <OrderCard title=" المنطقة:" info={order.geoarea} />
              <OrderCard title="المدينة:" info={order.city} />
              <OrderCard
                title="حالة الطلبية:"
                info={
                  order.status === 'pending'
                    ? 'معلق'
                    : order.status === 'in_progress'
                    ? 'في التوصيل'
                    : order.status === 'done'
                    ? 'عالق'
                    : order.status === 'delivered'
                    ? 'تم الاستلام'
                    : order.status === 'cancelled'
                    ? 'ملغي'
                    : ''
                }
              />
            </CCardBody>
            <div
              style={{
                backgroundColor: Theme.base,
                borderRadius: 5,
                boxShadow: `0px 2px 3px #c8c8c8`,
                margin: '1rem',
                padding: '1rem',
                paddingBottom: 0,
                rowGap: 5,
              }}
              className="d-flex justify-content-center align-items-start flex-column"
            >
              <h5 style={{ fontWeight: 'bold' }}>ملاحظات الزبون:</h5>
              <p>{order.note ?? 'لا يوجد ملاحظات'}</p>
            </div>

            <CCardBody className={width > 768 ? 'd-flex flex-row justify-content-between' : ''}>
              {loading ? (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                <div
                  className="rounded my-3"
                  style={
                    width > 768
                      ? {
                          backgroundColor: Theme.white,
                          boxShadow: '0px 2px 3px #c8c8c8',
                          width: '49%',
                          overflowX: 'scroll',
                          padding: '1rem',
                        }
                      : {
                          backgroundColor: Theme.white,
                          boxShadow: '0px 2px 3px #c8c8c8',
                          width: '100%',
                          overflowX: 'scroll',
                          padding: '1rem',
                        }
                  }
                >
                  <h4 style={{ fontWeight: 'bold' }}>منتجات الطلبية</h4>
                  {OrderDetails.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        height: '20vh',
                        borderBottom: '1px solid #c8c8c8',
                        margin: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div
                        style={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingTop: '1rem',
                          paddingBottom: '1rem',
                        }}
                      >
                        <img
                          src={item.product_image ? item.product_image : image}
                          onError={(e) => {
                            e.target.onError = null
                            e.target.src = image
                          }}
                          alt="product"
                          height="90%"
                        />
                        {item.product ? (
                          <div style={{ height: '100%', padding: '1rem' }}>
                            {isArabic === 'true' && <h5>{item.product?.name_ar}</h5>}
                            {/* {isEnglish === 'true' && <h5>{item.product?.name_en}</h5>}
                            {isHebrew === 'true' && <h5>{item.product?.name_he}</h5>} */}
                            <div style={{ display: 'flex' }}>
                              {item.selected_color && (
                                <div
                                  style={{
                                    padding: '0.25rem',
                                    paddingLeft: '0.5rem',
                                    paddingRight: '0.5rem',
                                    backgroundColor: '#e6e6e6',
                                    borderRadius: '20px',
                                    marginTop: '0.5rem',
                                    marginBottom: '0.5rem',
                                    width: '5rem',
                                    height: '2rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  اللون:
                                  <span
                                    style={{
                                      backgroundColor: '#fff',
                                      borderRadius: '20px',
                                      width: '1.5rem',
                                      height: '1.5rem',
                                      display: 'inline-block',
                                    }}
                                  >
                                    {item.selected_color && <>{item.selected_color}</>}
                                  </span>
                                </div>
                              )}
                              {item.selected_size && (
                                <div
                                  style={{
                                    padding: '0.25rem',
                                    paddingLeft: '0.5rem',
                                    paddingRight: '0.5rem',
                                    backgroundColor: '#e6e6e6',
                                    borderRadius: '20px',
                                    marginTop: '0.5rem',
                                    marginBottom: '0.5rem',
                                    width: '5rem',
                                    height: '2rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                  }}
                                >
                                  الحجم:
                                  <span
                                    style={{
                                      borderRadius: '20px',
                                      width: '1.5rem',
                                      height: '1.5rem',
                                      display: 'inline-block',
                                    }}
                                  >
                                    {item.selected_size}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <h5>منتج محذوف</h5>
                        )}
                      </div>
                      <div>
                        <div className="d-flex flex-row">
                          <h5>{item.qty}</h5>
                          <X size={25} weight="light" />
                          <h5>₪{item.price}</h5>
                        </div>
                        <div
                          style={{ color: 'gray' }}
                          className="d-flex flex-row align-items-center justify-content-end"
                        >
                          <h6>₪{item.sum_all}</h6>
                          <Equals size={15} weight="light" color="gray" />
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between align-items-center mx-3">
                    <h4>المجموع: </h4>
                    <h4>₪{totals}</h4>
                  </div>
                </div>
              )}
              <div
                className="rounded my-3"
                style={
                  width > 768
                    ? {
                        backgroundColor: Theme.white,
                        boxShadow: '0px 2px 3px #c8c8c8',
                        width: '49%',
                        overflowX: 'scroll',
                        padding: '1rem',
                      }
                    : {
                        backgroundColor: Theme.white,
                        boxShadow: '0px 2px 3px #c8c8c8',
                        width: '100%',
                        overflowX: 'scroll',
                        padding: '1rem',
                      }
                }
              >
                <h4 style={{ fontWeight: 'bold' }}>حسابات الطلبية</h4>
                <div
                  className="d-flex justify-content-between align-items-center m-4"
                  style={{ borderBottom: '1px solid #c8c8c8' }}
                >
                  <h5> سعر المنتجات: </h5>
                  <h5>₪{totals}</h5>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center m-4"
                  style={{ borderBottom: '1px solid #c8c8c8' }}
                >
                  <h5>سعر التوصيل: </h5>
                  <h5>₪{order.delivery_price}</h5>
                </div>
                <div
                  className="d-flex justify-content-between align-items-center m-4"
                  style={{ borderBottom: '1px solid #c8c8c8' }}
                >
                  <h5>سعر الخصم: </h5>
                  <h5>
                    <Minus size={15} weight="bold" />
                    ₪0
                  </h5>
                </div>
                <div className="d-flex justify-content-between align-items-center m-4">
                  <h5>السعر الإجمالي: </h5>
                  <h5>₪{order.total}</h5>
                </div>
              </div>
            </CCardBody>
          </AppCard>
          <div
            className="rounded my-3 d-flex justify-content-center"
            style={{
              backgroundColor: Theme.white,
              boxShadow: '0px 2px 3px #c8c8c8',
              width: '100%',
              overflowX: 'scroll',
            }}
          >
            {!isLoaded ? (
              <div>Loading map...</div>
            ) : (
              <CCard
                style={{ height: '600px', width: '900px', marginTop: '30px', marginBottom: '10px' }}
              >
                <GoogleMap
                  zoom={10}
                  center={coordinate}
                  mapContainerStyle={{ height: '600px', width: '100%' }}
                >
                  <Marker position={coordinate} />
                </GoogleMap>
              </CCard>
            )}
          </div>
        </CCol>
      </CRow>
    </>
  )
}

export default OrderDetails
