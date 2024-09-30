import React from 'react';
import classNames from 'classnames';


function EyeIcon({ showEye, onClick }) {
  return (
    showEye ? <i className="fa fa-eye" aria-hidden="true" onClick={onClick}></i> :
      <i className="fa fa-eye-slash" aria-hidden="true" onClick={onClick}></i>
  );
};

export const Input = ({ label, type, name, placeholder, value, onChange, onBlur, error,
  touched, className, wrapperClass, hasEye, onEyeClick, showEye, isRequired, disabled = false, icon, maxLength, ReadOnly }) => {
  return (
    <div className={classNames('inputField', wrapperClass, { "disabled": disabled })}>
      <label>
        {label}
        {isRequired && <span style={{ color: "#EF4444" }}>*</span>}
      </label>
      <div className={className}>
        {icon && <div className='icon_holder'>
          <img src={icon} alt='icon' className='icon_img'></img>
        </div>}
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
          maxLength={maxLength}
          readOnly={ReadOnly}
        />
        {hasEye && <EyeIcon onClick={onEyeClick} showEye={showEye} />}
        {touched && error ? (
          <p className="form-error">{error}</p>
        ) : null}
      </div>

    </div>
  )
};


