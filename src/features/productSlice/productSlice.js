import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/products/get-all-admin-products`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getaProduct = createAsyncThunk(
  "product/getSingleProduct",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/products/get-product-detail-to-admin/${productId}`,
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

export const getAllReviews = createAsyncThunk(
  "review/getAllReviews",
  async ({ productId, pageNumber }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/products/get-all-reviews/${productId}?pageNumber=${pageNumber}`,

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

export const productSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    totalProducts: 0,
    products: [],
    product: {},
    parPage: 5,
    totalReviews: 0,
    ratingReview: [],
    reviews: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.products = payload.data.allProducts;
        state.totalProducts = payload.data.productCount;
      })
      .addCase(getProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      //   single product
      .addCase(getaProduct.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getaProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.product = payload.data.product;

      })
      .addCase(getaProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      //   get all reviews
      .addCase(getAllReviews.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getAllReviews.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.reviews = payload.data.reviews;
        state.totalReviews = payload.data.totalReview;
        state.ratingReview = payload.data.ratingReview;
      })
      .addCase(getAllReviews.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.error);
      });
  },
});

export default productSlice.reducer;
