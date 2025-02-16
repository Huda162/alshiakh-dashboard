/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { CAlert, CButton, CCardBody, CCol, CForm, CFormInput, CRow } from '@coreui/react'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useCoponAdding } from 'src/hooks/copons/useCoponAdding'
import PageTitle from 'src/components/PageTitle'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import { PlusCircle } from 'phosphor-react'
import { Theme } from 'src/constants/colors'
import { useCurrency } from 'src/hooks/general/useCurrency'

const AddCopon = () => {
  const {
    code,
    setCode,
    loading,
    visible,
    setVisible,
    valueNIS,
    setValueNIS,
    handleSubmit,
    validated,
    name,
    setName,
    endDate,
    setEndDate,
    // valueJUD,
    // valueUSD,
    // setValueUSD,
    // setValueJUD,
  } = useCoponAdding()
  const { isNIS, isJUD, isUSD } = useCurrency()
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="كوبون جديد" icon={<PlusCircle size={25} />} />
        <AppBreadcrumb />
        <AppCard>
          <CCardBody>
            <div className="column">
              <div className="row">
                <div className="col">
                  <CForm
                    className="row g-3 needs-validation"
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <CCol md={12}>
                      <CFormInput
                        type="text"
                        placeholder="الاسم"
                        feedbackInvalid="الاسم مطلوب"
                        id="categoryNameAr"
                        label="الاسم"
                        required
                        onChange={(e) => {
                          setName(e.target.value)
                        }}
                        value={name}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="text"
                        placeholder="الكود"
                        feedbackInvalid="الكود مطلوب"
                        id="categoryNameAr"
                        label="الكود"
                        required
                        onChange={(e) => {
                          setCode(e.target.value)
                        }}
                        value={code}
                      />
                    </CCol>
                    <CCol md={6}>
                      <CFormInput
                        type="date"
                        placeholder="تاريخ الانتهاء"
                        feedbackInvalid="تاريخ الانتهاء مطلوب"
                        id="categoryNameAr"
                        label="تاريخ الانتهاء"
                        required
                        onChange={(e) => {
                          setEndDate(e.target.value)
                        }}
                        value={endDate}
                      />
                    </CCol>
                    {isNIS === 'true' && (
                      <CCol>
                        <CFormInput
                          type="text"
                          placeholder="القيمة بالشيكل"
                          feedbackInvalid="قيمة الكوبون بالشيكل مطلوبة"
                          id="categoryNameAr"
                          label="القيمة بالشيكل"
                          required
                          onChange={(e) => {
                            setValueNIS(e.target.value)
                          }}
                          value={valueNIS}
                        />
                      </CCol>
                    )}
                    {/* {isUSD === 'true' && (
                      <CCol>
                        <CFormInput
                          type="text"
                          placeholder="القيمة بالدولار"
                          feedbackInvalid="قيمة الكوبون بالدولار مطلوبة"
                          id="categoryNameAr"
                          label="القيمة بالدولار"
                          required
                          onChange={(e) => {
                            setValueUSD(e.target.value)
                          }}
                          value={valueUSD}
                        />
                      </CCol>
                    )} */}
                    {/* {isJUD === 'true' && (
                      <CCol>
                        <CFormInput
                          type="text"
                          placeholder="القيمة بالدينار"
                          feedbackInvalid="قيمة الكوبون بالدينار مطلوبة"
                          id="categoryNameAr"
                          label="القيمة بالدينار"
                          required
                          onChange={(e) => {
                            setValueJUD(e.target.value)
                          }}
                          value={valueJUD}
                        />
                      </CCol>
                    )} */}

                   
                    <div>
                      {loading ? (
                        <Spinner animation="border" role="status" style={{ margin: '10px' }}>
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <CButton
                          style={{
                            width: '200px',
                            marginTop: '30px',
                            backgroundColor: Theme.primary1,
                            border: 'none',
                          }}
                          type="submit"
                        >
                          <span style={{ fontWeight: 'bolder' }}>اضافه كوبون</span>
                        </CButton>
                      )}
                    </div>
                    <CAlert
                      color="danger"
                      dismissible
                      visible={visible}
                      onClose={() => setVisible(false)}
                    >
                      حصل خلل أثناء العملية، يرجى المحاولة فيما بعد
                    </CAlert>
                  </CForm>
                </div>
              </div>
            </div>
          </CCardBody>
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}
export default AddCopon
