import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../components/Constant/Api";
import { BASEURL } from "../../components/Constant/const";

interface userReducerState {
  logInVerificationPage: null;
  error: any;
  isLoading: boolean;
  roles: null;
  status: string;
  rolesDelete: null;
  rolesGet: null;
  rolesUpdate: null;
  rolesGetForms: null;
}

const initiallogInVerificationPage: userReducerState = {
  logInVerificationPage: null,
  status: "",
  error: "",
  roles: null,
  isLoading: false,
  rolesGet: null,
  rolesDelete: null,
  rolesUpdate: null,
  rolesGetForms: null,
};

export const NewModuleCreation: any = createAsyncThunk(
  "module/moduleCreation",
  async (para1: object, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASEURL}/api/forms/createforms`,
        para1
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ModuleNameGet: any = createAsyncThunk(
  "module/moduleCreation",
  async (para1, thunkAPI) => {
    try {
      const response = await axios.get(`${BASEURL}/api/forms/getmodule`);

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ModuleNameDelete: any = createAsyncThunk(
  "module/moduleCreation",
  async (para1, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASEURL}/api/forms/deleteforms/${para1}`
      );

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ModuleNameUpdate: any = createAsyncThunk(
  "module/moduleCreation",
  async (para1: any, thunkAPI) => {
    try {
      const response: Object = await axios.put(
        `${BASEURL}/api/forms/updateforms/${para1.editId}`,
        para1.payload
      );
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const ModuleNameGetFormsaa: any = createAsyncThunk(
  "app/moduleCreationn",
  async (para1, thunkAPI) => {
    try {
      const response: any = await axios.get(
        `${BASEURL}/api/forms/getforms/${para1}`
      );

      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const userReducer = createSlice({
  name: "moduleCreation",
  initialState: initiallogInVerificationPage,
  reducers: {
    logInVerificationValue: (state: any, action) => {
      state.logInVerificationPage = action.payload;
    },
    resetStatus: (state, action) => {
      state.error = "";
      //   state.status = "";
    },
  },

  extraReducers: {
    [NewModuleCreation.pending]: (state: any) => {
      state.isLoading = true;
    },
    [NewModuleCreation.fulfilled]: (state: any, action: any) => {
      state.roles = action.payload;
    },
    [NewModuleCreation.rejected]: (state: any, action: any) => {
      state.status = "error";
    },
    [ModuleNameGetFormsaa.fulfilled]: (state: any, action: any) => {
      state.rolesGetForms = action.payload.data.data;
    },

    [ModuleNameGet.pending]: (state: any) => {
      state.isLoading = true;
    },
    [ModuleNameGet.fulfilled]: (state: any, action: any) => {
      state.rolesGet = action.payload.data.user;
    },
    [ModuleNameGet.rejected]: (state: any, action: any) => {
      state.status = "error";
    },
    [ModuleNameDelete]: (state: any, action: any) => {
      state.rolesDelete = action.payload.data.user;
    },
    [ModuleNameUpdate.fulfilled]: (state: any, action: any) => {
      // state.rolesUpdate = action.payload;
    },
  },
});
export const { logInVerificationValue, resetStatus } = userReducer.actions;
export default userReducer.reducer;
