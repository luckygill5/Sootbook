
import React, { useState } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import './common.component.scss'

export default function BasicDatePicker(props) {

    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className={`inputField ${props.wrapperClass}`}>
            <label>{props.label} 
                {props.isRequired &&
                <span style={{
                color:"#EF4444"
            }}>*</span>}</label>
            <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy" />
        </div>
    );
}