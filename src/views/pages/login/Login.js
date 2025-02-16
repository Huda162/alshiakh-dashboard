import React, { useEffect } from 'react'
import {
  CButton,
  CCard,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormInput,
  CRow,
} from '@coreui/react'
import { Spinner } from 'react-bootstrap/esm'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material'
import { useLogin } from 'src/hooks/login/useLogin'
import { Theme } from 'src/constants/colors'
import logo from '../../../assets/images/logo.png'
import dashboard from '../../../assets/images/dashboard.png'
import '../../../components/test.css'
import '../../../layout/layout.css'
import { useWidth } from 'src/hooks/general/useWidth'

const Login = () => {
  const {
    phone,
    setPhone,
    password,
    setPassword,
    loading,
    showDialog,
    setShowDialog,
    login,
    rememberMe,
    setRememberMe,
    autoLogin,
  } = useLogin()

  useEffect(() => {
    autoLogin()
  })

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      login()
    }
  }

  const { width } = useWidth()

  return (
    <div className="bg-light w-100 h-100 min-vh-100 d-flex almarai-regular" dir="rtl">
      <CContainer className="d-flex align-items-center justify-content-center w-100 h-100">
        <CRow className="w-100 h-100">
          <CCol
            sm={width > 768 ? 6 : 12}
            className={
              width > 768
                ? 'rounded d-flex flex-column justify-content-center align-items-center px-5'
                : 'rounded d-flex flex-column justify-content-center align-items-center h-100'
            }
            style={
              width > 768
                ? {
                    backgroundColor: Theme.white,
                    boxShadow: '0px 2px 3px #c8c8c8',
                    border: 'none',
                    height: '100vh',
                    position: 'absolute',
                    left: '0px',
                  }
                : {
                    backgroundColor: Theme.white,
                    boxShadow: '0px 2px 3px #c8c8c8',
                    border: 'none',
                    height: '100vh',
                    position: 'absolute',
                    // left: '0px',
                  }
            }
          >
            <CCard
              className={
                width > 768
                  ? 'rounded w-75 m-3 d-flex flex-column justify-content-center align-items-center p-5'
                  : 'rounded w-75 d-flex flex-column justify-content-center align-items-center p-3'
              }
              style={{
                border: 'none',
              }}
            >
              <img src={logo} alt="Logo" width={300} />
              <CForm onKeyPress={handleKeyPress} className="w-100">
                <CRow className=" my-2">
                  <h1 className="text-center almarai-bold">تسجيل الدخول</h1>
                </CRow>
                <CRow className=" my-2" sm={width < 768 ? 12 : ''}>
                  <CFormInput
                    placeholder="رقم الهاتف"
                    autoComplete="username"
                    id="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                    }}
                  />
                </CRow>
                <CRow className="my-2">
                  <CFormInput
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                    type="password"
                    placeholder="كلمة المرور"
                    autoComplete="current-password"
                  />
                </CRow>
                <CRow>
                  <CCol md={5} className="d-flex align-items-center">
                    <CFormCheck
                      id="rememberMe"
                      label="تذكرني"
                      reverse
                      className="customCheckbox"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                  </CCol>
                  <CCol md={7} className="d-flex justify-content-end p-0">
                    <CButton color="white">هل نسيت كلمة المرور؟</CButton>
                  </CCol>
                </CRow>
                {loading ? (
                  <Spinner animation="border" role="status" style={{ margin: '10px' }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  <CRow className=" my-3">
                    <CButton
                      style={{ backgroundColor: Theme.primary1, border: 'none' }}
                      onClick={() => {
                        login()
                      }}
                      disabled={password.trim() === '' || phone.trim() === ''}
                    >
                      تسجيل الدخول
                    </CButton>
                  </CRow>
                )}
              </CForm>
            </CCard>
          </CCol>
          {width > 768 && (
            <CCol
              md={6}
              className="trapezoid d-flex flex-column justify-content-center align-items-center text-white"
              style={{
                backgroundColor: Theme.primary1,
                boxShadow: '0px 2px 3px #c8c8c8',
                border: 'none',
                padding: 15,
                height: '100vh',
              }}
            >
              <h1>Al Shiakh Dashboard</h1>
              {/* <p>لوحة التحكم</p> */}
              <img src={dashboard} alt="login" width={500} />
            </CCol>
          )}
        </CRow>
        <Dialog open={showDialog} onClose={() => setShowDialog(false)}>
          <DialogTitle>رقم الهاتف أو كلمة المرور غير صحيحة. حاول مرة اخرى</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={() => setShowDialog(false)}>حسناً</Button>
          </DialogActions>
        </Dialog>
      </CContainer>
    </div>
  )
}

export default Login
