import { useState } from "react"
import CheckBox from "./CheckBox"
import ItemForm from "./ItemForm"
import SupplierForm from "./SupplierForm"

const InventoryPage = () => {
  const [itemChecked, setItemChecked] = useState(false)
  const [formData, setFormData] = useState({
    itemDetails: {
      itemName: "",
      quantity: "",
      unitPrice: "",
      currency: "$",
      submissionDate: "",
    },
    supplier: {
      supplierName: "",
      companyName: "",
      email: "",
      phoneCode: "",
      phoneNumber: "",
      countryId: "",
      stateId: "",
      cityId: "",
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleFormDataChange = (type, updatedData) => {
    setFormData((prevState) => ({
      ...prevState,
      [type]: updatedData,
    }))
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await fetch("https://apis-technical-test.conqt.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setSuccess("Data submitted successfully!")
      console.log("Success:", result)
    } catch (err) {
      setError(`Submission failed: ${err.message}`)
      console.error("Error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#007aff",
            paddingLeft: "10px",
            color: "white",
          }}
        >
          <div
            style={{
              borderRadius: "50%",
              height: "20px",
              width: "20px",
              backgroundColor: "white",
              marginRight: "10px",
              display: "flex",
            }}
          ></div>
          <p> Inventory Management System</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CheckBox itemChecked={itemChecked} setItemChecked={setItemChecked} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {itemChecked ? (
          <ItemForm
            formData={formData.itemDetails}
            onFormDataChange={(data) =>
              handleFormDataChange("itemDetails", data)
            }
          />
        ) : (
          <SupplierForm
            formData={formData.supplier}
            onFormDataChange={(data) => handleFormDataChange("supplier", data)}
          />
        )}
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={handleSubmit} style={buttonStyle} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
    </>
  )
}

const buttonStyle = {
  backgroundColor: "#007aff",
  color: "white",
  border: "none",
  borderRadius: "4px",
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
}

export default InventoryPage
