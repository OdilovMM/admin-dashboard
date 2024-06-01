import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const admin_Login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAminDetail = createAsyncThunk(
  "auth/get_user_detail",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/auth/get-user-detail", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("accessToken");

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  if (token) {
    const userInfo = jwtDecode(token);
    return userInfo;
  } else {
    return "";
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    adminInfo: "",
    adminToken: decodeToken(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    resetUser: (state, _) => {
      state.userToken = "";
      state.userInfo = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_Login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_Login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.adminInfo = decodeToken(payload.token);
        toast.success(payload.message);
      })
      .addCase(admin_Login.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
      })

      .addCase(getAminDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.adminInfo = payload.adminInfo;
      })

      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = "";
        state.adminToken = "";
        state.adminInfo = "";
        toast.success(payload.message);
      });
  },
});

export const { resetUser } = authSlice.actions;
export default authSlice.reducer;
