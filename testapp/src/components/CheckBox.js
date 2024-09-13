import React, { useState } from "react"

let CheckBox = ({
  setItemChecked,
  itemChecked,
  supplierChecked,
  setSupplierChecked,
}) => {
  return (
    <div style={{ display: "flex", gap: "20px", margin: "10px" }}>
      <div>
        <input
          type="checkbox"
          id="item"
          name="item"
          checked={itemChecked}
          onChange={() => {
            setItemChecked(!itemChecked)
            // setSupplierChecked(false)
          }}
          style={{ accentColor: "blue" }} // Blue tick
        />
        <label htmlFor="item">Item</label>
      </div>
      <div>
        <input
          type="checkbox"
          id="supplier"
          name="supplier"
          checked={!itemChecked}
          onChange={() => {
            setItemChecked(!itemChecked)
          }}
          style={{ accentColor: "blue" }} // Blue tick
        />
        <label htmlFor="supplier">Supplier</label>
      </div>
    </div>
  )
}

export default CheckBox
