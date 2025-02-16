/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
  CAlert,
  CButton,
  CCardBody,
  CCol,
  CFormCheck,
  CFormInput,
  CFormSwitch,
  CRow,
} from '@coreui/react'
import { useLocation, useParams } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NotePencil, Trash, X } from 'phosphor-react'
import { Switch } from '@mui/material'
import { useProductEditing } from 'src/hooks/products/useProductEditing'
import PageTitle from 'src/components/PageTitle'
import AppCard from 'src/components/AppCard'
import { AppBreadcrumb } from 'src/components'
import { useLanguage } from 'src/hooks/general/useLanguage'
import { Theme } from 'src/constants/colors'
import { useCurrency } from 'src/hooks/general/useCurrency'
import AppTooltip from 'src/components/Tooltip'
import broken_image from '../../assets/images/image.png'
import { useWidth } from 'src/hooks/general/useWidth'
import { Chrome } from '@uiw/react-color'
import AppDialog from 'src/components/AppDialog'

const EditProduct = () => {
  const params = useParams()
  const { state } = useLocation()
  const item = state?.item
  const {
    productNameAr,
    productNameEng,
    productNameHeb,
    productPriceNIS,
    setProductPriceNIS,
    productPriceUSD,
    productPriceJOD,
    setProductPriceJOD,
    setProductPriceUSD,
    categories,
    categoryID,
    descriptionAr,
    descriptionEng,
    descriptionHeb,
    image,
    loading,
    isChecked,
    update,
    setProductNameAr,
    setProductNameEng,
    setProductNameHeb,
    setImage,
    setCategoryID,
    setDescriptionAr,
    setDescriptionEng,
    setDescriptionHeb,
    setIsChecked,
    visible,
    setVisible,
    sizes,
    handleSizeChange,
    addSize,
    deleteSize,
    colors,
    hex,
    setHex,
    colorImage,
    setColorImage,
    addColor,
    deleteColor,
    ProductVideoEdited,
    setProductVideoEdited,
    showDeleteImageDialog,
    setShowDeleteImageDialog,
    DeleteProductImage,
    cancelDeleteImage,
    startDelete,
    isVideoEdited,
    setIsVideoEdited,
    isMultipleSizes,
    isMultipleColors,
    setIsMultipleColors,
    setIsMultipleSizes,
    showColorDialog,
    setShowColorDialog,
    startDeleteColor,
    cancelDeleteColor,
    deleteProductColor,
    saveAndExit,
    brands,
    brandId,
    setBrandId,
    discountPercentage,
    setDiscountPercentage,
    isOffer,
    setIsOffer,
    saveAndStay,
    colorCode,
    setColorCode,
  } = useProductEditing(params.id, item)

  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()

  if (!item) {
    return <div>Product not found</div>
  }

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="تعديل المنتج" icon={<NotePencil size={25} />} />
        <AppBreadcrumb />
        <AppCard>
          <CCardBody style={{ position: 'relative' }}>
            <div
              className="col-12 flex-row d-flex align-items-center"
              style={{ marginTop: '15px', position: 'absolute', top: -10, right: 0 }}
            >
              <CFormSwitch
                size="lg"
                id="activeApp"
                checked={isChecked === 'true'}
                label="هل المنتج متوفر؟"
                reverse
                style={
                  isChecked === 'true'
                    ? {
                        boxShadow: 'none',
                        backgroundColor: Theme.primary1,
                        borderColor: Theme.primary1,
                        marginLeft: 5,
                      }
                    : { boxShadow: 'none' }
                }
                onChange={() => {
                  isChecked === 'true' ? setIsChecked('false') : setIsChecked('true')
                }}
              />
            </div>
            <div className="column">
              <div className="row pt-5">
                {isArabic === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <label className="form-label">اسم المنتج باللغة العربية</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنتج باللغة العربية "
                      aria-label="First name"
                      name="product_name"
                      value={productNameAr}
                      onChange={(e) => setProductNameAr(e.target.value)}
                    />
                  </CCol>
                )}
                {isEnglish === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <label className="form-label">اسم المنتج باللغة الانجليزية</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنتج باللغة الانجليزية "
                      aria-label="First name"
                      name="product_name"
                      value={productNameEng}
                      onChange={(e) => setProductNameEng(e.target.value)}
                    />
                  </CCol>
                )}
                {isHebrew === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <label className="form-label">اسم المنتج باللغة العبرية</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="اسم المنتج باللغة العبرية "
                      aria-label="First name"
                      name="product_name"
                      value={productNameHeb}
                      onChange={(e) => setProductNameHeb(e.target.value)}
                    />
                  </CCol>
                )}
                <div className="my-3 d-flex ">
                  {isNIS === 'true' && (
                    <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                      <label className="form-label">سعر المنتج بالشيكل</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="سعر المنتج بالشيكل "
                        aria-label="First name"
                        name="product_price"
                        value={productPriceNIS}
                        onChange={(e) => setProductPriceNIS(e.target.value)}
                      />
                    </CCol>
                  )}
                  {isUSD === 'true' && (
                    <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                      <label className="form-label">سعر المنتج بالدولار</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="سعر المنتج بالدولار "
                        aria-label="First name"
                        name="product_price"
                        value={productPriceUSD}
                        onChange={(e) => setProductPriceUSD(e.target.value)}
                      />
                    </CCol>
                  )}
                  {isJUD === 'true' && (
                    <CCol sm={width < 768 ? 12 : null}>
                      <label className="form-label">سعر المنتج بالدينار</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="سعر المنتج بالدينار "
                        aria-label="First name"
                        name="product_price"
                        value={productPriceJOD}
                        onChange={(e) => setProductPriceJOD(e.target.value)}
                      />
                    </CCol>
                  )}
                </div>
              </div>
              <div className="row">
                {isArabic === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <label className="form-label"> الوصف باللغة العربية</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder=" الوصف باللغة العربية "
                      aria-label="First name"
                      name="product_price"
                      value={descriptionAr}
                      onChange={(e) => setDescriptionAr(e.target.value)}
                    />
                  </CCol>
                )}
                {isEnglish === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <label className="form-label"> الوصف باللغة الإنجليزية</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder=" الوصف باللغة الإنجليزية "
                      aria-label="First name"
                      name="product_price"
                      value={descriptionEng}
                      onChange={(e) => setDescriptionEng(e.target.value)}
                    />
                  </CCol>
                )}
                {isHebrew === 'true' && (
                  <CCol sm={width < 768 ? 12 : null}>
                    <label className="form-label"> الوصف باللغة العبرية</label>
                    <textarea
                      type="text"
                      className="form-control"
                      placeholder=" الوصف باللغة العبرية "
                      aria-label="First name"
                      name="product_price"
                      value={descriptionHeb}
                      onChange={(e) => setDescriptionHeb(e.target.value)}
                    />
                  </CCol>
                )}
              </div>
              <div className="col">
                <label className="form-label"> قسم المنتج</label>
                <select
                  className="form-select form-select-sm"
                  value={categoryID}
                  onChange={(e) => setCategoryID(e.target.value)}
                >
                  {categories.map((item, index) => (
                    <option value={item.id} key={item.id}>
                      {item.name_ar}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label className="form-label"> العلامة التجارية للمنتج</label>
                <select
                  className="form-select form-select-sm"
                  value={brandId}
                  onChange={(e) => setBrandId(e.target.value)}
                >
                  <option value="">اختر علامة تجارية ...</option>
                  {brands.map((item, index) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="row" style={{ marginTop: '15px' }}>
              <div className="col-12">
                <label className="form-label">صورة المنتج</label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => {
                    setImage((prevImages) => [...prevImages, ...Array.from(e.target.files)])
                  }}
                  multiple
                />
                {image && image.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {image.map((item, index) => (
                      <div className="m-1" style={{ position: 'relative' }} key={index}>
                        {typeof item.url === 'string' && !item.url.endsWith('.mp4') ? (
                          <div>
                            <X
                              size={15}
                              style={{
                                position: 'absolute',
                                top: 15,
                                right: 5,
                                color: 'white',
                                backgroundColor: '#ff3a31',
                                borderRadius: '80%',
                                cursor: 'pointer',
                              }}
                              onClick={() => startDelete(item.id, index)}
                            />
                            <img
                              src={item.url}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = broken_image
                              }}
                              alt="product"
                              height="200"
                              style={{ margin: '10px' }}
                            />
                          </div>
                        ) : typeof item.url !== 'string' ? (
                          <div>
                            <X
                              size={15}
                              style={{
                                position: 'absolute',
                                top: 15,
                                right: 5,
                                color: 'white',
                                backgroundColor: '#ff3a31',
                                borderRadius: '80%',
                                cursor: 'pointer',
                              }}
                              onClick={() => setImage(image.filter((_, i) => i !== index))}
                            />
                            <img
                              src={URL.createObjectURL(item)}
                              onError={(e) => {
                                e.target.onError = null
                                e.target.src = broken_image
                              }}
                              alt="product"
                              height="200"
                              style={{ margin: '10px' }}
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="col-12">
                <label className="form-label">فيديو المنتج</label>
                <input
                  className="form-control form-control-sm"
                  id="formFileSm"
                  type="file"
                  name="product_pic"
                  onChange={(e) => {
                    setProductVideoEdited(e.target.files[0])
                    setIsVideoEdited(true)
                  }}
                  multiple
                />
                {ProductVideoEdited && (
                  <video width="250" height="200" controls>
                    <source src={URL.createObjectURL(ProductVideoEdited)} type="video/mp4" />
                  </video>
                )}
                <>
                  {image?.map((item, index) => (
                    <div className="m-1" style={{ position: 'relative' }} key={index}>
                      {typeof item.url === 'string' && item.url.endsWith('.mp4') && (
                        <div>
                          <X
                            size={15}
                            style={{
                              position: 'absolute',
                              top: 5,
                              right: -15,
                              color: 'white',
                              backgroundColor: '#ff3a31',
                              borderRadius: '80%',
                              cursor: 'pointer',
                            }}
                            onClick={() => startDelete(item.id, index)}
                          />
                          <video width="250" height="200" controls>
                            <source src={item.url} type="video/mp4" />
                          </video>
                        </div>
                      )}
                    </div>
                  ))}
                </>
              </div>
              <CCol sm={width < 768 ? 12 : null}>
                <label className="form-label">نسبة الخصم</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="نسبة الخصم"
                  aria-label="First name"
                  name="product_price"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(e.target.value)}
                />
              </CCol>
              <CCol md={12}>
                <CFormCheck
                  className="customCheckbox"
                  type="checkbox"
                  id="isOffer"
                  reverse
                  label="إضافة المنتج الى العروض"
                  checked={isOffer === 'true'}
                  onChange={() => {
                    console.log(!isOffer)
                    if (isOffer === 'true') setIsOffer('false')
                    else setIsOffer('true')
                  }}
                />
              </CCol>
              <>
                {colors.length < 1 ? (
                  <CCol md={12}>
                    <CFormCheck
                      className="customCheckbox"
                      type="checkbox"
                      id="multiSize"
                      reverse
                      label="هل المنتج متعدد الألوان؟"
                      checked={isMultipleColors}
                      onChange={() => {
                        setIsMultipleColors(!isMultipleColors)
                      }}
                    />
                  </CCol>
                ) : null}
              </>
              {isMultipleColors || colors.length > 0 ? (
                <>
                  <Chrome
                    style={{ marginLeft: 20 }}
                    color={hex}
                    onChange={(color) => {
                      setHex(color.hex)
                    }}
                  />
                  <CCol md={6}>
                    <div className="mb-3">
                      <CFormInput
                        label="صورة اللون"
                        type="file"
                        id="productPic"
                        onChange={(e) => {
                          setColorImage(e.target.files[0])
                        }}
                      />
                    </div>
                    {colorImage && (
                      <div className="m-1" style={{ position: 'relative', width: '255px' }}>
                        <X
                          size={15}
                          style={{
                            position: 'absolute',
                            top: 15,
                            left: 0,
                            color: 'white',
                            backgroundColor: '#ff3a31',
                            borderRadius: '80%',
                            cursor: 'pointer',
                          }}
                          onClick={() => {
                            setColorImage('')
                          }}
                        />
                        <img
                          src={colorImage ? URL.createObjectURL(colorImage) : ''}
                          // width="250"
                          height="200"
                          alt={`colorImage`}
                          style={{ margin: '10px' }}
                        />
                      </div>
                    )}
                    <CButton
                      onClick={addColor}
                      disabled={colorImage === undefined || hex === ''}
                      style={{
                        width: '200px',
                        backgroundColor: Theme.primaryLight,
                        border: 'none',
                      }}
                    >
                      أضف اللون
                    </CButton>
                  </CCol>
                  <CCol md={3}>
                    <label className="form-label">رمز اللون</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="رمز اللون"
                      aria-label="color code"
                      name="color_code"
                      value={colorCode}
                      onChange={(e) => setColorCode(e.target.value)}
                    />
                  </CCol>
                  <div
                    style={{
                      width: '100%',
                      padding: 5,
                    }}
                    className="d-flex flex-wrap"
                  >
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        style={{
                          width: 75,
                          height: 130,
                          borderRadius: 5,
                          boxShadow: '0px 2px 3px #c8c8c8',
                          padding: 5,
                          marginLeft: 5,
                        }}
                      >
                        {color.color_image ? (
                          <img
                            src={
                              typeof color.color_image === 'string'
                                ? color.color_image
                                : URL.createObjectURL(color.color_image)
                            }
                            onError={(e) => {
                              e.target.onError = null
                              e.target.src = broken_image
                            }}
                            width="50"
                            height="50"
                            alt={`colorImage`}
                            style={{ margin: '10px' }}
                          />
                        ) : (
                          <div
                            style={{
                              width: 50,
                              height: 50,
                              backgroundColor: color.color,
                              margin: 10,
                              borderRadius: 5,
                            }}
                          />
                        )}
                        <p style={{ textAlign: 'center', margin: 0 }}>{color.color_code}</p>
                        <div className="d-flex flex-row justify-content-around align-items-center mt-1">
                          <Trash
                            size={20}
                            color={Theme.primaryRed}
                            cursor="pointer"
                            onClick={() => {
                              if (typeof color.color_image === 'string') {
                                startDeleteColor(color.id, index)
                              } else {
                                deleteColor(index)
                              }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
              <AppCard>
                <CCardBody>
                  <div style={{ marginTop: '15px' }}>
                    {sizes.map((size, index) => (
                      <CRow
                        key={index}
                        style={{
                          borderRadius: '5px',
                          padding: '10px',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          boxShadow: '0px 2px 3px #c8c8c8',
                        }}
                      >
                        <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : 5}>
                          <CFormInput
                            type="text"
                            label="الحجم"
                            feedbackInvalid="الحجم مطلوب"
                            placeholder="الحجم"
                            value={size.size}
                            required
                            onChange={(event) => handleSizeChange(index, 'size', event)}
                          />
                        </CCol>
                        {isNIS === 'true' && (
                          <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : null}>
                            <CFormInput
                              type="text"
                              label="السعر بالشيكل"
                              feedbackInvalid="السعر بالشيكل مطلوب"
                              placeholder="السعر بالشيكل"
                              value={size.size_price_nis}
                              required
                              onChange={(event) => handleSizeChange(index, 'size_price_nis', event)}
                            />
                          </CCol>
                        )}
                        {isUSD === 'true' && (
                          <CCol style={{ marginLeft: '0.5rem' }} sm={width < 768 ? 12 : null}>
                            <CFormInput
                              type="text"
                              label="السعر بالدولار"
                              feedbackInvalid="السعر بالدولار مطلوب"
                              placeholder="السعر بالدولار"
                              value={size.size_price_usd}
                              required
                              onChange={(event) => handleSizeChange(index, 'size_price_usd', event)}
                            />
                          </CCol>
                        )}
                        <CCol>
                          <div className="d-grid gap-2 col-4 mx-auto">
                            <br />
                            <AppTooltip type="delete" onClick={() => deleteSize(index)} />
                          </div>
                        </CCol>
                      </CRow>
                    ))}
                    <CButton
                      onClick={addSize}
                      style={{
                        width: '200px',
                        backgroundColor: Theme.primaryLight,
                        border: 'none',
                        marginTop: 10,
                      }}
                    >
                      أضف الحجم
                    </CButton>
                  </div>
                </CCardBody>
              </AppCard>
            </div>

            {loading ? (
              <Spinner animation="border" role="status" style={{ margin: '10px' }}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <div className="d-flex gap-2">
                <CButton
                  style={{
                    width: '200px',
                    marginTop: '30px',
                    backgroundColor: Theme.primary1,
                    border: 'none',
                  }}
                  type="submit"
                  onClick={saveAndStay}
                >
                  <span style={{ fontWeight: 'bolder' }}>حفظ</span>
                </CButton>
                <CButton
                  style={{
                    width: '200px',
                    marginTop: '30px',
                    backgroundColor: Theme.primary1,
                    border: 'none',
                  }}
                  type="submit"
                  onClick={saveAndExit}
                >
                  <span style={{ fontWeight: 'bolder' }}>حفظ وخروج</span>
                </CButton>
              </div>
            )}
            <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
              حصل خلل أثناء العملية، يرجى المحاولة فيما بعد
            </CAlert>
            <AppDialog
              title="هل أنت متأكد من رغبتك بحذف صورة المنتج التي تم تحديدها ؟"
              open={showDeleteImageDialog}
              onClose={cancelDeleteImage}
              actionCancel={cancelDeleteImage}
              actionExecute={DeleteProductImage}
              deleteDialog={true}
            />
            <AppDialog
              title="هل أنت متأكد من رغبتك بحذف لون المنتج الذي تم تحديده ؟"
              open={showColorDialog}
              onClose={cancelDeleteColor}
              actionCancel={cancelDeleteColor}
              actionExecute={deleteProductColor}
              deleteDialog={true}
            />
          </CCardBody>
        </AppCard>
      </CCol>
      <ToastContainer />
    </CRow>
  )
}

export default EditProduct
