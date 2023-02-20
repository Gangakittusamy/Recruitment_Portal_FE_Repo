import { createSlice, current } from "@reduxjs/toolkit";
import { idText } from "typescript";
import { RootState } from "../../app/store";
import _ from "lodash";

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
  completed: any;
  singleColumnForms:any;
  initiallyUpdatedModuleData:any;
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
  completed: [],
  singleColumnForms:[],
  initiallyUpdatedModuleData:[]
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
      const sameArray = _.isEqual( state.initialStartDragSuperAdmin, action.payload)
      if(!sameArray){
        state.initialStartDragSuperAdmin = action.payload;
      }
    },
    dragAndDropDialogIndexSuperAdmin: (state: any, action) => {
      state.DialogIndex = action.payload;
    },
    pickListDropDownData: (state: any, action) => {
      state.PickListData = state.PickListData.concat(action.payload)
    },
    setPickListDropDownData: (state: any, action) => {
      state.PickListData = action.payload
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
    setSingleColumnForms: (state: any, action) => {
      state.singleColumnForms = action.payload
    },
    setInitiallyUpdatedModuleData: (state: any, action) => {
      state.initiallyUpdatedModuleData = action.payload
    },

    formcompleted: (state, action) => {
      state.completed.push(action.payload.action);

      const dup = current(state.completed)?.filter(
        (x: any) =>
          x.subName === action.payload.action.subName &&
          x.id === action.payload.action.id &&
          x.inputIdValue === action.payload.action.inputIdValue
      );

      if (dup.length > 0) {
        const remDup = current(state.completed)?.filter(
          (x: any) => x.inputIdValue !== action.payload.action.inputIdValue
        );

        const finalDup = dup[dup.length - 1];
        const final = [...remDup, finalDup];

        state.completed = final;
      } else {
        const tempData = [...state.completed, action.payload.action];
        state.completed = tempData;
      }
    },
  },
});
export const selectStructuredData = (state: RootState) => {
  let structureData: any = {};

  state.dragAndDrop.completed.map((x: any) => {
    const id = Object.keys(structureData).find((y) => y === x.id);

    if (id === undefined) {
      structureData[x.id] = [];
      structureData[x.id].push(x);
    } else {
      structureData[x.id].push(x);
    }
  });

  return structureData;
};

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
  formcompleted,
  setPickListDropDownData,
  setSingleColumnForms,
  setInitiallyUpdatedModuleData
} = userReducer.actions;
export default userReducer.reducer;
