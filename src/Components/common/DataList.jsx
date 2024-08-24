import React from "react";

export const DataList = ({ containerClass = '', config }) => {

  const getFieldType = (value, type, alt) => {
    if (type === "image") {
      return <img className="list_item_img" src={value} alt={alt} />
    }
    return value
  }

  return (
    <ul className={`data_listing ${containerClass}`}>
      {config.map(({ label, value, valueClass = "", labelClass = "", type, alt }) => {
        return (
          <li className="list_item">
            <span className="label">
              <div className={labelClass}>{label}</div>
            </span>
            <span className="value">
              <div className={valueClass}>{getFieldType(value, type, alt)}</div>
            </span>
          </li>
        );
      })}
    </ul>
  );
};
