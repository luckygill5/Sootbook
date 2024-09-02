import React from "react";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


export const DataList = ({ containerClass = '', config, dataSource }) => {

  const getFieldType = (value, type, alt, name) => {
    if (type === "image") {
      return <img className="list_item_img" src={dataSource && dataSource[name] || value} alt={alt} />
    }
    if(type === "date"){
      return new Date(dataSource && dataSource[name] || value).toLocaleDateString();
    }
    return dataSource && dataSource[name] && (typeof dataSource[name] === "object" ? dataSource[name].name : dataSource[name]) || value;
  }

  return (
    <ul className={`data_listing ${containerClass}`}>
      {config.map(({ label, value, valueClass = "", labelClass = "", type, alt, CheckList, ChecklistClass, CheckListData, name }) => {
        return (
          <li className="list_item">
            <span className="label">
              <div className={labelClass}>{label}</div>
            </span>
            <span className="value">
              <div className={valueClass}>{getFieldType(value, type, alt, name)}
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
