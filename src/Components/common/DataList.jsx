import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export const DataList = ({ containerClass = '', config, }) => {

  const getFieldType = (value, type, alt) => {
    if (type === "image") {
      return <img className="list_item_img" src={value} alt={alt} />
    }
    return value
  }

  return (
    <ul className={`data_listing ${containerClass}`}>
      {config.map(({ label, value, valueClass = "", labelClass = "", type, alt, CheckList, ChecklistClass, CheckListData }) => {
        return (
          <li className="list_item">
            <span className="label">
              <div className={labelClass}>{label}</div>
            </span>
            <span className="value">
              <div className={valueClass}>{getFieldType(value, type, alt)}
                {
                  CheckList && <ul className={ChecklistClass}>
                    {CheckListData &&
                      CheckListData.length > 0 &&
                      CheckListData.map(({ label }) => {
                        return (
                          <li className='check_item'>
                            <FormControlLabel control={<Checkbox />} label={label} />
                          </li>
                        )
                      })}
                  </ul>
                }
              </div>
            </span>
          </li>
        );
      })}
    </ul>
  );
};
