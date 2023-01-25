import { createSlice } from "@reduxjs/toolkit";

interface userReducerState {
  indexValue: number;
}

const initialState: userReducerState = {
  indexValue: 0,
};

export const userReducer = createSlice({
  name: "userData",
  initialState: initialState,
  reducers: {
    dashboardIndexValue: (state: any, action) => {
      state.indexValue = action.payload;
    },
  },
});
export const { dashboardIndexValue } = userReducer.actions;
export default userReducer.reducer;
