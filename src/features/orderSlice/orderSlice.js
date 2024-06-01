import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getAdminAllOrders = createAsyncThunk(
  "order/getAdminAllOrders",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/order/get-admin-order?page=${page}&&search=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSingleOrderDetail = createAsyncThunk(
  "order/getSingleOrderDetail",
  async (orderId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/order/get-admin-order-detail/${orderId}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ orderId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/order/admin-update-order-status/${orderId}`,
        info,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    isLoading: false,
    totalOrders: 0,
    order: {},
    myOrders: [],
    
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminAllOrders.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAdminAllOrders.fulfilled, (state, { payload }) => {
        state.totalOrders = payload.totalOrder;
        state.myOrders = payload.orders;
        state.isLoading = false;
      })
      .addCase(getAdminAllOrders.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      })
      .addCase(getSingleOrderDetail.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getSingleOrderDetail.fulfilled, (state, { payload }) => {
        state.order = payload.order;
        state.isLoading = false;
      })
      .addCase(getSingleOrderDetail.rejected, (state, { payload }) => {
        toast.error(payload.error);
        state.isLoading = false;
      })
      .addCase(updateOrderStatus.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(payload.message);
      })
      .addCase(updateOrderStatus.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      });
  },
});

export default orderSlice.reducer;
