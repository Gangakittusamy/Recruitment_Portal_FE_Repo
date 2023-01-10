import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface userReducerState {
  mailVerificationPage: null;
}

const initialMailVerificationPage: userReducerState = {
  mailVerificationPage: null,
};

export const mailVerification = createAsyncThunk(
  'auth/mailVerify',
  async (name: any, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://54.152.227.71/api/auth/verifyemail/${name}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userReducer = createSlice({
  name: 'mailVerification',
  initialState: initialMailVerificationPage,
  reducers: {
    mailVerificationValue: (state: any, action) => {
      state.mailVerificationPage = action.payload;
    },
  },
});
export const { mailVerificationValue } = userReducer.actions;
export default userReducer.reducer;
