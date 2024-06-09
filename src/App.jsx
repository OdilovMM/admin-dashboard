import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  Sellers,
  AdminLogin,
  Category,
  Orders,
  PaymentReq,
  DeactiveSeller,
  SellerReq,
  SellerDetail,
  OrdersDetail,
  AllUsers,
  AllProducts,
  SingleProduct,
} from "./pages";
import MainLayout from "./layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAdminDetail } from "./features/authSlice/authSlice";
import ProtectedRoute from "./utils/ProtectedRoute";
import AdminRegister from "./pages/AdminRegister";
import { getAllCustomers } from "./features/dashboardSlice/dashboardSlice";
import { getProducts } from "./features/productSlice/productSlice";
import { AddProductBanner } from "./components";
import { getPaymentRequestFromSeller } from "./features/paymentSlice/paymentSlice";

function App() {
  const { adminId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (adminId) {
      dispatch(getAdminDetail());
      dispatch(getAllCustomers());
      dispatch(getProducts());
    }
  }, [adminId, dispatch]);

  // useEffect(() => {
  //   dispatch(getPaymentRequestFromSeller());
  // }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {/* <Route path="/admin/register" element={<AdminRegister />} /> */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/details/:orderId" element={<OrdersDetail />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<AllProducts />} />
          <Route
            path="products/detail/:productId"
            element={<SingleProduct />}
          />
          <Route path="add-banner/:productId" element={<AddProductBanner />} />
          <Route path="sellers" element={<Sellers />} />
          <Route path="customers" element={<AllUsers />} />
          <Route path="payment-request" element={<PaymentReq />} />
          <Route path="block-seller" element={<DeactiveSeller />} />
          <Route path="sellers-request" element={<SellerReq />} />
          <Route path="seller/detail/:sellerId" element={<SellerDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
