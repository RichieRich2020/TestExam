import React, { useState, useEffect } from "react"

const ItemForm = ({ formData, onFormDataChange }) => {
  const [errors, setErrors] = useState({})

  useEffect(() => {
    // Validate fields whenever formData changes
    const validationErrors = validateFields(formData)
    setErrors(validationErrors)
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    const newFormData = { ...formData, [name]: value }

    onFormDataChange(newFormData)
  }

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (selectedDate >= today) {
      onFormDataChange({ ...formData, submissionDate: e.target.value })
      setErrors((prevErrors) => ({ ...prevErrors, submissionDate: "" })) // Clear error if valid
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        submissionDate: "Submission date cannot be in the past",
      }))
    }
  }

  const validateFields = (data) => {
    const errors = {}

    if (
      !Number.isInteger(Number(data.quantity)) ||
      Number(data.quantity) <= 0
    ) {
      errors.quantity = "Quantity must be a positive integer"
    }

    if (!Number(data.unitPrice) || Number(data.unitPrice) <= 0) {
      errors.unitPrice = "Unit price must be a positive number"
    }

    return errors
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
        {errors.quantity && (
          <span style={{ color: "red" }}>{errors.quantity}</span>
        )}
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
        {errors.unitPrice && (
          <span style={{ color: "red" }}>{errors.unitPrice}</span>
        )}
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
        {errors.submissionDate && (
          <span style={{ color: "red" }}>{errors.submissionDate}</span>
        )}
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

export default ItemForm
