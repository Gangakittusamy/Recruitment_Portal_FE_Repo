import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASEURL } from "../../components/Constant/const";
import axios from "../../components/Constant/Api";

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

export const RecruitersGetValue: any = createAsyncThunk(
  "auth/recruiterGetValue",
  async (para1, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://54.152.227.71/api/auth/allusers`
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const RecruiterTableDelete = createAsyncThunk(
  "auth/recruiterDeleteApi",
  async (para1: any, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://54.152.227.71/api/auth/deleteuser/${para1}`
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const RecruiterTableEdit = createAsyncThunk(
  "auth/recruiterEditApi",
  async (para1: any, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://54.152.227.71/api/auth/updateuser/${para1}`
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
    RecruiterGetValue: (state: any, action) => {
      state = "";
    },
  },
  extraReducers: {
    [RecruitersGetValue.pending]: (state) => {
      state.isLoading = true;
    },
    [RecruitersGetValue.fulfilled]: (state, action) => {
      state.roles = action.payload.user;
    },
    [RecruitersGetValue.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const { RecruiterGetValue } = userReducer.actions;
export default userReducer.reducer;
