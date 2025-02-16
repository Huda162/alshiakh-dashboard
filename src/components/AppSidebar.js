import React, { useEffect, useRef } from 'react'
import './test.css'
import { CDBSidebarMenuItem } from 'cdbreact'

import { NavLink, useLocation } from 'react-router-dom'
import {
  Cards,
  FacebookLogo,
  Tag,
  ChatsCircle,
  ShoppingCartSimple,
  House,
  CirclesThreePlus,
  UserCircle,
  Question,
  SidebarSimple,
  Gear,
  Gift,
  SignOut,
  Sparkle,
  TreeStructure,
} from 'phosphor-react'
import { useSidebar } from 'src/context/SidebarContext'
import logo from '../assets/images/logo.png'
import avatar from '../assets/images/avatars/male_avatar.png'
import { Theme } from 'src/constants/colors'
import '../layout/layout.css'
import '../scss/_custom.scss'
import { useLogin } from 'src/hooks/login/useLogin'
import AppDialog from './AppDialog'
import { useWidth } from 'src/hooks/general/useWidth'

function Sidebar() {
  const { openSidebar, closeSidebar } = useSidebar()
  const name = sessionStorage.getItem('name') || localStorage.getItem('cubra_name')
  const location = useLocation()
  const prevLocationRef = useRef(location.pathname)
  const { width } = useWidth()
  const { logout, openSignoutDialog, closeSignoutDialog, showSignoutDialog } = useLogin()

  useEffect(() => {
    if (width > 768 && location.pathname !== '/dashboard') {
      openSidebar()
    } else if (location.pathname == '/dashboard') {
      closeSidebar()
    }
  }, [location])

  useEffect(() => {
    const prevLocation = prevLocationRef.current
    const activeLink = document.querySelector(`.customNav[href="${prevLocation}"]`)
    if (activeLink) {
      activeLink.classList.add('leaving')
      setTimeout(() => {
        activeLink.classList.remove('leaving')
      }, 300)
    }
    prevLocationRef.current = location.pathname
  }, [location])

  return (
    <div className="sidebar-container">
      <nav
        id="sidebar"
        className="sidebar-wrapper almarai-regular"
        style={{
          transition: 'width 0.3s ease, right 0.3s ease',
          // overflowX: 'scroll'
        }}
        // onMouseEnter={openSidebar}
        // onMouseLeave={closeSidebar}
      >
        <div className="logo-container d-flex justify-content-center" style={{ margin: '15px' }}>
          <img src={logo} alt="Logo" width={120} />
        </div>
        {/* <CSidebarHeader className="border-bottom">
          <CSidebarBrand>
          </CSidebarBrand>
        </CSidebarHeader> */}
        <div>
          <NavLink exact to="/dashboard">
            <CDBSidebarMenuItem
              style={{ backgroundColor: Theme.primaryLight, borderRadius: 5 }}
              className={`customNav ${location.pathname === '/dashboard' ? 'activeClicked' : ''}`}
            >
              <div className="logo-container">
                <img src={avatar} alt="Logo" width={23} style={{ borderRadius: '100%' }} />
                <span
                  style={{
                    color: Theme.white,
                    marginRight: '10px',
                    textDecorationLine: 'underline',
                  }}
                >
                  {name}
                </span>
              </div>
            </CDBSidebarMenuItem>
            {/* <CNavGroup
              toggler={
                <>
                   Nav dropdown
                </>
              }
            >
              <CNavItem href="#">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{' '}
                Nav dropdown item
              </CNavItem>
              <CNavItem href="#">
                <span className="nav-icon">
                  <span className="nav-icon-bullet"></span>
                </span>{' '}
                Nav dropdown item
              </CNavItem>
            </CNavGroup> */}
          </NavLink>
          <NavLink exact to="/dashboard">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/dashboard' ? 'activeClicked' : ''}`}
            >
              <House size={25} /> الصفحة الرئيسية
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/categories">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/categories' ? 'activeClicked' : ''}`}
            >
              <CirclesThreePlus size={25} /> الأقسام الرئيسية
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/brands">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/brands' ? 'activeClicked' : ''}`}
            >
              <Sparkle size={25} /> العلامات التجارية
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/products">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/products' ? 'activeClicked' : ''}`}
            >
              <Tag size={25} /> المنتجات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/orders">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/orders' ? 'activeClicked' : ''}`}
            >
              <ShoppingCartSimple size={25} /> الطلبيات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/sliders">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/sliders' ? 'activeClicked' : ''}`}
            >
              <SidebarSimple size={25} /> الشرائح
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/banners">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/banners' ? 'activeClicked' : ''}`}
            >
              <Cards size={25} /> البنرات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/users">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/users' ? 'activeClicked' : ''}`}
            >
              <UserCircle size={25} /> المستخدمين
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/coupons">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/coupons' ? 'activeClicked' : ''}`}
            >
              <Gift size={25} /> الكوبونات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/socials">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/socials' ? 'activeClicked' : ''}`}
            >
              <FacebookLogo size={25} /> مواقع التواصل الاجتماعي
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/about_us">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/about_us' ? 'activeClicked' : ''}`}
            >
              <Question size={25} /> من نحن
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/feedbacks">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/feedbacks' ? 'activeClicked' : ''}`}
            >
              <ChatsCircle size={25} /> ملاحظات العملاء
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/settings">
            <CDBSidebarMenuItem
              className={`customNav ${location.pathname === '/settings' ? 'activeClicked' : ''}`}
            >
              <Gear size={25} /> الإعدادات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink onClick={openSignoutDialog}>
            <CDBSidebarMenuItem className={`customNav`}>
              <SignOut size={25} /> تسجيل الخروج
            </CDBSidebarMenuItem>
          </NavLink>
          {/* <NavLink exact to="/notifications" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="">
              <BellSimple size={25} /> الإشعارات
            </CDBSidebarMenuItem>
          </NavLink>
          <NavLink exact to="/about_us" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="">
              <Chats size={25} /> من نحن
            </CDBSidebarMenuItem>
          </NavLink>{' '}
          <NavLink exact to="/privacy_policy" activeClassName="activeClicked">
            <CDBSidebarMenuItem icon="">
              <LockSimple size={25} /> سياسة الخصوصية
            </CDBSidebarMenuItem>
          </NavLink>{' '} */}
        </div>
      </nav>
      <AppDialog
        title="هل أنت متأكد من رغبتك بتسجيل الخروج ؟"
        open={showSignoutDialog}
        onClose={closeSignoutDialog}
        actionCancel={closeSignoutDialog}
        actionExecute={logout}
        deleteDialog={true}
      />
    </div>
  )
}

export default Sidebar
