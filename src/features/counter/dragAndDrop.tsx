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
  ListIdDragAndDrop:any;
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
  ListIdDragAndDrop:{}
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
      state.PickListData.push(action.payload) 
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
    PickListidDragAndDrop: (state, action) => {
      state.ListIdDragAndDrop = action.payload;
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
  PickListidDragAndDrop,
} = userReducer.actions;
export default userReducer.reducer;
