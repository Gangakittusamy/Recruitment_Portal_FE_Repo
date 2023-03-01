import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASEURL } from "../../components/Constant/const";

interface userReducerState {
  signUpPage: null;
}

const initialSignUpPage: userReducerState = {
  signUpPage: null,
};

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (name: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASEURL}/api/auth/register`,
        name
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userReducer = createSlice({
  name: 'signUp',
  initialState: initialSignUpPage,
  reducers: {
    signUpPageValue: (state: any, action) => {
      state.signUpPage = action.payload;
    },
  },
});
export const { signUpPageValue } = userReducer.actions;
export default userReducer.reducer;
