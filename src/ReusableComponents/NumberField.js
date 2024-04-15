import React from "react";

export const NumberField = ({ label, value, onChange, placeholder}) => {
    return (
      <div>
        <label>{label}</label>
        <input
          type="number"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    )
}