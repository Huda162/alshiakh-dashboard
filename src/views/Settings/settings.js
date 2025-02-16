import { CAlert, CButton, CCol, CFormCheck, CFormSwitch, CRow } from '@coreui/react'
import { Gear } from 'phosphor-react'
import { Spinner } from 'react-bootstrap'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import { useCurrency } from 'src/hooks/general/useCurrency'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { useSettings } from 'src/hooks/settings/useSettings'
import React from 'react'

const Settings = () => {
  const {
    loading,
    setLoading,
    saveChanges,
    visible,
    setVisible,
    isEnglishTemp,
    isArabicTemp,
    isHebrewTemp,
    isNISTemp,
    isJODTemp,
    isUSDTemp,
    setIsArabicTemp,
    setIsEnglishTemp,
    setIsHebrewTemp,
    setIsNISTemp,
    setIsJODTemp,
    setIsUSDTemp,
  } = useSettings()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="الإعدادات" icon={<Gear size={25} />} />
        <AppBreadcrumb />
        <div>
          <AppCard>
            <p>لغات التطبيق/الموقع</p>
            <div>
              <span style={{ margin: '0px 3px' }}>
                <CFormCheck
                  button={{ color: 'secondary', variant: 'outline' }}
                  id="arabic"
                  autoComplete="off"
                  label="العربية"
                  checked={isArabicTemp === 'true'}
                  onChange={() => {
                    if (isArabicTemp === 'true') {
                      setIsArabicTemp('false')
                    } else {
                      setIsArabicTemp('true')
                    }
                  }}
                />
              </span>
              <span style={{ margin: '0px 3px' }}>
                <CFormCheck
                  button={{ color: 'secondary', variant: 'outline' }}
                  id="english"
                  autoComplete="off"
                  label="الإنجليزية"
                  checked={isEnglishTemp === 'true'}
                  onChange={() => {
                    if (isEnglishTemp === 'true') {
                      setIsEnglishTemp('false')
                    } else {
                      setIsEnglishTemp('true')
                    }
                  }}
                />
              </span>
              <span style={{ margin: '0px 3px' }}>
                <CFormCheck
                  button={{ color: 'secondary', variant: 'outline' }}
                  id="hebrew"
                  autoComplete="off"
                  label="العبرية"
                  checked={isHebrewTemp === 'true'}
                  onChange={() => {
                    if (isHebrewTemp === 'true') {
                      setIsHebrewTemp('false')
                    } else {
                      setIsHebrewTemp('true')
                    }
                  }}
                />
              </span>
            </div>
            <div className="mt-3 border-top py-3">
              <p>عملات التطبيق/الموقع</p>
              <div>
                <span style={{ margin: '0px 3px' }}>
                  <CFormCheck
                    button={{ color: 'secondary', variant: 'outline' }}
                    id="nis"
                    autoComplete="off"
                    label="الشيكل"
                    checked={isNISTemp === 'true'}
                    onChange={() => {
                      if (isNISTemp === 'true') {
                        setIsNISTemp('false')
                      } else {
                        setIsNISTemp('true')
                      }
                    }}
                  />
                </span>
                <span style={{ margin: '0px 3px' }}>
                  <CFormCheck
                    button={{ color: 'secondary', variant: 'outline' }}
                    id="usd"
                    autoComplete="off"
                    label="الدولار"
                    checked={isUSDTemp === 'true'}
                    onChange={() => {
                      if (isUSDTemp === 'true') {
                        setIsUSDTemp('false')
                      } else {
                        setIsUSDTemp('true')
                      }
                    }}
                  />
                </span>
                <span style={{ margin: '0px 3px' }}>
                  <CFormCheck
                    button={{ color: 'secondary', variant: 'outline' }}
                    id="jud"
                    autoComplete="off"
                    label="الدينار"
                    checked={isJODTemp === 'true'}
                    onChange={() => {
                      if (isJODTemp === 'true') {
                        setIsJODTemp('false')
                      } else {
                        setIsJODTemp('true')
                      }
                    }}
                  />
                </span>
              </div>
            </div>
            <div className=" border-top py-3">
              <CFormSwitch size="lg" label=" تفعيل التطبيق/الموقع " id="activeApp" reverse />
            </div>
            {loading ? (
              <Spinner animation="border" role="status" style={{ alignSelf: 'flex-end' }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <CButton
                onClick={saveChanges}
                style={{
                  width: '200px',
                  backgroundColor: Theme.primary1,
                  border: 'none',
                  margin: '5px 3px',
                  alignSelf: 'flex-end',
                }}
              >
                حفظ التغييرات
              </CButton>
            )}
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
              يرجى اختيار لغة واحدة وعملة واحدة على الأقل للتطبيق/الموقع
            </CAlert>
          </AppCard>
          {/* )} */}
        </div>
      </CCol>
    </CRow>
  )
}

export default Settings
