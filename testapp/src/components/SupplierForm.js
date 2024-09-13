import React, { useState, useEffect } from "react"

const SupplierForm = ({ formData, onFormDataChange }) => {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  console.log(formData)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CountryList"
        )
        if (!response.ok) {
          throw new Error("Failed to fetch countries")
        }
        const data = await response.json()
        // Ensure data is an array
        if (Array.isArray(data.data.countyList)) {
          setCountries(data.data.countyList)
        } else {
          console.error("Unexpected format for countries data:", data)
          setCountries([])
        }
      } catch (error) {
        console.error("Error fetching countries:", error)
        setCountries([])
      }
    }

    fetchCountries()
  }, [])

  useEffect(() => {
    const fetchStates = async () => {
      if (formData.countryId) {
        try {
          const response = await fetch(
            `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-SateList-By-Country?countryId=${formData.countryId}`
          )
          if (!response.ok) {
            throw new Error("Failed to fetch states")
          }
          const data = await response.json()
          if (Array.isArray(data.data.stateList)) {
            setStates(data.data.stateList)
          } else {
            console.error("Unexpected format for states data:", data)
            setStates([])
          }
        } catch (error) {
          console.error("Error fetching states:", error)
          setStates([])
        }
      } else {
        setStates([])
        setCities([])
      }
    }

    fetchStates()
  }, [formData.countryId])

  useEffect(() => {
    const fetchCities = async () => {
      if (formData.stateId) {
        try {
          const response = await fetch(
            `https://apis-technical-test.conqt.com/Api/countrystatecity/Get-All-CityList-By-Country-State?countryId=${formData.countryId}&stateId=${formData.stateId}`
          )
          if (!response.ok) {
            throw new Error("Failed to fetch cities")
          }
          const data = await response.json()
          if (Array.isArray(data.data.cityList)) {
            setCities(data.data.cityList)
          } else {
            console.error("Unexpected format for cities data:", data)
            setCities([])
          }
        } catch (error) {
          console.error("Error fetching cities:", error)
          setCities([])
        }
      } else {
        setCities([])
      }
    }

    fetchCities()
  }, [formData.stateId])

  const handleChange = (e) => {
    const { name, value } = e.target
    onFormDataChange({ ...formData, [name]: value })
  }

  const handleCountryChange = (e) => {
    const { value, name } = e.target
    console.log("Selected countryId:", value, name) // Log the selected countryId
    onFormDataChange({
      ...formData,
      countryId: value,
      stateId: "", // Clear stateId and cityId when countryId changes
      cityId: "",
    })
  }

  const handleStateChange = (e) => {
    const { value } = e.target
    onFormDataChange({
      ...formData,
      stateId: value,
      cityId: "", // Clear cityId when stateId changes
    })
  }

  const handleCityChange = (e) => {
    const { value } = e.target
    onFormDataChange({
      ...formData,
      cityId: value,
    })
  }

  return (
    <div style={containerStyle}>
      <div style={inputContainerStyle}>
        <label htmlFor="supplierName" style={labelStyle}>
          Supplier Name:
        </label>
        <input
          type="text"
          id="supplierName"
          name="supplierName"
          value={formData.supplierName}
          onChange={handleChange}
          placeholder="Adil"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="companyName" style={labelStyle}>
          Company Name:
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Apple"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="email" style={labelStyle}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="adilIsmail@apple.co"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="phoneCode" style={labelStyle}>
          Phone Code:
        </label>
        <input
          type="text"
          id="phoneCode"
          name="phoneCode"
          value={formData.phoneCode}
          onChange={handleChange}
          placeholder="+91"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="phoneNumber" style={labelStyle}>
          Phone Number:
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="7007402688"
          style={inputStyle}
        />
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="countryId" style={labelStyle}>
          Country:
        </label>
        <select
          id="countryId"
          name="countryId"
          value={formData.countryId}
          onChange={handleCountryChange}
          style={inputStyle}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.countryId} value={country.countryId}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="stateId" style={labelStyle}>
          State:
        </label>
        <select
          id="stateId"
          name="stateId"
          value={formData.stateId}
          onChange={handleStateChange}
          style={inputStyle}
          disabled={!formData.countryId}
        >
          <option value="">Select State</option>
          {states.map((state) => (
            <option key={state.stateId} value={state.stateId}>
              {state.name}
            </option>
          ))}
        </select>
      </div>

      <div style={inputContainerStyle}>
        <label htmlFor="cityId" style={labelStyle}>
          City:
        </label>
        <select
          id="cityId"
          name="cityId"
          value={formData.cityId}
          onChange={handleCityChange}
          style={inputStyle}
          disabled={!formData.stateId}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.Id} value={city.Id}>
              {city.name}
            </option>
          ))}
        </select>
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

export default SupplierForm
