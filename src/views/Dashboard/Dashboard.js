import React from 'react'

import { CButton, CCol, CRow } from '@coreui/react'
// import WidgetsBrand from '../widgets/WidgetsBrand'
// import WidgetsDropdown from '../../'
import { Card, CardContent } from '@mui/material'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
} from 'chart.js'
import WidgetsDropdown from '../widgets/WidgetsDropdown'
import { Theme } from 'src/constants/colors'
import NavigationButtons from 'src/components/NavigationButtons'
import { useWidth } from 'src/hooks/general/useWidth'
import { useSettings } from 'src/hooks/settings/useSettings'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import { Spinner } from 'react-bootstrap'
import { BestProductsList } from 'src/components/AppBestProductsList'
import BestUsers from 'src/components/BestUsers'
import { Eye } from 'phosphor-react'
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  RadialLinearScale,
)
const DashboardMain = () => {
  const { width } = useWidth()
  const { settings } = useSettings()
  console.log(settings)
  const { loading } = useDashboard()

  const data = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Sales',
        data: [65],
        // fill: true,
        backgroundColor: [Theme.primary1, Theme.primaryLight],
        borderColor: '#f6f6f8',
        tension: 0.1,
        barThickness: 20,
      },
    ],
  }
  const data2 = {
    labels: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40, 20, 40, 100, 65, 70],
        // fill: true,
        backgroundColor: [Theme.primary1, Theme.primaryLight],
        borderColor: '#f6f6f8',
        tension: 0.1,
        barThickness: 20,
      },
    ],
  }
  return (
    <div>
      {loading ? (
        <div className="h-100 w-100 d-flex justify-content-center align-items-center py-5 my-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <>
          <CButton
            style={{
              position: 'sticky',
              top: 0,
              right: 0,
              background: Theme.primary1,
              border: 'none',
              textDecoration: 'none',
            }}
          >
            <Eye size={24} style={{ marginLeft: '0.5rem' }} />
            <a href="https://klimar.co" style={{ textDecoration: 'none', color: Theme.white }}>
              معاينة الموقع
            </a>
          </CButton>
          {width > 768 && <NavigationButtons />}
          <CRow lg={12}>
            <CCol lg={12} className={width > 768 ? 'd-flex gap-2' : 'd-flex flex-column gap-2'}>
              {/* <CCol sm={3} lg={9}>
            <Card
              className="d-flex justify-content-center align-items-center m-4 "
              style={{
                height: '275px',
                backgroundColor: Theme.white,
                boxShadow: '0px 2px 3px #c8c8c8',
              }}
            >
              <CardContent>
                <div style={{ width: '200px' }}>
                  <CChart
                    type="doughnut"
                    data={{
                      labels: ['الكمية في المخزون', 'الكمية المباعة'],
                      datasets: [
                        {
                          backgroundColor: [Theme.primary1, Theme.primaryLight],
                          data: [40, 20],
                        },
                      ],
                    }}
                  />
                </div>
              </CardContent>
            </Card>
          </CCol> */}
              {/* <BestProducts /> */}
              <BestProductsList />
              <BestUsers />
            </CCol>
            <CCol sm={12}>
              <WidgetsDropdown />
            </CCol>
          </CRow>
          {/* <CRow>
            <CCol sm={3} lg={9}>
              <Card className="m-3">
                <CardContent>
                  <Bar
                    data={data2}
                    options={{
                      scales: {
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                        y: {
                          grid: {
                            display: false,
                          },
                        },
                      },
                    }}
                  />
                </CardContent>
              </Card>
            </CCol>
          </CRow> */}
          {/*      
      <div className='d-flex flex-wrap'>
        <CCol sm={3} lg={6}>
          <Card className='m-3'>
            <CardContent>

            </CardContent>
          </Card>
        </CCol>
        <CCol sm={6} lg={6}>
          <Card className='m-3'>
            <CardContent>
              <Line data={data} />
            </CardContent>
          </Card>
        </CCol>
         <CCol sm={6} lg={6}>
        <Card>
          <CardContent>
            <PolarArea data={data} width={100}/>
          </CardContent>
        </Card>
      </CCol> 
      </div> */}

          {/* <CCard className="mb-4">
        <CCardHeader>الطلبيات</CCardHeader>
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead color="light">
            <CTableRow>
              <CTableHeaderCell className="text-center">المدينة</CTableHeaderCell>
              <CTableHeaderCell className="text-center">المنطقة</CTableHeaderCell>
              <CTableHeaderCell className="text-center">بالقرب من </CTableHeaderCell>
              <CTableHeaderCell className="text-center">رقم الهاتف</CTableHeaderCell>
              <CTableHeaderCell className="text-center"> المجموع</CTableHeaderCell>
              <CTableHeaderCell className="text-center"> سعر التوصيل</CTableHeaderCell>
              <CTableHeaderCell className="text-center"> الإجمالي</CTableHeaderCell>
              <CTableHeaderCell className="text-center">حالة الطلبية </CTableHeaderCell>
              <CTableHeaderCell className="text-center">الإجراءات</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {orders.slice(0, 5).map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>

                <CTableDataCell className="text-center">
                  <div>{item.city}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.area}</div>
                </CTableDataCell>{' '}
                <CTableDataCell className="text-center">
                  <div>{item.near}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.phone}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.sum}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.delivery_price}</div>
                </CTableDataCell> <CTableDataCell className="text-center">
                  <div>{item.total  }</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div>{item.status}</div>
                </CTableDataCell>
                <CTableDataCell className="text-center">
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <CButton
                      color="primary"
                      style={{ width: '80px', margin: '5px', marginBottom: '10px' }}
                      onClick={() => navigate(`/view_order/${item.id}`)}
                    >
                      عرض
                    </CButton>
                  </div>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard> */}
        </>
      )}
    </div>
  )
}

export default DashboardMain
