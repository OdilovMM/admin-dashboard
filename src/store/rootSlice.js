import authSlice from "../features/authSlice/authSlice";
import categorySlice from "../features/categorySlice/categorySlice";
import dashboardSlice from "../features/dashboardSlice/dashboardSlice";
import orderSlice from "../features/orderSlice/orderSlice";
import paymentSlice from "../features/paymentSlice/paymentSlice";
import sellerSlice from "../features/sellerSlice/sellerSlice";

const rootSlice = {
  auth: authSlice,
  category: categorySlice,
  seller: sellerSlice,
  order: orderSlice,
  payment: paymentSlice,
  dashboard: dashboardSlice,
};

export default rootSlice;
