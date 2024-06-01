import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  Sellers,
  AdminLogin,
  Category,
  LandingPage,
  Orders,
  PaymentReq,
  DeactiveSeller,
  SellerReq,
  ChatSeller,
  SellerDetail,
  OrdersDetail
} from "./pages";
import MainLayout from "./layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAminDetail } from "./features/authSlice/authSlice";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAminDetail());
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
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
          <Route path="sellers" element={<Sellers />} />
          <Route path="payment-request" element={<PaymentReq />} />
          <Route path="block-seller" element={<DeactiveSeller />} />
          <Route path="sellers-request" element={<SellerReq />} />
          <Route path="seller/detail/:sellerId" element={<SellerDetail />} />
          <Route path="chat-seller" element={<ChatSeller />} />
          <Route path="chat-seller/:sellerId" element={<ChatSeller />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
