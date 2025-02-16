import { CButton, CCard, CCardBody, CCol } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import image from '../assets/images/image.png'
import React from 'react'
import { CaretCircleLeft, CrownSimple, NumberOne, NumberThree, NumberTwo } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useWidth } from 'src/hooks/general/useWidth'

export const BestProductsList = () => {
  const navigate = useNavigate()
  const { bestSellingProducts, loading } = useDashboard()
  const { width } = useWidth()
  console.log(bestSellingProducts)
  return (
    <CCol sm={width > 768 ? 6 : 12} lg={width > 768 ? 6 : 12}>
      <CCard
        style={{
          height: '325px',
          backgroundColor: Theme.white,
          boxShadow: '0.5px 2px 3px #c8c8c8',
          border: 'none',
          position: 'relative',
        }}
      >
        <CButton
          style={{
            position: 'absolute',
            border: 'none',
            backgroundColor: 'transparent',
            color: Theme.primary1,
            bottom: 0,
            left: 0,
          }}
          onClick={() => navigate('/products')}
        >
          ...جميع المنتجات <CaretCircleLeft size={20} />
        </CButton>
        <CCardBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4 style={{ fontWeight: 'bold' }}>المنتجات الأعلى مبيعا في الشهر</h4>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {bestSellingProducts?.map((item, index) => (
                <div
                  key={index}
                  style={
                    index === 2
                      ? {
                          width: '100%',
                          height: '75px',
                          padding: '0.5rem',
                          border: 'none',
                          backgroundColor: Theme.white,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }
                      : {
                          width: '100%',
                          height: '75px',
                          padding: '0.5rem',
                          border: 'none',
                          borderBottom: '1px solid #c8c8c8',
                          backgroundColor: Theme.white,
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }
                  }
                >
                  <div
                    key={index}
                    style={{
                      width: '100%',
                      height: '75px',
                      padding: '0.5rem',
                      border: 'none',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <h4
                      style={{
                        padding: '1rem',
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                      }}
                    >
                      {index === 0 ? <CrownSimple size={20} color="#ffdf00" weight="fill" /> : null}
                      {index === 0 ? <NumberOne size={20} color="#ffdf00" weight="bold" /> : null}
                      {index === 1 ? <NumberTwo size={20} color="gray" weight="bold" /> : null}
                      {index === 2 ? <NumberThree size={20} color="#ce8946" weight="bold" /> : null}
                    </h4>
                    <img
                      src={item.images[0] ? item.images[0].url : image}
                      onError={(e) => {
                        e.target.onError = null
                        e.target.src = image
                      }}
                      alt={`image-${item.images[0].id}`}
                      width="15%"
                      height="100%"
                      style={{
                        boxShadow: '0px 2px 3px #c8c8c8',
                        borderRadius: 5,
                      }}
                    />
                    <h5 style={{ padding: '1rem' }}>{item.name_ar}</h5>
                  </div>
                  <h5 style={{ width: '15%' }}>{item.ordered_number} مباع</h5>
                </div>
              ))}
            </>
          )}
        </CCardBody>
      </CCard>
    </CCol>
  )
}
