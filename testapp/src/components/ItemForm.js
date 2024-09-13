import React from "react"

const ItemForm = ({ formData, onFormDataChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target
    onFormDataChange({ ...formData, [name]: value })
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate >= today) {
      onFormDataChange({ ...formData, submissionDate: e.target.value })
    }
  }

  return (
    <div style={containerStyle}>
      <div style={inputContainerStyle}>
        <label htmlFor="itemName" style={labelStyle}>
          Item Name:
        </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          placeholder="Mac Book"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="quantity" style={labelStyle}>
          Quantity (Units):
        </label>
        <input
          type="text"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          placeholder="5"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="unitPrice" style={labelStyle}>
          Unit Price:
        </label>
        <input
          type="text"
          id="unitPrice"
          name="unitPrice"
          value={formData.unitPrice}
          onChange={handleChange}
          placeholder="2000"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="submissionDate" style={labelStyle}>
          Submission Date:
        </label>
        <input
          type="date"
          id="submissionDate"
          name="submissionDate"
          value={formData.submissionDate}
          onChange={handleDateChange}
          style={inputStyle}
        />
      </div>
    </div>
  )
}

const containerStyle = {
  backgroundColor: "#ebeffd",
  padding: "20px",
  borderRadius: "8px",
  width: "600px",
  display: "flex",
  flexWrap: "wrap",
}

const inputContainerStyle = {
  width: "50%",
  marginBottom: "10px",
  display: "flex",
  flexDirection: "column",
}

const labelStyle = {
  fontWeight: "bold",
  textAlign: "left",
  marginBottom: "5px",
}

const inputStyle = {
  width: "90%",
  borderRadius: "4px",
  border: "1px solid #ddd",
  height: "26px",
}

const displayStyle = {
  width: "90%",
  borderRadius: "4px",
  border: "1px solid #ddd",
  height: "26px",
  lineHeight: "26px",
  paddingLeft: "10px",
  backgroundColor: "#fff",
  color: "#000",
}

export default ItemForm
