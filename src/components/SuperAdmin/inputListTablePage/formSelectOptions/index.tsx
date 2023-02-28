import React, { useState, useEffect } from "react"
import { Dropdown } from "primereact/dropdown"
import { Button } from "primereact/button"
import TaskDialog from "./taskDialog"
import "../tablePage.css"

interface MultipleSelectProps {
  selectedForms: any
}

const FormSelectOptions: React.FC<MultipleSelectProps> = ({
  selectedForms
}) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [componentSelected, setComponentSelected] = useState("")
  const [selectedMacro, setSelectedMacro] = useState(null)
  const [selectedTags, setSelectedTags] = useState(null)
  const [selectedActions, setSelectedActions] = useState(null)

  const macroOptions = [{ name: "Create Macro" }]

  const tagsOptions = [{ name: "Add Tags" }, { name: "Remove Tags" }]

  const actionsOptions = [
    { name: "Mass Update" },
    { name: "Add To campaigns" },
    { name: "Update response" },
    { name: "Print Mailing Labels" },
    { name: "Mail Merge" },
    { name: "Mass Convert" },
    { name: "Delete" }
  ]

  const showDialog = (component: any) => {
    setDialogVisible(true)
    setComponentSelected(component)
  }

  return (
    <div className="fso-container">
      <div className="flex align-items-center justify-content-between">
        <div>
          <Dropdown
            value={selectedMacro}
            onChange={(e) => setSelectedMacro(e.value)}
            options={macroOptions}
            optionLabel="name"
            placeholder="Run Macro"
            className="w-full md:w-14rem fso-dropdown"
          />
        </div>
        <div>
          <Button label="Send Email" className="fso-btn" />
        </div>
        <div>
          <Button
            label="Create Task"
            className="fso-btn"
            onClick={() => showDialog("Task")}
          />
        </div>
        <div>
          <Dropdown
            value={selectedTags}
            onChange={(e) => setSelectedTags(e.value)}
            options={tagsOptions}
            optionLabel="name"
            placeholder="Tags"
            className="w-full md:w-14rem fso-dropdown"
          />
        </div>
        <div>
          <Dropdown
            value={selectedActions}
            onChange={(e) => setSelectedActions(e.value)}
            options={actionsOptions}
            optionLabel="name"
            placeholder="Actions"
            className="w-full md:w-14rem fso-dropdown"
          />
        </div>
      </div>
      <div className="dialog-comp">
        {componentSelected && componentSelected === "Task" && (
          <TaskDialog
            showDialog={dialogVisible}
            isDialogClosed={() => {
              setDialogVisible(false)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default FormSelectOptions
