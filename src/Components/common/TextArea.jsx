import React from 'react'

export function TextArea({ label, name, wrapperClass, value, placeholder, onChange, isRequired }) {
    return (
        <div className={`inputField ${wrapperClass}`}>
            <label>{label}
                {
                    isRequired && <span style={{color:"#EF4444"}}>*</span>
                }
            </label>
            <textarea value={value} name={name} placeholder={placeholder || "Please type"} onChange={onChange} className="input_element inputTextArea" />
        </div>
    );
};