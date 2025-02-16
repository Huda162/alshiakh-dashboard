/* eslint-disable react/prop-types */

import { CButton, CCard, CCardBody, CFormSelect } from '@coreui/react'
import { Funnel, MagnifyingGlass, NotePencil, Trash } from 'phosphor-react'
import { useNavigate } from 'react-router-dom'
import { Theme } from 'src/constants/colors'
import { useCategories } from 'src/hooks/categories/useCategories'
import './test.css'
import '../layout/layout.css'
import React from 'react'
import { Spinner } from 'react-bootstrap'
import excelLogo from '../assets/images/excel.png'
const PageTitle = ({
  title,
  icon,
  addText,
  addPath,
  filterValue,
  setFilterValue,
  addItem = false,
  filterItems = false,
  filterByCategory = false,
  editItems = false,
  categoryFilter,
  setCategoryFilter,
  deleteMarked,
  mark = false,
  markedItems,
  editMarked,
  saveExcel,
  isExportable = false,
  loadingOrders,
}) => {
  const navigate = useNavigate()
  const { categories } = useCategories()

  return (
    <CCard
      className="mb-2"
      style={{ backgroundColor: Theme.white, border: 'none', boxShadow: '0px 2px 3px #c8c8c8' }}
    >
      <CCardBody>
        <div className="d-flex justify-content-between align-items-center">
          <span className="d-flex align-items-center">
            {icon}
            <h4 className="mx-2 mb-0 almarai-bold"> {title}</h4>
          </span>
          <div className="pc-view">
            <span className="d-flex">
              {addItem && (
                <CButton
                  style={{
                    width: '160px',
                    marginLeft: '5px',
                    backgroundColor: Theme.primary1,
                    border: 'none',
                  }}
                  onClick={() => {
                    navigate(`/${addPath}`)
                  }}
                >
                  <span style={{ fontWeight: 'bolder' }}> {addText}</span>
                </CButton>
              )}
              {isExportable && (
                <CButton
                  style={{
                    width: '160px',
                    marginLeft: '5px',
                    backgroundColor: 'rgb(33 121 73)',
                    border: 'none',
                  }}
                  onClick={() => {
                    saveExcel()
                  }}
                >
                  {loadingOrders ? (
                    <Spinner animation="border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <span style={{ fontWeight: 'bolder' }}>
                      <img src={excelLogo} height={32} />
                      تصدير اكسل
                    </span>
                  )}
                </CButton>
              )}
              {filterByCategory && (
                <span
                  style={{
                    border: '1px solid gray',
                    padding: '5px',
                    borderRadius: '5px',
                    alignSelf: 'flex-start',
                    marginLeft: '5px',
                    // width: '200px'
                  }}
                  className=" h-75 w-25 d-flex align-items-center"
                >
                  <Funnel size={30} />
                  <CFormSelect
                    id="productCategory"
                    className="customSelect"
                    style={{
                      height: '30px',
                      border: 'none',
                      marginRight: '0px',
                      outline: 'none',
                      backgroundColor: Theme.white,
                      fontSize: 16,
                      padding: '0px',
                      paddingRight: '30px',
                    }}
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option selected="" value="">
                      تصنيف
                    </option>
                    {categories.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name_ar}
                      </option>
                    ))}
                  </CFormSelect>
                </span>
              )}
              {filterItems && (
                <span
                  style={{
                    border: '1px solid gray',
                    padding: '5px',
                    borderRadius: '5px',
                    alignSelf: 'flex-start',
                  }}
                  className=" h-75 d-flex align-items-center"
                >
                  <MagnifyingGlass size={20} />
                  <input
                    style={{
                      height: '30px',
                      marginRight: '20px',
                      border: 'none',
                      outline: 'none',
                      backgroundColor: Theme.white,
                    }}
                    type="text"
                    placeholder="ابحث بواسطة الاسم"
                    value={filterValue}
                    onChange={(e) => setFilterValue(e.target.value)}
                  />
                </span>
              )}
              {mark && (
                <CButton
                  style={{
                    width: '160px',
                    marginRight: '5px',
                    border: 'none',
                  }}
                  color="danger"
                  onClick={deleteMarked}
                  disabled={markedItems < 1}
                >
                  <span style={{ fontWeight: 'bolder' }}>
                    <Trash size={20} />
                    حذف المحدد
                  </span>
                </CButton>
              )}
              {editItems && (
                <CButton
                  style={{
                    width: '160px',
                    marginRight: '5px',
                    border: 'none',
                  }}
                  color="info"
                  onClick={editMarked}
                  disabled={markedItems < 1}
                >
                  <span style={{ fontWeight: 'bolder' }}>
                    <NotePencil size={20} />
                    تعديل المحدد
                  </span>
                </CButton>
              )}
            </span>
          </div>
        </div>

        <div className="tools-container mobile-view mt-3">
          {addItem && (
            <CButton
              style={{
                width: '100%',
                marginLeft: '5px',
                backgroundColor: Theme.primary1,
                border: 'none',
              }}
              onClick={() => {
                navigate(`/${addPath}`)
              }}
            >
              <span style={{ fontWeight: 'bolder' }}> {addText}</span>
            </CButton>
          )}
          {filterByCategory && (
            <span
              style={{
                border: '1px solid gray',
                padding: '5px',
                borderRadius: '5px',
                alignSelf: 'flex-start',
                marginLeft: '5px',
                // width: '100%'
              }}
              className=" h-75 w-100 d-flex align-items-center my-2"
            >
              <Funnel size={30} />
              <CFormSelect
                id="productCategory"
                className="customSelect"
                style={{
                  height: '30px',
                  border: 'none',
                  marginRight: '0px',
                  outline: 'none',
                  backgroundColor: Theme.white,
                  fontSize: 16,
                  padding: '0px',
                  paddingRight: '30px',
                }}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option selected="" value="">
                  تصنيف
                </option>
                {categories.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.name}
                  </option>
                ))}
              </CFormSelect>
            </span>
          )}
          {filterItems && (
            <span
              style={{
                border: '1px solid gray',
                padding: '5px',
                borderRadius: '5px',
                alignSelf: 'flex-start',
              }}
              className=" h-75 d-flex align-items-center my-2"
            >
              <MagnifyingGlass size={20} />
              <input
                style={{
                  height: '30px',
                  marginRight: '20px',
                  border: 'none',
                  outline: 'none',
                  backgroundColor: Theme.white,
                }}
                type="text"
                placeholder="ابحث بواسطة الاسم"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
            </span>
          )}
          {mark && (
            <CButton
              style={{
                width: '100%',
                border: 'none',
              }}
              color="danger"
              onClick={deleteMarked}
              disabled={markedItems < 1}
            >
              <span style={{ fontWeight: 'bolder' }}>
                <Trash size={20} />
                حذف المحدد
              </span>
            </CButton>
          )}
          {editItems && (
            <CButton
              style={{
                width: '100%',
                border: 'none',
              }}
              color="info"
              onClick={editMarked}
              disabled={markedItems < 1}
            >
              <span style={{ fontWeight: 'bolder' }}>
                <NotePencil size={20} />
                تعديل المحدد
              </span>
            </CButton>
          )}
        </div>
      </CCardBody>
    </CCard>
  )
}

export default PageTitle
