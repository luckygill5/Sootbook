import React from 'react'

function EyeIcon({ showEye, onClick }) {
  return (
    showEye ? <i className="fa fa-eye" aria-hidden="true" onClick={onClick}></i> :
      <i className="fa fa-eye-slash" aria-hidden="true" onClick={onClick}></i>
  );
};


export const Input = ({ label, type, name, placeholder, value, onChange, onBlur, error,
  touched, className, wrapperClass, hasEye, onEyeClick, showEye, isRequired, disabled }) => {
  return (
    <div className={`inputField ${wrapperClass}`}>
      <label>
        {label}
        {isRequired && <span style={{ color: "#EF4444" }}>*</span>}
      </label>
      <div className={className}>
        <input type={type}
          placeholder={placeholder || "Please type"}
          autoComplete="off"
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className="input_element"
        />
        {hasEye && <EyeIcon onClick={onEyeClick} showEye={showEye} />}
        {touched && error ? (
          <p className="form-error">{error}</p>
        ) : null}
      </div>

    </div>
  )
};


