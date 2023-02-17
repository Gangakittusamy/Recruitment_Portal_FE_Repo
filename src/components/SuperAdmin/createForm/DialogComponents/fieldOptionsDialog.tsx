import React, { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import _ from "lodash"
import { dragAndDropValueSuperAdmin } from "../../../../features/counter/dragAndDrop"

interface MultipleSelectProps {
  item: any
  formId: any
  dialogVisible: boolean
  closeDialog: any
  isEditDialogOpen: any
}

const FieldOptionsDialog: React.FC<MultipleSelectProps> = ({
  dialogVisible,
  closeDialog,
  isEditDialogOpen,
  item,
  formId
}) => {
  const count: any = useAppSelector((state) => state)
  const dispatch = useAppDispatch()

  const removeField = (itemId: any) => {
    const currentFormElements = count.dragAndDrop.initialStartDragSuperAdmin
    let modifiedModule: any = {}
    for (const key in currentFormElements) {
      const currentFormId = key
      let currentFields = currentFormElements[currentFormId]
      const modifiedForm = currentFields.filter((f: any) => {
        return f.id !== itemId
      })
      modifiedModule[key] = modifiedForm
    }
    dispatch(dragAndDropValueSuperAdmin(modifiedModule))
    closeDialog(true)
  }

  const markAsRequired = (itemId: any, required: any) => {
    const currentFormElements = count.dragAndDrop.initialStartDragSuperAdmin
    let modifiedModule: any = {}
    for (const key in currentFormElements) {
      const currentFormId = key
      const modifiedForm = currentFormElements[currentFormId].map((f: any) => {
        if (f.id === itemId) {
          return {
            ...f,
            required: required
          }
        } else {
          return { ...f }
        }
      })
      modifiedModule[key] = modifiedForm
    }
    dispatch(dragAndDropValueSuperAdmin(modifiedModule))
    closeDialog(true)
  }

  return (
    <div
      id="field-dialog"
      className={`options-modal ${dialogVisible ? "show" : "hidden"}`}
    >
      <ul>
        {(!item.required || item.required === false) && (
          <li onClick={() => markAsRequired(item.id, true)}>
            Mark as required
          </li>
        )}
        {item.required && item.required === true && (
          <li onClick={() => markAsRequired(item.id, false)}>
            <i className="pi pi-check pr-1" style={{fontSize: "12px"}}></i> Mark as required
          </li>
        )}
        {item.subName === "Pick List" && (
          <li onClick={() => isEditDialogOpen(true)}>Edit Properties</li>
        )}
        <li onClick={() => removeField(item.id)} style={{ color: "#dc3545" }}>
          Remove Field
        </li>
      </ul>
    </div>
  )
}

export default FieldOptionsDialog
