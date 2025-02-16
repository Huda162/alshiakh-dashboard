import React, { useEffect, useState } from 'react'
import { CRow } from '@coreui/react'
import { Theme } from 'src/constants/colors'
import { useDashboard } from 'src/hooks/dashboard/useDashboard'
import { useWidth } from 'src/hooks/general/useWidth'
import { CirclesThreePlus } from 'phosphor-react'

const WidgetsDropdown = () => {
  const [loading, setLoading] = useState(false)
  const [dashboard, setDashboard] = useState('')
  const { orders, products, categories, sliders } = useDashboard()
  const { width } = useWidth()
  console.log(orders, products, categories, sliders)
  const stats = [
    {
      title: 'الطلبيات',
      stats: orders,
      icon: <CirclesThreePlus size={25} weight="duotone" />,
      change: 'decrease',
    },
    { title: 'المنتجات', stats: products, icon: '11.2%', change: 'increase' },
    { title: 'الأقسام الرئيسية', stats: categories, icon: '40%', change: 'increase' },
    { title: 'الشرائح', stats: sliders, icon: '40%', change: 'increase' },
  ]
  const getDashboard = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://shammarket.ps/admin/api/dashboard')
      const data = await response.json()
      setDashboard(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getDashboard()
  }, [])
  return (
    <CRow className="gap-3 m-1 mt-3">
      {stats.map((item, index) => (
        <div
          key={index}
          style={
            width < 768
              ? {
                  backgroundColor: Theme.primaryLight,
                  borderRadius: 5,
                  color: Theme.white,
                  boxShadow: '0px 2px 3px #c8c8c8',
                  padding: '1rem',
                  paddingBottom: 0,
                  width: '47%',
                  rowGap: 5,
                  marginBottom: '0.5rem',
                }
              : {
                  backgroundColor: Theme.primaryLight,
                  borderRadius: 5,
                  color: Theme.white,
                  boxShadow: '0px 2px 3px #c8c8c8',
                  padding: '1rem',
                  paddingBottom: 0,
                  width: '24%',
                  rowGap: 5,
                }
          }
          className="d-flex justify-content-center align-items-center flex-column"
        >
          <h5 style={{ fontWeight: 'bold' }}>{item.title}</h5>
          <p>{item.stats}</p>
        </div>
      ))}
    </CRow>
  )
}

export default WidgetsDropdown
