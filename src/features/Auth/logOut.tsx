import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../components/Constant/Api";

interface userReducerState {
  mailVerificationPage: null;
}

const initiaLogOutPage: userReducerState = {
  mailVerificationPage: null,
};

export const logOut = createAsyncThunk("auth/logOut", async () => {
  try {
    const response = await axios.get(`http://54.152.227.71/api/auth/logout`);
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
