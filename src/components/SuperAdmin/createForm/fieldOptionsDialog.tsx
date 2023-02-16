import React, { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import _ from "lodash"
import { dragAndDropValueSuperAdmin } from "../../../features/counter/dragAndDrop"

interface MultipleSelectProps {
  item: any
  dialogVisible: boolean
  isFieldremoved: any
  isEditDialogOpen: any
}

const FieldOptionsDialog: React.FC<MultipleSelectProps> = ({
  dialogVisible,
  isFieldremoved,
  isEditDialogOpen,
  item
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
    isFieldremoved(true)
  }

  const markAsRequired = (itemId: any) => {}

  return (
    <div
      id="field-dialog"
      className={`options-modal ${dialogVisible ? "show" : "hidden"}`}
    >
      <ul>
        <li onClick={() => markAsRequired(item.id)}>Mark as required</li>
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
