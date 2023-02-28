import React, { useState, useEffect } from "react"
import { Dialog } from "primereact/dialog"
import { Button } from "primereact/button"
import { InputText } from "primereact/inputtext"
import { Calendar } from "primereact/calendar"
import { Dropdown } from "primereact/dropdown"
import { InputSwitch } from "primereact/inputswitch"
import { InputTextarea } from "primereact/inputtextarea"

import "./formSelectOptions.css"

interface MultipleSelectProps {
  showDialog: any
  isDialogClosed: any
}

const formTemplate = {
  subject: "",
  DueDate: ""
}

const TaskDialog: React.FC<MultipleSelectProps> = ({
  showDialog,
  isDialogClosed
}) => {
  const [dialogVisible, setDialogVisible] = useState(false)
  const [formData, setFormData] = React.useState<any>(formTemplate)

  const priority = [{ name: "High" }, { name: "Low" }]
  const owner = [{ name: "test 1" }, { name: "test 2" }]

  useEffect(() => {
    setDialogVisible(showDialog)
  }, [showDialog])

  const closeDialog = () => {
    isDialogClosed(true)
    setFormData(formTemplate)
  }

  const dialogSubmitHandler = () => {
    isDialogClosed(true)
  }

  const dialogFooterContent = (
    <div>
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={closeDialog}
        className="p-button-text"
      />
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={dialogSubmitHandler}
        autoFocus
      />
    </div>
  )

  const handleChange = (evt: any) => {
    let value = evt.target.value
    setFormData({
      ...formData,
      [evt.target.name]: value
    })
  }

  return (
    <div className="dialog-comp">
      <Dialog
        header={`Create Task`}
        visible={dialogVisible}
        position={"top"}
        style={{ width: "40vw" }}
        onHide={closeDialog}
        footer={dialogFooterContent}
        draggable={false}
        resizable={false}
      >
        <div className="task-form">
          <div className="form-element">
            <label>Subject</label>
            <div className="input">
              <InputText
                placeholder="Enter subject"
                name="subject"
                value={formData["subject"]}
                onChange={handleChange}
                className="mt-3"
                autoFocus={true}
              />
            </div>
          </div>
          <div className="form-element">
            <label>Due Date</label>
            <div className="input">
              <Calendar
                name="DueDate"
                value={formData["DueDate"]}
                placeholder="DD/MM/YYYY"
                onChange={handleChange}
                dateFormat="dd/mm/yy"
              />
            </div>
          </div>
          <div className="form-element">
            <label>Priority</label>
            <div className="input">
              <Dropdown
                value={formData["priority"]}
                onChange={handleChange}
                options={priority}
                optionLabel="name"
                placeholder="Select"
                name="priority"
                className="w-full md:w-14rem fso-dropdown"
              />
            </div>
          </div>
          <div className="form-element">
            <label>Owner</label>
            <div className="input">
              <Dropdown
                value={formData["owner"]}
                onChange={handleChange}
                options={owner}
                optionLabel="name"
                placeholder="Select"
                name="owner"
                className="w-full md:w-14rem fso-dropdown"
              />
            </div>
          </div>
          <div className="form-element">
            <label>Reminder</label>
            <div className="input">
              <InputSwitch
                name="reminder"
                checked={formData["reminder"]}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-element">
            <label>Repeat</label>
            <div className="input">
              <InputSwitch
                name="repeat"
                checked={formData["repeat"]}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-element-desc">
            <label>Description</label>
            <div className="input">
              <InputTextarea
                name="description"
                value={formData["description"]}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default TaskDialog
