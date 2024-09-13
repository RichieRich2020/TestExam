import React, { useState, useEffect } from "react"

const SupplierForm = ({ formData, onFormDataChange }) => {
  const [countries, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

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

  useEffect(() => {
    const validateFormData = () => {
      const newErrors = {}

      if (!formData.supplierName) {
        newErrors.supplierName = "Supplier Name is required"
      }

      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "A valid email address is required"
      }

      if (!formData.phoneNumber || !/^\d+$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = "Phone Number must be a valid number"
      }

      if (!formData.countryId) {
        newErrors.countryId = "Country is required"
      }

      if (!formData.stateId) {
        newErrors.stateId = "State is required"
      }

      if (!formData.cityId) {
        newErrors.cityId = "City is required"
      }

      setErrors(newErrors)
    }

    validateFormData()
  }, [formData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setTouched({ ...touched, [name]: true })
    onFormDataChange({ ...formData, [name]: value })
  }

  const handleCountryChange = (e) => {
    const { value } = e.target
    setTouched({ ...touched, countryId: true, stateId: false, cityId: false })
    onFormDataChange({
      ...formData,
      countryId: value,
      stateId: "",
      cityId: "",
    })
  }

  const handleStateChange = (e) => {
    const { value } = e.target
    setTouched({ ...touched, stateId: true, cityId: false })
    onFormDataChange({
      ...formData,
      stateId: value,
      cityId: "",
    })
  }

  const handleCityChange = (e) => {
    const { value } = e.target
    setTouched({ ...touched, cityId: true })
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
          onFocus={() => setTouched({ ...touched, supplierName: true })}
          placeholder="Adil"
          style={inputStyle}
        />
        {touched.supplierName && errors.supplierName && (
          <span style={{ color: "red" }}>{errors.supplierName}</span>
        )}
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
          onFocus={() => setTouched({ ...touched, companyName: true })}
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
          onFocus={() => setTouched({ ...touched, email: true })}
          placeholder="adilIsmail@apple.co"
          style={inputStyle}
        />
        {touched.email && errors.email && (
          <span style={{ color: "red" }}>{errors.email}</span>
        )}
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
          onFocus={() => setTouched({ ...touched, phoneCode: true })}
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
          onFocus={() => setTouched({ ...touched, phoneNumber: true })}
          placeholder="7007402688"
          style={inputStyle}
        />
        {touched.phoneNumber && errors.phoneNumber && (
          <span style={{ color: "red" }}>{errors.phoneNumber}</span>
        )}
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
          onFocus={() => setTouched({ ...touched, countryId: true })}
          style={inputStyle}
        >
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option key={country.countryId} value={country.countryId}>
              {country.name}
            </option>
          ))}
        </select>
        {touched.countryId && errors.countryId && (
          <span style={{ color: "red" }}>{errors.countryId}</span>
        )}
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
          onFocus={() => setTouched({ ...touched, stateId: true })}
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
        {touched.stateId && errors.stateId && (
          <span style={{ color: "red" }}>{errors.stateId}</span>
        )}
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
          onFocus={() => setTouched({ ...touched, cityId: true })}
          style={inputStyle}
          disabled={!formData.stateId}
        >
          <option value="">Select City</option>
          {cities.map((city) => (
            <option key={city.cityId} value={city.cityId}>
              {city.name}
            </option>
          ))}
        </select>
        {touched.cityId && errors.cityId && (
          <span style={{ color: "red" }}>{errors.cityId}</span>
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

export default SupplierForm
