import React from 'react'
import classNames from 'classnames';

export function TextArea({ label, name, wrapperClass, value, placeholder, onChange, isRequired, disabled }) {
    return (
        <div className={classNames('inputField', wrapperClass, { "disabled": disabled })}>
            <label>{label}
                {
                    isRequired && <span style={{color:"#EF4444"}}>*</span>
                }
            </label>
            <textarea value={value} name={name} placeholder={placeholder || "Please type"} disabled={disabled} onChange={onChange} className="input_element inputTextArea" />
        </div>
    );
};