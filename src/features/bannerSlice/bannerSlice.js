import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const addBannerToHomePage = createAsyncThunk(
  "banner/addBannerToHomePage",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/banner/add-banner`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBanner = createAsyncThunk(
  "banner/getBanner",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/banner/get-banner/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ bannerId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/banner/update-banner/${bannerId}`,
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

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    isLoading: false,
    banners: [],
    banner: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBannerToHomePage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(addBannerToHomePage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.banner = payload.banner;
        toast.success(payload.status);
      })
      .addCase(addBannerToHomePage.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
      .addCase(getBanner.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getBanner.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.banner = payload.getBanner;
      })
      .addCase(getBanner.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      // updateBanner
      .addCase(updateBanner.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(updateBanner.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.banner = payload.banner;
        toast.success(payload.status);
        state.successMessage = payload.status;
      })
      .addCase(updateBanner.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
        state.errorMessage = payload.message;
      });
  },
});
export const { messageClear } = bannerSlice.actions;
export default bannerSlice.reducer;
