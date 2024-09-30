
import React, { useState } from 'react';
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './common.component.scss'

export function DatePicker({ label, name, value, dateFormat, wrapperClass, isRequired, onChange }) {

    const [startDate, setStartDate] = useState(value ? new Date(value) : new Date());
    return (
        <div className={`inputField ${wrapperClass}`}>
            <label>{label}
                {isRequired && <span style={{ color: "#EF4444" }}>*</span>}</label>
            <ReactDatePicker
                selected={new Date(startDate)}
                onChange={(date) => { setStartDate(new Date(date)); onChange && onChange({name, value: new Date(date).toLocaleDateString()}) }}
                dateFormat={dateFormat} />
        </div>
    );
}