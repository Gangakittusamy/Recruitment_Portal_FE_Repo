import React, { useEffect, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"
import { InputText } from "primereact/inputtext"
import { InputNumber } from "primereact/inputnumber"
import { Button } from "primereact/button"
import "./customModule.css"

interface MultipleSelectProps {}

const tableData = {
  serialNO: "Number",
  productName: "Single Line",
  quantity: "Decimal",
  listPrice: "Currency",
  amount: "Currency"
}

const priceTableData = [
  { heading: "Sub Total", field: "Currency" },
  { heading: "Discount", field: "Currency" },
  { heading: "Tax", field: "Currency" },
  { heading: "Adjustment", field: "Currency" },
  { heading: "Grand Total", field: "Currency" }
]

const SubForm: React.FC<MultipleSelectProps> = ({}) => {
  const [tableValue, setTableValue] = useState<any>([])
  const [priceTableFields, setPriceTableFields] = useState<any>([])

  useEffect(() => {
    setTableValue([tableData])
    setPriceTableFields(priceTableData)
  }, [])

  const getField = (fieldType: any) => {
    switch (fieldType) {
      case "Currency":
        return (
          <InputNumber
            inputId="currency-india"
            mode="currency"
            currency="INR"
            currencyDisplay="code"
            locale="en-IN"
          />
        )
      case "Decimal":
        return <InputNumber minFractionDigits={2} maxFractionDigits={5} />
      case "Number":
        return <InputNumber />
      default:
        return <InputText />
    }
  }

  const getFieldInput = (rowdata: any, rowProps: any, header: any) => {
    const rowIndex = rowProps.rowIndex
    const fieldType = rowdata[header]
    return getField(fieldType)
  }

  return (
    <div className="sub-form w-full">
      <div className="heading">
        <h4>Quoted Items</h4>
      </div>
      {tableValue && (
        <div className="main-table">
          <DataTable showGridlines value={tableValue}>
            {tableValue[0] &&
              Object.keys(tableValue[0]).map((header: any, i: any) => {
                return (
                  <Column
                    key={i}
                    header={header}
                    body={(e: any, props: any) =>
                      getFieldInput(e, props, header)
                    }
                  ></Column>
                )
              })}
          </DataTable>
        </div>
      )}
      <div className="price-section">
        <div className="mt-3">
          <Button
            label="Add Row"
            onClick={() => setTableValue([...tableValue, tableData])}
          />
        </div>
        <div className="price-table">
          {priceTableFields &&
            priceTableFields.map((field: any, index: any) => {
              return (
                <div className="content">
                  <span>{field.heading}</span>
                  <span>
                    <InputNumber
                      inputId="currency-india"
                      mode="currency"
                      currency="INR"
                      currencyDisplay="code"
                      locale="en-IN"
                      name={field.heading}
                    />
                  </span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default SubForm
