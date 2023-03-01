import React, { useState, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import _ from "lodash"
import {
  dragAndDropValueSuperAdmin,
  setSingleColumnForms
} from "../../../../features/counter/dragAndDrop"
import { Toast } from "primereact/toast"

interface MultipleSelectProps {
  dialogVisible: boolean
  formDetails: any
  formIndex: any
  formName: any
  closeDialog: any
  isSingleColumn: any
  setFormNames: any
}

const FormOptionsDialog: React.FC<MultipleSelectProps> = ({
  dialogVisible,
  formDetails,
  formIndex,
  formName,
  closeDialog,
  isSingleColumn,
  setFormNames
}) => {
  const [forms, setForms] = useState<any>()
  const count: any = useAppSelector((state) => state)
  const dispatch = useAppDispatch()
  const toast: any = useRef(null)

  useEffect(() => {
    setForms(count.dragAndDrop.initialStartDragSuperAdmin)
  }, [count.dragAndDrop.initialStartDragSuperAdmin])

  const fetchCurrentFormKey = () => {
    const currentForms = _.cloneDeep(forms)
    const idArray = Object.keys(currentForms)
    return idArray[formIndex]
  }

  const removeForm = () => {
    let formNames = _.cloneDeep(formName)
    const currentForms = _.cloneDeep(forms)
    if (Object.keys(currentForms).length > 1) {
      const deletedKey = fetchCurrentFormKey()
      delete currentForms[deletedKey]
      formNames = formNames.filter((f: any, index: any) => index !== formIndex)
      setFormNames(formNames)
      dispatch(dragAndDropValueSuperAdmin(currentForms))
      closeDialog()
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Module cannot be empty",
        life: 3000
      })
      setTimeout(() => {
        closeDialog()
      }, 500)
    }
  }

  const makeSingleColumn = () => {
    if (formDetails.name) {
      const currentFormName = formDetails.name
      const singleColumnForms = [
        ...count.dragAndDrop.singleColumnForms,
        currentFormName
      ]
      dispatch(setSingleColumnForms(singleColumnForms))
      closeDialog(true)
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please add a form name",
        life: 3000
      })
    }
  }

  const makeDoubleColumn = () => {
    if (formDetails.name) {
      const currentFormName = formDetails.name
      const singleColumnForms = count.dragAndDrop.singleColumnForms.filter(
        (f: any) => {
          return f !== currentFormName
        }
      )
      dispatch(setSingleColumnForms(singleColumnForms))
      closeDialog(true)
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Warning",
        detail: "Please add a form name",
        life: 3000
      })
    }
  }

  return (
    <div>
      <Toast ref={toast} />
      <div
        id="field-dialog"
        className={`form-dialog options-modal ${
          dialogVisible ? "show" : "hidden"
        }`}
      >
        <ul>
          <li
            onClick={() => {
              makeSingleColumn()
            }}
          >
            {isSingleColumn && (
              <i className="pi pi-check pr-1" style={{ fontSize: "12px" }}></i>
            )}
            Single Column
          </li>
          <li
            onClick={() => {
              makeDoubleColumn()
            }}
          >
            {!isSingleColumn && (
              <i className="pi pi-check pr-1" style={{ fontSize: "12px" }}></i>
            )}
            Double Column
          </li>
          <li style={{ color: "#dc3545" }} onClick={() => removeForm()}>
            <i className="pi pi-trash pr-2"></i>Delete
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FormOptionsDialog
