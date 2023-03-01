import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../components/Constant/Api";
import { BASEURL } from "../../components/Constant/const";

interface useReducerState {
  initialTableValue: null;
  isLoading: boolean;
  roles: null;
  status: string;
}

const initialState: useReducerState = {
  initialTableValue: null,
  isLoading: false,
  roles: null,
  status: "",
};

export const RecruitersPostValue: any = createAsyncThunk(
  "auth/CreateRecruiterPostValue",
  async (para1, thunkAPI) => {
    try {
      const response: any = await axios.post(
        `${BASEURL}/api/auth/createuser`,
        para1
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userReducer = createSlice({
  name: "recruiter",
  initialState: initialState,
  reducers: {
    CreateRecruiterPostValue: (state: any, action) => {
      state = "";
    },
  },
  extraReducers: {
    [RecruitersPostValue.pending]: (state) => {
      state.isLoading = true;
    },
    [RecruitersPostValue.fulfilled]: (state, action) => {
      state.roles = action.payload.user;
    },
    [RecruitersPostValue.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const { CreateRecruiterPostValue } = userReducer.actions;
export default userReducer.reducer;
