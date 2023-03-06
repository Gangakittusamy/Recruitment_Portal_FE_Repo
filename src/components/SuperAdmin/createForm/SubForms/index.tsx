import React, { useEffect, useState } from "react"
import { DataTable } from "primereact/datatable"
import { Column } from "primereact/column"

import "./subForms.css"

interface MultipleSelectProps {}

const tableData = [
  {
    serialNO: "Number",
    productName: "Single Line",
    quantity: "Decimal",
    listPrice: "Currency",
    amount: "Currency"
  }
]

const priceTableData = [
  { heading: "Sub Total", field: "Currency" },
  { heading: "Discount", field: "Currency" },
  { heading: "Tax", field: "Currency" },
  { heading: "Adjustment", field: "Currency" },
  { heading: "Grand Total", field: "Currency" }
]

const SubForms: React.FC<MultipleSelectProps> = ({}) => {
  const [tableValue, setTableValue] = useState<any>([])
  const [priceTableFields, setPriceTableFields] = useState<any>([])

  useEffect(() => {
    setTableValue(tableData)
    setPriceTableFields(priceTableData)
  }, [])

  return (
    <div>
      <div className="heading">
        <h4>Quoted Items</h4>
      </div>
      <div className="main-table">
        <DataTable showGridlines value={tableValue}>
          <Column header="S.NO" field="serialNO"></Column>
          <Column header="Product Name" field="productName"></Column>
          <Column header="Quantity" field="quantity"></Column>
          <Column header="List Price" field="listPrice"></Column>
          <Column header="Amount" field="amount"></Column>
        </DataTable>
      </div>
      <div className="price-section">
        <div className="price-table">
          {priceTableFields &&
            priceTableFields.map((field: any, index: any) => {
              return (
                <div className="content">
                  <span>{field.heading}</span>
                  <span>{field.field}</span>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default SubForms
