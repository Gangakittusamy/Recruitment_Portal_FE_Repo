import React, { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import _ from "lodash"
import {
  dragAndDropValueSuperAdmin,
  setSingleColumnForms
} from "../../../../features/counter/dragAndDrop"

interface MultipleSelectProps {
  dialogVisible: boolean
  formDetails: any
  formIndex: any
  closeDialog: any
}

const FormOptionsDialog: React.FC<MultipleSelectProps> = ({
  dialogVisible,
  formDetails,
  formIndex,
  closeDialog
}) => {
  const [forms, setForms] = useState<any>()
  const count: any = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setForms(count.dragAndDrop.initialStartDragSuperAdmin)
  }, [count.dragAndDrop.initialStartDragSuperAdmin])

  const fetchCurrentFormKey = () => {
    const currentForms = _.cloneDeep(forms)
    const idArray = Object.keys(currentForms)
    return idArray[formIndex]
  }

  const removeForm = () => {
    const currentForms = _.cloneDeep(forms)
    const deletedKey = fetchCurrentFormKey()
    delete currentForms[deletedKey]
    dispatch(dragAndDropValueSuperAdmin(currentForms))
    closeDialog()
  }

  const makeSingleColumn = () => {
    const currentFormKeyKey = fetchCurrentFormKey()
    const sigleColumnForms = [
      ...count.dragAndDrop.singleColumnForms,
      currentFormKeyKey
    ]
    dispatch(setSingleColumnForms(sigleColumnForms))
    closeDialog(true)
  }

  const makeDoubleColumn = () => {
    const currentFormKeyKey = fetchCurrentFormKey()
    const sigleColumnForms = count.dragAndDrop.singleColumnForms.filter(
      (f: any) => {
        return f !== currentFormKeyKey
      }
    )
    dispatch(setSingleColumnForms(sigleColumnForms))
    closeDialog(true)
  }

  return (
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
          Single Column
        </li>
        <li
          onClick={() => {
            makeDoubleColumn()
          }}
        >
          Double Column
        </li>
        <li style={{ color: "#dc3545" }} onClick={() => removeForm()}>
          <i className="pi pi-trash pr-2"></i>Delete
        </li>
      </ul>
    </div>
  )
}

export default FormOptionsDialog
