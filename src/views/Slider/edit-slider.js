/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React from 'react'
import { CAlert, CButton, CCardBody, CCol, CFormCheck, CFormSelect, CRow } from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSliderEditing } from 'src/hooks/sliders/useSliderEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { NotePencil } from 'phosphor-react'
import { Theme } from 'src/constants/colors'
import image from '../../assets/images/image.png'

const EditSlider = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item

  const {
    sliderPic,
    sliderPicMobile,
    products,
    productID,
    setProductID,
    image: imagePC,
    setImage,
    image_mobile,
    setImageMobile,
    loading,
    update,
    visible,
    setVisible,
    type,
    setType,
    categories,
  } = useSliderEditing(params.id, item)

  if (!item) {
    return <div>Product not found</div>
  }

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل الشريحة" icon={<NotePencil size={25} />} />
        <AppBreadcrumb />
        <AppCard>
          <CCardBody>
            <div className="column">
              {' '}
              <div className="row md-12" style={{ marginTop: '15px' }}>
                <div className="col" style={{ width: '100%' }}>
                  <label className="form-label">صورة الشريحة</label>

                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                    name="product_pic"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                  {imagePC ? (
                    <img
                      src={imagePC ? URL.createObjectURL(imagePC) : image}
                      onError={(e) => {
                        e.target.onError = null
                        e.target.src = image
                      }}
                      alt="picture"
                      width={300}
                      height={300}
                      style={{ margin: '10px' }}
                    />
                  ) : (
                    <img
                      src={sliderPic ? sliderPic : image}
                      onError={(e) => {
                        e.target.onError = null
                        e.target.src = image
                      }}
                      width={300}
                      height={300}
                      style={{ margin: '10px' }}
                    />
                  )}
                </div>
                <div className="col">
                  <label className="form-label">صورة شريحة الموبايل</label>

                  <input
                    className="form-control form-control-sm"
                    id="formFileSm"
                    type="file"
                    name="product_pic"
                    onChange={(e) => setImageMobile(e.target.files[0])}
                  />
                  {image_mobile ? (
                    <img
                      src={image_mobile ? URL.createObjectURL(image_mobile) : image}
                      onError={(e) => {
                        e.target.onError = null
                        e.target.src = image
                      }}
                      alt="picture"
                      width={300}
                      height={300}
                      style={{ margin: '10px' }}
                    />
                  ) : (
                    <img
                      src={sliderPicMobile ? sliderPicMobile : image}
                      onError={(e) => {
                        e.target.onError = null
                        e.target.src = image
                      }}
                      width={300}
                      height={300}
                      style={{ margin: '10px' }}
                    />
                  )}
                </div>
                <CCol md={12}>هذه الشريحة تابعة لـ</CCol>
                <CCol md={2} className="d-flex justify-content-between">
                  <CFormCheck
                    button={{ color: 'success', variant: 'outline' }}
                    type="radio"
                    name="options-outlined"
                    id="success-outlined"
                    autoComplete="off"
                    label="منتج"
                    value="product"
                    checked={type === 'product'}
                    onChange={(e) => {
                      setType(e.target.value)
                    }}
                  />
                  <CFormCheck
                    button={{ color: 'success', variant: 'outline' }}
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
                {type == 'product' ? (
                  <CCol md={12}>
                    <CFormSelect
                      id="productCategory"
                      label="اختر المنتج"
                      feedbackInvalid=" المنتج مطلوب"
                      required
                      value={productID}
                      onChange={(e) => setProductID(e.target.value)}
                    >
                      <option selected="" value=""> اختر المنتج</option>
                      {products.map((item, index) => (
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
                      <option selected="" value=""> اختر القسم</option>
                      {categories.map((item, index) => (
                        <option value={item.id} key={item.id}>
                          {item.name_ar}
                        </option>
                      ))}
                    </CFormSelect>
                  </CCol>
                )}
              </div>
            </div>
            {loading ? (
              <Spinner animation="border" role="status">
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
                onClick={update}
              >
                <span style={{ fontWeight: 'bolder' }}>حفظ</span>
              </CButton>
            )}
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
              حصل خلل أثناء العملية، يرجى المحاولة فيما بعد
            </CAlert>
          </CCardBody>
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default EditSlider
