import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

// for admin
export const getSellers = createAsyncThunk(
  "chat/getSellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/chat/admin-get-sellers", {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminMessageToSeller = createAsyncThunk(
  "chat/adminMessageToSeller",
  async (messageInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/admin-message-to-seller`,
        messageInfo,
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
export const getAdminMessages = createAsyncThunk(
  "chat/getAdminMessages",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-messages/${receiverId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerMessage = createAsyncThunk(
  "chat/getSellerMessage",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-seller-messages`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    successMessage: "",
    customers: [],
    messages: [],
    activeSeller: [],
    activeAdmin: "",
    friends: [],
    sellerAdminMessage: [],
    currentSeller: {},
    sellers: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateSellers: (state, { payload }) => {
      state.activeSeller = payload;
    },
    updateCustomer: (state, { payload }) => {
      state.activeCustomer = payload;
    },
    updateAdminMessage: (state, { payload }) => {
      state.sellerAdminMessage = [...state.sellerAdminMessage, payload];
    },
    updateSellerMessage: (state, { payload }) => {
      state.sellerAdminMessage = [...state.sellerAdminMessage, payload];
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getSellers.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getSellers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sellers = payload.sellers;
      })
      .addCase(getSellers.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(adminMessageToSeller.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(adminMessageToSeller.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sellerAdminMessage = [
          ...state.sellerAdminMessage,
          payload.adminMessages,
        ];

        state.successMessage = "success";
      })
      .addCase(adminMessageToSeller.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getAdminMessages.fulfilled, (state, { payload }) => {
        state.sellerAdminMessage = payload.messages;
        state.currentSeller = payload.currentSeller;
      })
      .addCase(getSellerMessage.fulfilled, (state, { payload }) => {
        state.sellerAdminMessage = payload.messages;
      });
  },
});
export const {
  messageClear,
  updateMessage,
  updateSellers,
  updateCustomer,
  updateAdminMessage,
  updateSellerMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
