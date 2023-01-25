import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../components/Constant/Api";
import { BASEURL } from "../../components/Constant/const";

interface userReducerState {
  logInVerificationPage: null;
  status: any;
  error: any;
  rolesGet: any;
  rolesPost: any;
}

const initiallogInVerificationPage: userReducerState = {
  logInVerificationPage: null,
  status: "",
  error: "",
  rolesGet: "",
  rolesPost: null,
};

export const leadGenerationTable: any = createAsyncThunk(
  "table/tableCreation",
  async (name: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASEURL}/api/formdatas/createtabledata `,
        name
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const leadGenerationTableGet: any = createAsyncThunk(
  "table/tableCreation",
  async (name: any, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASEURL}/api/formdatas/moduletabledata/${name}`
      );

      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userReducer = createSlice({
  name: "logInVerification",
  initialState: initiallogInVerificationPage,
  reducers: {},
  extraReducers: {
    [leadGenerationTable.pending]: (state: any) => {
      state.isLoading = true;
    },
    [leadGenerationTable.fulfilled]: (state: any, action: any) => {
      state.rolesPost = action.payload.data.user;
    },
    [leadGenerationTable.rejected]: (state: any, action: any) => {
      state.status = "error";
    },
    [leadGenerationTableGet.pending]: (state: any) => {
      state.isLoading = true;
    },
    [leadGenerationTableGet.fulfilled]: (state: any, action: any) => {
      state.rolesGet = action.payload.data.user;
    },
    [leadGenerationTableGet.rejected]: (state: any, action: any) => {
      state.status = "error";
    },
  },
});
export const {} = userReducer.actions;
export default userReducer.reducer;
