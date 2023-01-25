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

export const ProjectLogoName: any = createAsyncThunk(
  "auth/CreateProjectLogoName",
  async (para1, thunkAPI) => {
    try {
      const response: any = await axios.post(
        `http://54.152.227.71/api/profilelogo/createlogo`,
        para1
      );

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const LogoNameGet: any = createAsyncThunk(
  "module/moduleCreation",
  async (para1, thunkAPI) => {
    try {
      const response = await axios.get(
        ` http://54.152.227.71/api/profilelogo/currentuserlogo`
      );

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userReducer = createSlice({
  name: "recruiter",
  initialState: initialState,
  reducers: {
    CreateProjectLogoName: (state: any, action) => {
      state = "";
    },
  },
  extraReducers: {
    [ProjectLogoName.pending]: (state) => {
      state.isLoading = true;
    },
    [ProjectLogoName.fulfilled]: (state, action) => {
      state.roles = action.payload.user;
    },
    [ProjectLogoName.rejected]: (state, action) => {
      state.status = "error";
    },
  },
});

export const { CreateProjectLogoName } = userReducer.actions;
export default userReducer.reducer;
