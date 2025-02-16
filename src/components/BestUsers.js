import { CButton, CCard, CCardBody, CCol } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import React from 'react'
import { CaretCircleLeft, CrownSimple, NumberOne, NumberThree, NumberTwo } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { useWidth } from 'src/hooks/general/useWidth'

const BestUsers = () => {
  const { bestUsers, loading } = useDashboard()
  const navigate = useNavigate()
  const { width } = useWidth()
  console.log(bestUsers)
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
          onClick={() => navigate('/users')}
        >
          ...جميع المستخدمين <CaretCircleLeft size={20} />
        </CButton>
        <CCardBody
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h4 style={{ fontWeight: 'bold' }}>أفضل المستخدمين</h4>
          {loading ? (
            <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <>
              {bestUsers?.map((item, index) => (
                <div key={index} style={{ width: '100%' }}>
                  {item.user !== null && (
                    <div
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
                          //   borderBottom: '1px solid #c8c8c8',
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
                          {index === 0 ? (
                            <CrownSimple size={20} color="#ffdf00" weight="fill" />
                          ) : null}
                          {index === 0 ? (
                            <NumberOne size={20} color="#ffdf00" weight="bold" />
                          ) : null}
                          {index === 1 ? <NumberTwo size={20} color="gray" weight="bold" /> : null}
                          {index === 2 ? (
                            <NumberThree size={20} color="#ce8946" weight="bold" />
                          ) : null}
                        </h4>
                        <h5 style={{ padding: '1rem' }}>{item.user?.name}</h5>
                      </div>
                      <div
                        style={{
                          width: '35%',
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <h6>عمليات الشراء:</h6>
                        <h6>{item.total_orders}</h6>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </CCardBody>
      </CCard>
    </CCol>
  )
}

export default BestUsers
