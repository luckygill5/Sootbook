import React from "react";
import classNames from 'classnames';
import { Input } from './Input';
import { Select } from './Select';


export function SelectWithInput ({
    label,
    values,
    selectName,
    inputName,
    selectLabel = "",
    inputLabel = "",
    onSelectChange,
    isRequired,
    options,
    placeholder,
    wrapperClass,
    onInputChange,
    touched,
    errors,
    disabled
}) {
    return<div className= {classNames('inputField contactNumber', wrapperClass, { "disabled": disabled })}>
        <label className='label'>{label}</label>
        <div className='flexbox '>
            <Select               
                label={selectLabel}
                name={selectName}
                options={options}
                isRequired={isRequired}
                disabled={disabled}
                wrapperClass={'col4'}
                value={values[selectName]}
                onChange={onSelectChange}
                touched={touched[selectName]}
                error={errors[selectName]}
            />
            <Input
                label={inputLabel}
                type={'text'}
                name={inputName}
                id={inputName}
                wrapperClass={'col8'}
                value={values[inputName]}
                isRequired={isRequired}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onInputChange}
                touched={touched[selectName]}
                error={errors[selectName]}
            />
        </div>
    </div>
}