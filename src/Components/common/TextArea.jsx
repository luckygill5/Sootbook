import React from 'react'

export function TextArea({ label, name, wrapperClass, value, placeholder, onChange }) {
    return (
        <div className={`inputField ${wrapperClass}`}>
            <label>{label}</label>
            <textarea value={value} name={name} placeholder={placeholder || "Please type"} onChange={onChange} className="input_element inputTextArea" />
        </div>
    );
};