// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }) => {
    const response = await axios.post("http://localhost:5200/api/auth/login", {
      email,
      password,
    });
    console.log(response);
    localStorage.setItem("token", response.data.token);
    axios.defaults.headers.common["Authorization"] = response.data.token;
     console.log(response.data);
    return response.data;
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  const response = await axios.post(
    "http://localhost:5200/api/auth/logout",
    {},
    { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
  );
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  return response.data;
});

// export const logout = () => (dispatch) => {
//   localStorage.removeItem("token");
//   delete axios.defaults.headers.common["Authorization"];
//   dispatch(authSlice.actions.logout());
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        console.log("action.payload", action.payload);
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
