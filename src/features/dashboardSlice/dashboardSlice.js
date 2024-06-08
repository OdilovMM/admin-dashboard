import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getAdminDashboardInfo = createAsyncThunk(
  "dashboard/getAdminDashboardInfo",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-admin-dashboard-info", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCustomers = createAsyncThunk(
  "dashboard/getAllCustomers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/customer/get-all-customers", {
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
    totalCategory: 0,
    totalSellers: 0,
    totalCustomers: 0,
    totalProducts: 0,
    recentOrders: [],
    customers: [],
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
        state.totalSales = payload.data.totalSales;
        state.totalOrders = payload.data.totalOrders;
      })
      .addCase(getAdminDashboardInfo.rejected, (state, { payload }) => {
        state.loader = false;
      })
      // get all customers
      .addCase(getAllCustomers.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getAllCustomers.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.customers = payload.data.customers;
        state.totalCustomers = payload.data.countCustomer;
        state.totalSellers = payload.data.countSeller;
        state.totalCategory = payload.data.countCategory;

      })
      .addCase(getAllCustomers.rejected, (state, { payload }) => {
        state.loader = false;
      });
  },
});

export default dashboardSlice.reducer;
