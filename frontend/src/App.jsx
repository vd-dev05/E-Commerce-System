import { Navigate, Route, Routes } from "react-router"
import { ToastContainer } from 'react-toastify'
import AuthLayout from "./components/auth/layout"
import AuthLogin from "./pages/auth/login"
import AuthRegister from "./pages/auth/register"
import AdminLayout from "./components/admin/layout"
import AdminDashBoard from "./pages/admin/dashboard"
import AdminProducts from "./pages/admin/products"
import AdminOrders from "./pages/admin/orders"
import AdminFeatures from "./pages/admin/features"
import ShoppingLayout from "./components/shop/layout"
import NotFound from "./pages/not-found"
import ShoppingHome from "./pages/shop/home"
import ShoppingListing from "./pages/shop/listing"
import ShoppingAccount from "./pages/shop/account"
import ShoppingCheckOut from "./pages/shop/checkout"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/unauth"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"
import ShopProductDetails from "./components/shop/product-details"
import PaypalReturnPage from "./pages/shop/paypal-return"
import PaymentSuccessPage from "./pages/shop/payment-success"


function App() {

  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])


  if (isLoading) return <Skeleton className="w-full bg-gray-200 h-[800px]" />

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ToastContainer />
      {/* <Navigation /> */}
      <Routes>
        <Route path="/" element={<Navigate to="/shop/home" replace />} />
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout />
          </CheckAuth>
        }>
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout />
          </CheckAuth>}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" elemen
            t={<AdminFeatures />} />
        </Route>
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout />
          </CheckAuth>
        }>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="listing/:productId" element={<ShopProductDetails />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="paypal-return" element={<PaypalReturnPage />} />
          <Route path="payment-success" element={<PaymentSuccessPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
        <Route path="/unauth" element={<UnauthPage />} />
      </Routes>
    </div>
  )
}
export default App
