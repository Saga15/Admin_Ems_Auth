import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isSuccess: false,
  message: "",
  loading: false,
};
export const getCompany = createAsyncThunk(
  "company/get",
  async (arg, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          token: `${token && token}`,
        },
      };
      const { data } = await axios.get(
        "http://ec2-52-66-67-174.ap-south-1.compute.amazonaws.com:3107/user/get-store",
        config
      );
      // localStorage.setItem("jjjjsj",)
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const createCompany = createAsyncThunk(
  "company/create",

  async (arg, { rejectWithValue }) => {
    console.log("arg", arg);
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          token: `${token && token}`,
        },
      };
      const { response } = await axios.post(
        " http://ec2-52-66-67-174.ap-south-1.compute.amazonaws.com:3107/user/add-store",
        arg,
        config
      );
      console.log("");
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

export const deleteCompany = createAsyncThunk(
  "company/delete",

  async (arg, { rejectWithValue }) => {
    console.log("arg",arg);
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          token: `${token && token}`,
        },
      };
      const { response } = await axios.post(
        " http://ec2-52-66-67-174.ap-south-1.compute.amazonaws.com:3107/user/remove-company",
        arg,
        config
      );
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);


export const updateCompany = createAsyncThunk(
  "company/edit",

  async (arg, { rejectWithValue }) => {
    console.log("arg",arg);
    try {
      const id = arg._id
      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          token: `${token && token}`,
        },
      };
      const { response } = await axios.patch(
        `http://ec2-52-66-67-174.ap-south-1.compute.amazonaws.com:3107/user/edit-store/${id}`,
        arg,
        config
      );
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getCompany.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getCompany.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCompany.rejected]: (state, { payload }) => {
      state.message = payload;
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
export default companySlice.reducer;
