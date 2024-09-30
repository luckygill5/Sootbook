import React from "react";
import classNames from 'classnames';
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export function Select({
    label,
    value,
    name,
    onChange,
    isRequired,
    options,
    wrapperClass,
    touched,
    error,
    disabled
}) {
    const selectOptions = options && options.map((item, i) => {
        if (typeof item === 'string')
            return (<MenuItem name={item + "" + i} value={item}>{item}</MenuItem>);
        return (
            <MenuItem name={item.id + "" + i} value={item.id}>
                {item.value}
            </MenuItem>
        );
    }) || [];
    return (
        <div className={classNames('inputField', wrapperClass, { "disabled": disabled })}>
            <label>
                {label}
                {isRequired && <em style={{
                    color: 'rgb(239, 68, 68)'
                }}>*</em>}
            </label>
            <MuiSelect
                className="select_fieldBox"
                labelId="simple-select-label"
                id="simple-select"
                value={value}
                label={label}
                isRequired={true}
                disabled={disabled}
                name={name}
                onChange={(props) => { onChange(props) }}
            >
                {selectOptions}
            </MuiSelect>
            {touched && error ? <p className="form-error">{error}</p> : null}
        </div>
    );
}
