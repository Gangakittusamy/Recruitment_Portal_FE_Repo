import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../components/Constant/Api";
import { BASEURL } from "../../components/Constant/const";

interface userReducerState {
  mailVerificationPage: null;
}

const initiaLogOutPage: userReducerState = {
  mailVerificationPage: null,
};

export const logOut = createAsyncThunk("auth/logOut", async () => {
  try {
    const response = await axios.get(`${BASEURL}/api/auth/logout`);
    return response.data;
  } catch (error: any) {
    return error;
  }
});

export const userReducer = createSlice({
  name: "logOut",
  initialState: initiaLogOutPage,
  reducers: {
    logOutValue: (state: any, action) => {
      state.mailVerificationPage = action.payload;
    },
  },
});
export const { logOutValue } = userReducer.actions;
export default userReducer.reducer;
