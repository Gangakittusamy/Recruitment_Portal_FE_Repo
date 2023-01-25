import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../components/Constant/Api";
import { BASEURL } from "../../components/Constant/const";

interface userReducerState {
  logInVerificationPage: null;
  status: any;
  error: any;
  isLoading: boolean;
  roles: null;
  output: null;
}

const initiallogInVerificationPage: userReducerState = {
  logInVerificationPage: null,
  status: "",
  error: "",
  isLoading: false,
  roles: null,
  output: null,
};

export const LoginUserDetails: any = createAsyncThunk(
  "auth/logInVerification",
  async (name: any, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/users/me`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userReducer = createSlice({
  name: "logInVerification",
  initialState: initiallogInVerificationPage,
  reducers: {
    logInVerificationValue: (state: any, action) => {
      state.logInVerificationPage = action.payload;
    },
    resetStatus: (state, action) => {
      state.error = "";
      state.status = "";
    },

    outputValue: (state: any, action) => {
      state.output = state.roles;
    },
  },
  extraReducers: {
    [LoginUserDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [LoginUserDetails.fulfilled]: (state, action) => {
      state.roles = action.payload.user;
    },
    [LoginUserDetails.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});
export const { logInVerificationValue, resetStatus } = userReducer.actions;
export default userReducer.reducer;
