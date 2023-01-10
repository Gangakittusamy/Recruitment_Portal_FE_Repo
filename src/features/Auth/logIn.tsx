import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface userReducerState {
  logInVerificationPage: null;
  status: any;
  error: any;
}

const initiallogInVerificationPage: userReducerState = {
  logInVerificationPage: null,
  status: '',
  error: '',
};

export const logInVerification = createAsyncThunk(
  'auth/logInVerification',
  async (name: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://54.152.227.71/api/auth/login`,
        name
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userReducer = createSlice({
  name: 'logInVerification',
  initialState: initiallogInVerificationPage,
  reducers: {
    logInVerificationValue: (state: any, action) => {
      state.logInVerificationPage = action.payload;
    },
    resetStatus: (state, action) => {
      state.error = '';
      state.status = '';
    },
  },
});
export const { logInVerificationValue, resetStatus } = userReducer.actions;
export default userReducer.reducer;
