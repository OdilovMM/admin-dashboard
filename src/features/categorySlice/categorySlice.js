import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const addCategory = createAsyncThunk(
  "category/addCategory",
  async ({ name, image }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      const { data } = await api.post("/category/add-category", formData, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllCategories = createAsyncThunk(
  "category/getAllCategories",
  async ({ parPage, page, search }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/category/get-all-categories?page=${page}&&search=${search}&&parPage=${parPage}`,
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

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async ({ categoryId }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.delete(
        `/category/delete-category/${categoryId}`,
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

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    loader: false,
    categories: [],
    totalCategory: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategory.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        toast.success(payload.status);
      })
      .addCase(addCategory.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
        state.categories = [...state.categories, payload.category];
      })
      .addCase(getAllCategories.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.totalCategory = payload.totalCategories;
        state.categories = payload.categories;
        state.loader = false;
      })
      .addCase(getAllCategories.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload);
      })
      //
      .addCase(deleteCategory.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(deleteCategory.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.totalCategory = state.totalCategory - 1;

        state.categories = state.categories.filter(
          (category) => category._id !== payload.data.categoryId
        );
        toast.success(payload.status);
      })
      .addCase(deleteCategory.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload);
      });
  },
});

export default categorySlice.reducer;
