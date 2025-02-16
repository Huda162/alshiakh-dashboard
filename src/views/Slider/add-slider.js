/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormSelect,
  CRow,
} from '@coreui/react'
import { PlusCircle } from 'phosphor-react'
import { Spinner } from 'react-bootstrap/esm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AppBreadcrumb } from 'src/components'
import AppCard from 'src/components/AppCard'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import { useAllProducts } from 'src/hooks/general/useAllProducts'
import { useSliderAdding } from 'src/hooks/sliders/useSliderAdding'
const AddSlider = () => {
  const {
    sliderImage,
    setSliderImage,
    sliderImageMobile,
    setSliderImageMobile,
    // products,
    productID,
    setProductID,
    loading,
    handleSubmit,
    validated,
    visible,
    setVisible,
    categories,
    type,
    setType,
  } = useSliderAdding()
  const { products } = useAllProducts()
  console.log(products)
  return (
    <CRow>
      <CCol xs>
        <PageTitle title="شريحة جديدة" icon={<PlusCircle size={25} />} />
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
                    <div className="mb-3">
                      <CFormInput
                        label="الصورة"
                        type="file"
                        id="Pic"
                        feedbackInvalid="الصورة مطلوبة"
                        required
                        onChange={(e) => {
                          setSliderImage(e.target.files[0])
                        }}
                      />
                      {sliderImage && (
                        <img
                          src={sliderImage ? URL.createObjectURL(sliderImage) : ''}
                          width="250"
                          height="200"
                          alt="slider"
                          style={{ margin: '10px' }}
                        />
                      )}
                    </div>
                    <div className="mb-3">
                      <CFormInput
                        label="صورة الهاتف"
                        type="file"
                        id="phonePic"
                        feedbackInvalid="صورة الهاتف مطلوبة"
                        required
                        onChange={(e) => {
                          setSliderImageMobile(e.target.files[0])
                        }}
                      />
                      {sliderImageMobile && (
                        <img
                          src={sliderImageMobile ? URL.createObjectURL(sliderImageMobile) : ''}
                          width="250"
                          height="200"
                          alt="slider"
                          style={{ margin: '10px' }}
                        />
                      )}
                    </div>
                    <CCol md={12}>هذه الشريحة تابعة لـ</CCol>
                    <CCol md={2} className="d-flex justify-content-between">
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        type="radio"
                        name="options-outlined"
                        id="secondary-outlined"
                        autoComplete="off"
                        label="منتج"
                        value="product"
                        checked={type === 'product'}
                        onChange={(e) => {
                          setType(e.target.value)
                        }}
                      />
                      <CFormCheck
                        button={{ color: 'secondary', variant: 'outline' }}
                        type="radio"
                        name="options-outlined"
                        id="danger-outlined"
                        autoComplete="off"
                        label="قسم رئيسي"
                        value="category"
                        checked={type === 'category'}
                        onChange={(e) => {
                          setType(e.target.value)
                        }}
                      />
                    </CCol>
                    {type === 'product' ? (
                      <CCol md={12}>
                        <CFormSelect
                          id="productCategory"
                          label="اختر المنتج"
                          feedbackInvalid=" المنتج مطلوب"
                          value={productID}
                          onChange={(e) => setProductID(e.target.value)}
                          required
                        >
                          <option selected="" value="">
                            {' '}
                            اختر المنتج
                          </option>
                          {products?.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.name_ar}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    ) : (
                      <CCol md={12}>
                        <CFormSelect
                          id="productCategory"
                          label="اختر القسم"
                          feedbackInvalid=" القسم مطلوب"
                          value={productID}
                          onChange={(e) => setProductID(e.target.value)}
                          required
                        >
                          <option selected="" value="">
                            {' '}
                            اختر القسم
                          </option>
                          {categories.map((item, index) => (
                            <option value={item.id} key={item.id}>
                              {item.name_ar}
                            </option>
                          ))}
                        </CFormSelect>
                      </CCol>
                    )}
                    {loading ? (
                      <Spinner animation="border" role="status" style={{ margin: '20px' }}>
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
                        <span style={{ fontWeight: 'bolder' }}>اضافه شريحة</span>
                      </CButton>
                    )}
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
export default AddSlider
