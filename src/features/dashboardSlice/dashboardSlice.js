import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getAdminDashboardInfo = createAsyncThunk(
  "dashboard/getAdminDashboardInfo",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/get-admin-dashboard-info", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loader: false,
    totalSales: 0,
    totalOrders: 0,
    totalProduct: 0,
    totalSellers: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    totalDeactiveSellers: 0,
    totalPendingOrder: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminDashboardInfo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getAdminDashboardInfo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.totalSales = payload.totalSales;
        state.totalProducts = payload.totalProducts;
        state.totalOrders = payload.totalOrders;
        state.totalCustomers = payload.totalCustomers;
        state.totalSellers = payload.totalSellers;
        state.recentOrders = payload.recentOrders;
        state.totalDeactiveSellers = payload.totalDeactiveSellers;
      })
      .addCase(getAdminDashboardInfo.rejected, (state, { payload }) => {
        state.loader = false;
      });
  },
});

export default dashboardSlice.reducer;
