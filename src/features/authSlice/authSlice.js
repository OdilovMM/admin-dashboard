import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const admin_Login = createAsyncThunk(
  "auth/admin_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("adminToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const admin_register = createAsyncThunk(
  "auth/admin_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/admin/admin-register", info, {
        withCredentials: true,
      });

      localStorage.setItem("adminToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAdminDetail = createAsyncThunk(
  "auth/admin_detail",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/admin/get-admin-detail", {
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
      const { data } = await api.get("/admin/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("adminToken");

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loader: false,
    adminInfo: "",
    adminId: decodeToken(localStorage.getItem("adminToken")),
    token: localStorage.getItem("adminToken"),
  },
  reducers: {
    resetUser: (state, _) => {
      state.adminId = "";
      state.adminInfo = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(admin_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.adminId = decodeToken(payload.token);
        toast.success(`Welcome ${payload.data.user.firstName}`);
      })
      .addCase(admin_register.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload?.message);
      })
      .addCase(admin_Login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(admin_Login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.adminId = decodeToken(payload.token);
        toast.success(`Welcome back ${payload.data.user.firstName}`);

      })
      .addCase(admin_Login.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload);
      })

      .addCase(getAdminDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.adminInfo = payload.data.admin;
      })

      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.adminId = "";
        state.token = "";
        state.adminInfo = "";
        toast.success(payload.status);
      });
  },
});

export const { resetUser } = authSlice.actions;
export default authSlice.reducer;
