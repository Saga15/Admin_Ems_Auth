import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import useNavigate from "react-router-dom";

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  auth :false,
  success: false,
};

const backendURL =
  "http://ec2-52-66-67-174.ap-south-1.compute.amazonaws.com:3107/user/login";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        backendURL,
        { email, password },
        config
      );
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("isLoggedin", true);
      console.log("...",);
      localStorage.setItem("name", data.result.name);


      return data;
    } catch (error) {
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    // register user
    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      state.userInfo = payload.result;
      state.userToken = payload.token;
      state.auth = payload.status;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload.message;
      state.auth = payload.status;

    },
  },
});
export default authSlice.reducer;
