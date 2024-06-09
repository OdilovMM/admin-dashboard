import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getPaymentRequestFromSeller = createAsyncThunk(
  "payment/getPaymentRequestFromSeller",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/payment/get-admin-payment-request", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const confirmPaymentRequest = createAsyncThunk(
  "payment/confirmPaymentRequest",
  async (paymentId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.put(
        "/payment/admin-confirm-payment-request",
        { paymentId },
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

export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    loader: false,
    pendingWithdraws: [],
    successWithdraws: [],
    totalAmount: 0,
    withdrawAmount: 0,
    availableAmount: 0,
    pendingAmount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getPaymentRequestFromSeller.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getPaymentRequestFromSeller.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.pendingWithdraws = payload.data.withdrawalRequest;
      })
      .addCase(getPaymentRequestFromSeller.rejected, (state, { payload }) => {
        state.loader = false;
        console.log(payload)
        // toast.error(payload);
      })
      // confirmPaymentRequest
      .addCase(confirmPaymentRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(confirmPaymentRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        const temp = state.pendingWithdraws.filter(
          (request) => request._id !== payload.data.payment._id
        );
        state.pendingWithdraws = temp;
        toast.success(payload.status);
      })
      .addCase(confirmPaymentRequest.rejected, (state, { payload }) => {
        state.loader = false;
        // toast.error(payload);
      });
  },
});

export default paymentSlice.reducer;
