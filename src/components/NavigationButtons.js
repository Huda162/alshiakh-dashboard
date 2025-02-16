import {
  Cards,
  ChatsCircle,
  CirclesThreePlus,
  FacebookLogo,
  Gift,
  Question,
  ShoppingCartSimple,
  SidebarSimple,
  Tag,
  UserCircle,
} from 'phosphor-react'
import NavigationCard from './NavigationCard'
import React from 'react'

const NavigationButtons = () => {
  return (
    <div className="my-3">
      <div className="d-flex">
        <NavigationCard
          icon={<CirclesThreePlus size={25} />}
          title="الأقسام الرئيسية"
          path="/categories"
          color="#ffff66"
        />
        <NavigationCard
          icon={<Tag size={25} />}
          title="المنتجات"
          path="/products"
          color="#c29aff"
        />
        <NavigationCard
          icon={<ShoppingCartSimple size={25} />}
          title="الطلبيات"
          path="/orders"
          color="#fdaa48"
        />
        <NavigationCard
          icon={<SidebarSimple size={25} />}
          title="الشرائح"
          path="/sliders"
          color="#99cccc"
        />
        <NavigationCard
          icon={<Cards size={25} />}
          title="البنرات"
          path="/banners"
          color="#e1aab0"
        />
      </div>
      <div className="d-flex">
        <NavigationCard icon={<UserCircle size={25} />} title="المستخدمين" path="/users" />
        <NavigationCard icon={<Gift size={25} />} title="الكوبونات" path="/coupons" />
        <NavigationCard
          icon={<FacebookLogo size={25} />}
          title="مواقع التواصل الاجتماعي"
          path="/socials"
        />
        <NavigationCard icon={<Question size={25} />} title="من نحن" path="/about_us" />
        <NavigationCard
          icon={<ChatsCircle size={25} />}
          title="ملاحظات العملاء"
          path="/feedBacks"
        />
      </div>
    </div>
  )
}

export default NavigationButtons
