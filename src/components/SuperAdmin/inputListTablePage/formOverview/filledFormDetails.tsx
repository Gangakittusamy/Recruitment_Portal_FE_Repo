import React from "react"
import "./formOverview.css"

interface MultipleSelectProps {
  formElements: any
  selectedForm: any
}

const FilledFormDetails: React.FC<MultipleSelectProps> = ({
  formElements,
  selectedForm
}) => {
  return (
    <div className="border-black-alpha-30 border-1 pb-3 overview-indv-block">
      <div className="createForm">
        {Object.keys(formElements).map((formName: any, index: any) => {
          return (
            <div key={index} className="indv-form">
              <h4 className="formName">{formName}</h4>
              <div className={`indv-form-elem`}>
                {formElements[formName].map((item: any, index: number) => {
                  return (
                    <div key={index} className="card border-0 form-item">
                      {item.type === "Pick List" ? (
                        <div className="names">
                          <p className={`grey`}>{item.DataHeader} :</p>
                          <p className="field-container">
                            {selectedForm[item.DataHeader]}
                          </p>
                        </div>
                      ) : (
                        <div className="names">
                          <p className={`grey`}>{item.value} :</p>
                          <p className="field-container">
                            {selectedForm[item.value]}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default React.memo(FilledFormDetails)
