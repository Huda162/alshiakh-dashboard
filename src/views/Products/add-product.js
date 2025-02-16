/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import {
  CButton,
  CCardBody,
  CCol,
  CRow,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CFormCheck,
  CAlert,
} from '@coreui/react'
import { Spinner } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { NotePencil, PlusCircle, Trash, X } from 'phosphor-react'
import { useProductAdding } from 'src/hooks/products/useProductAdding'
import { AppBreadcrumb } from 'src/components'
import PageTitle from 'src/components/PageTitle'
import { Theme } from 'src/constants/colors'
import AppCard from 'src/components/AppCard'
import ProgressBar from 'src/components/AppProgressBar'
import AppTooltip from 'src/components/Tooltip'
import { useLanguage } from 'src/hooks/general/useLanguage'
import '../../components/test.css'
import { Chrome } from '@uiw/react-color'
import { useCurrency } from 'src/hooks/general/useCurrency'
import { useWidth } from 'src/hooks/general/useWidth'

const AddProduct = () => {
  const {
    productNameAr,
    setProductNameAr,
    loading,
    images,
    setImages,
    descriptionAr,
    setDescriptionAr,
    categories,
    sizes,
    isMultipleSize,
    setIsMultipleSize,
    handleSizeChange,
    addSize,
    handleSubmit,
    validated,
    visible,
    setVisible,
    deleteSize,
    productNameEng,
    setProductNameEng,
    productNameHeb,
    setProductNameHeb,
    descriptionEng,
    setDescriptionEng,
    descriptionHeb,
    setDescriptionHeb,
    categoryID,
    setCategoryID,
    isMultipleColor,
    setIsMultipleColor,
    colors,
    hex,
    setHex,
    colorImage,
    setColorImage,
    addColor,
    deleteColor,
    editColor,
    editedColor,
    setEditedColor,
    productPriceJOD,
    productPriceNIS,
    productPriceUSD,
    setProductPriceJOD,
    setProductPriceNIS,
    setProductPriceUSD,
    handleFileChange,
    uploadProgress,
    productVideo,
    setSizes,
    checkValidated,
    setCheckValidated,
    brands,
    brandId,
    setBrandId,
    isOffer,
    setIsOffer,
    discountPercentage,
    setDiscountPercentage,
    colorCode,
    setColorCode,
  } = useProductAdding()
  const { width } = useWidth()

  const { isArabic, isEnglish, isHebrew } = useLanguage()
  const { isJUD, isNIS, isUSD } = useCurrency()

  return (
    <CRow>
      <CCol xs>
        <PageTitle title="منتج جديد" icon={<PlusCircle size={25} />} />
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
                    {isArabic === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          className="multilanguage-input"
                          type="text"
                          id="productNameAr"
                          label="اسم المنتج باللغة العربية"
                          feedbackInvalid="اسم المنتج باللغة العربية مطلوب"
                          placeholder="اسم المنتج باللغة العربية"
                          value={productNameAr}
                          required
                          onChange={(e) => {
                            setProductNameAr(e.target.value)
                          }}
                        />
                      </CCol>
                    )}
                    {isEnglish === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          id="productNameEng"
                          label="اسم المنتج باللغة الإنجليزية"
                          feedbackInvalid="اسم المنتج باللغة الإنجليزية مطلوب"
                          placeholder="اسم المنتج باللغة الإنجليزية"
                          value={productNameEng}
                          required
                          onChange={(e) => {
                            setProductNameEng(e.target.value)
                          }}
                        />
                      </CCol>
                    )}
                    {isHebrew === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <CFormInput
                          type="text"
                          id="productNameHeb"
                          label="اسم المنتج باللغة العبرية"
                          feedbackInvalid="اسم المنتج باللغة العبرية مطلوب"
                          placeholder="اسم المنتج باللغة العبرية"
                          value={productNameHeb}
                          required
                          onChange={(e) => {
                            setProductNameHeb(e.target.value)
                          }}
                        />
                      </CCol>
                    )}
                    <div className="mt-3 d-flex ">
                      {isNIS === 'true' && (
                        <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                          <CFormInput
                            type="text"
                            id="productPrice"
                            label="سعر المنتج بالشيكل "
                            feedbackInvalid="سعر المنتج بالشيكل مطلوب"
                            placeholder="سعر المنتج بالشيكل"
                            value={productPriceNIS}
                            required
                            onChange={(e) => {
                              setProductPriceNIS(e.target.value)
                            }}
                          />
                        </CCol>
                      )}
                      {isUSD === 'true' && (
                        <CCol sm={width < 768 ? 12 : null} style={{ marginLeft: '1rem' }}>
                          <CFormInput
                            type="text"
                            id="productPrice"
                            label="سعر المنتج بالدولار "
                            feedbackInvalid="سعر المنتج بالدولار مطلوب"
                            placeholder="سعر المنتج بالدولار"
                            value={productPriceUSD}
                            required
                            onChange={(e) => {
                              setProductPriceUSD(e.target.value)
                            }}
                          />
                        </CCol>
                      )}
                      {isJUD === 'true' && (
                        <CCol sm={width < 768 ? 12 : null}>
                          <CFormInput
                            type="text"
                            id="productPrice"
                            label="سعر المنتج بالدينار "
                            feedbackInvalid="سعر المنتج بالدينار مطلوب"
                            placeholder="سعر المنتج بالدينار"
                            value={productPriceJOD}
                            required
                            onChange={(e) => {
                              setProductPriceJOD(e.target.value)
                            }}
                          />
                        </CCol>
                      )}
                    </div>

                    {isArabic === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <div className="mb-3">
                          <CFormTextarea
                            id="productDescriptionAr"
                            label="الوصف باللغة العربية"
                            placeholder=" الوصف باللغة العربية"
                            value={descriptionAr}
                            onChange={(e) => setDescriptionAr(e.target.value)}
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    )}
                    {isEnglish === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <div className="mb-3">
                          <CFormTextarea
                            id="productDescriptionEng"
                            label="الوصف باللغة الانجليزية"
                            placeholder=" الوصف باللغة الانجليزية"
                            value={descriptionEng}
                            onChange={(e) => setDescriptionEng(e.target.value)}
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    )}
                    {isHebrew === 'true' && (
                      <CCol sm={width < 768 ? 12 : null}>
                        <div className="mb-3">
                          <CFormTextarea
                            id="productDescriptionHeb"
                            label="الوصف باللغة العبرية"
                            placeholder=" الوصف باللغة العبرية"
                            value={descriptionHeb}
                            onChange={(e) => setDescriptionHeb(e.target.value)}
                          ></CFormTextarea>
                        </div>
                      </CCol>
                    )}
                    <CCol md={12}>
                      <CFormSelect
                        id="productCategory"
                        label="تصنيف المنتج"
                        feedbackInvalid="تصنيف المنتج مطلوب"
                        value={categoryID}
                        onChange={(e) => setCategoryID(e.target.value)}
                        required
                      >
                        <option selected="" value="">
                          {' '}
                          اختر تصنيف المنتج
                        </option>
                        {categories.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name_ar}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <CFormSelect
                        id="productCategory"
                        label="العلامة التجارية -اختياري-"
                        value={brandId}
                        onChange={(e) => setBrandId(e.target.value)}
                      >
                        <option selected value="0">
                          {' '}
                          اختر العلامة التجارية للمنتج -اختياري-
                        </option>
                        {brands.map((item) => (
                          <option value={item.id} key={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </CFormSelect>
                    </CCol>
                    <CCol md={12}>
                      <div className="mb-3">
                        <CFormInput
                          label="صورة المنتج"
                          type="file"
                          id="productPic"
                          feedbackInvalid="صورة المنتج مطلوبة"
                          required
                          multiple
                          onChange={(e) => {
                            setImages((prevImages) => [
                              ...prevImages,
                              ...Array.from(e.target.files),
                            ])
                          }}
                        />
                      </div>
                    </CCol>

                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                      {images.map((img, index) => (
                        // eslint-disable-next-line react/jsx-key
                        <div className="m-1" style={{ position: 'relative' }}>
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
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                          />
                          <img
                            key={index}
                            src={URL.createObjectURL(img)}
                            height="200"
                            alt={`images ${index}`}
                            style={{ margin: '10px' }}
                          />
                        </div>
                      ))}
                    </div>
                    <CCol md={12}>
                      <div className="mb-3">
                        <CFormInput
                          label="فيديو المنتج(اختياري)"
                          type="file"
                          aria-label="الفيديو الخاص بالمنتج"
                          id="productVid"
                          multiple
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="m-1" style={{ position: 'relative', width: '255px' }}>
                        {productVideo && (
                          <video width="250" height="200" controls>
                            <source src={URL.createObjectURL(productVideo)} type="video/mp4" />
                          </video>
                        )}

                        {uploadProgress?.visible && (
                          <ProgressBar progress={uploadProgress?.progress || 0} />
                        )}
                        {uploadProgress?.status === 'success' && (
                          <div style={{ color: 'green', marginTop: '10px' }}>
                            Upload successful!
                          </div>
                        )}
                        {uploadProgress?.status === 'failure' && (
                          <div style={{ color: 'red', marginTop: '10px' }}>Upload failed!</div>
                        )}
                      </div>
                    </CCol>
                    <CCol sm={width < 768 ? 12 : null}>
                      <CFormInput
                        type="text"
                        id="productPrice"
                        label="نسبة الخصم"
                        placeholder="نسبة الخصم"
                        value={discountPercentage}
                        onChange={(e) => {
                          setDiscountPercentage(e.target.value)
                        }}
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormCheck
                        className="customCheckbox"
                        type="checkbox"
                        id="isOffer"
                        reverse
                        label="إضافة المنتج الى العروض"
                        checked={isOffer}
                        onChange={() => {
                          setIsOffer(!isOffer)
                          if (isOffer === true) {
                            setIsOffer(false)
                          } else {
                            setIsOffer(true)
                          }
                        }}
                      />
                    </CCol>
                    <CCol md={12}>
                      <CFormCheck
                        className="customCheckbox"
                        type="checkbox"
                        id="multiColor"
                        reverse
                        feedbackInvalid="يجب اضافة لون واحد على الاقل"
                        label="هل المنتج متعدد الألوان؟"
                        checked={isMultipleColor}
                        onChange={() => {
                          setIsMultipleColor(!isMultipleColor)
                          if (isMultipleColor === false && colors.length < 1) {
                            setCheckValidated(false)
                          } else {
                            setCheckValidated(true)
                          }
                        }}
                        invalid={!checkValidated}
                      />
                    </CCol>
                    {isMultipleColor && (
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
                                  setColorImage(undefined)
                                }}
                              />
                              <img
                                src={colorImage ? URL.createObjectURL(colorImage) : ''}
                                height="200"
                                alt={`colorImage`}
                                style={{ margin: '10px' }}
                              />
                            </div>
                          )}
                          {editedColor === null ? (
                            <CButton
                              onClick={addColor}
                              disabled={colorImage === undefined || hex === '' || colorCode === ''}
                              style={{
                                width: '200px',
                                backgroundColor: Theme.primaryLight,
                                border: 'none',
                              }}
                            >
                              أضف اللون
                            </CButton>
                          ) : (
                            <CButton
                              onClick={() => editColor(editedColor)}
                              style={{
                                width: '200px',
                                backgroundColor: Theme.primaryBlue,
                                border: 'none',
                              }}
                            >
                              تعديل اللون
                            </CButton>
                          )}
                        </CCol>
                        <CCol md={3}>
                          <CFormInput
                            type="text"
                            label="رمز اللون"
                            placeholder="رمز اللون"
                            value={colorCode}
                            onChange={(event) => setColorCode(event.target.value)}
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
                              {color.image ? (
                                <img
                                  src={URL.createObjectURL(color.image)}
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
                              <p style={{ textAlign: 'center', margin: 0 }}>{color.code}</p>
                              <div className="d-flex flex-row justify-content-around align-items-center mt-1">
                                <Trash
                                  size={20}
                                  color={Theme.primaryRed}
                                  cursor="pointer"
                                  onClick={() => deleteColor(index)}
                                />
                                <NotePencil
                                  size={20}
                                  color={Theme.primaryBlue}
                                  cursor="pointer"
                                  onClick={() => {
                                    setHex(color.color)
                                    setColorImage(color.image ? color.image : '')
                                    setEditedColor(index)
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <CCol md={12}>
                      <CFormCheck
                        className="customCheckbox"
                        type="checkbox"
                        id="multiSize"
                        reverse
                        label="هل المنتج متعدد الأحجام؟"
                        checked={isMultipleSize}
                        onChange={() => {
                          setIsMultipleSize(!isMultipleSize)
                          if (!isMultipleSize) addSize()
                          else setSizes([])
                        }}
                      />
                    </CCol>
                    {isMultipleSize && (
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
                                    feedbackInvalid="الحجم مطلوب"
                                    label={index === 0 ? 'الحجم' : null}
                                    placeholder="الحجم"
                                    value={size.size}
                                    required
                                    onChange={(event) => handleSizeChange(index, 'size', event)}
                                  />
                                </CCol>
                                {isNIS === 'true' && (
                                  <CCol
                                    style={{ marginLeft: '0.5rem' }}
                                    sm={width < 768 ? 12 : null}
                                  >
                                    <CFormInput
                                      type="text"
                                      label={index === 0 ? 'السعر بالشيكل' : null}
                                      feedbackInvalid="السعر بالشيكل مطلوب"
                                      placeholder="السعر بالشيكل"
                                      value={size.priceNIS}
                                      required
                                      onChange={(event) =>
                                        handleSizeChange(index, 'priceNIS', event)
                                      }
                                    />
                                  </CCol>
                                )}
                                {isUSD === 'true' && (
                                  <CCol
                                    style={{ marginLeft: '0.5rem' }}
                                    sm={width < 768 ? 12 : null}
                                  >
                                    <CFormInput
                                      type="text"
                                      label={index === 0 ? 'السعر بالدولار' : null}
                                      feedbackInvalid="السعر بالدولار مطلوب"
                                      placeholder="السعر بالدولار"
                                      value={size.priceUSD}
                                      required
                                      onChange={(event) =>
                                        handleSizeChange(index, 'priceUSD', event)
                                      }
                                    />
                                  </CCol>
                                )}
                                {isJUD === 'true' && (
                                  <CCol sm={width < 768 ? 12 : null}>
                                    <CFormInput
                                      type="text"
                                      label={index === 0 ? 'السعر بالدينار' : null}
                                      feedbackInvalid="السعر بالدينار مطلوب"
                                      placeholder="السعر بالدينار"
                                      value={size.priceJUD}
                                      required
                                      onChange={(event) =>
                                        handleSizeChange(index, 'priceJOD', event)
                                      }
                                    />
                                  </CCol>
                                )}
                                <CCol>
                                  <div className="d-grid gap-2 col-4 mx-auto m-1">
                                    {index === 0 ? <br /> : null}
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
                              أضف حجم جديد
                            </CButton>
                          </div>
                        </CCardBody>
                      </AppCard>
                    )}
                    <CCardBody>
                      {loading ? (
                        <Spinner animation="border" role="status" style={{ margin: '10px' }}>
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <CButton
                          style={{
                            width: '200px',
                            backgroundColor: Theme.primary1,
                            border: 'none',
                          }}
                          type="submit"
                        >
                          <span style={{ fontWeight: 'bolder' }}>اضافه منتج</span>
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
                    </CCardBody>
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
export default AddProduct
