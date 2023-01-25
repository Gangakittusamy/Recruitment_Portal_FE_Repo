import { createSlice } from "@reduxjs/toolkit";

interface userReducerState {
  initialStateDrag: null;
  initialStateQuickDrag: null;
  DialogOpenIndex: null;
  initialStartDragSuperAdmin: any;
  DialogIndex: null;
  PickListData: any;
  pickListDragableId: null;
  newSectionIndex: null;
  EditIdDragAndDrop: null;
}

const initialDragAndDrop: userReducerState = {
  initialStateDrag: null,
  initialStateQuickDrag: null,
  DialogOpenIndex: null,
  initialStartDragSuperAdmin: null,
  DialogIndex: null,
  PickListData: [],
  pickListDragableId: null,
  newSectionIndex: null,
  EditIdDragAndDrop: null,
};

export const userReducer = createSlice({
  name: "userData",
  initialState: initialDragAndDrop,
  reducers: {
    dragAndDropValue: (state: any, action) => {
      state.initialStateDrag = action.payload;
    },
    quickDragAndDropValue: (state: any, action) => {
      state.initialStateQuickDrag = action.payload;
    },
    dragAndDropDialogOpenIndex: (state: any, action) => {
      state.DialogOpenIndex = action.payload;
    },
    dragAndDropValueSuperAdmin: (state: any, action) => {
      state.initialStartDragSuperAdmin = action.payload;
    },
    dragAndDropDialogIndexSuperAdmin: (state: any, action) => {
      state.DialogIndex = action.payload;
    },
    pickListDropDownData: (state: any, action) => {
      state.PickListData = action.payload;
    },
    pickListDragableIdStore: (state, action) => {
      state.pickListDragableId = action.payload;
    },
    newSectionIndexData: (state, action) => {
      state.newSectionIndex = action.payload;
    },
    formEditIdDragAndDrop: (state, action) => {
      state.EditIdDragAndDrop = action.payload;
    },
  },
});
export const {
  dragAndDropValue,
  quickDragAndDropValue,
  dragAndDropDialogOpenIndex,
  dragAndDropValueSuperAdmin,
  formEditIdDragAndDrop,
  dragAndDropDialogIndexSuperAdmin,
  pickListDropDownData,
  pickListDragableIdStore,
  newSectionIndexData,
} = userReducer.actions;
export default userReducer.reducer;
