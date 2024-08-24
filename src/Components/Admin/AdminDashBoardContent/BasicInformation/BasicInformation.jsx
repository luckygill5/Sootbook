import React, { useState } from "react";
import Avtar from "../../../../assets/images/avatar-large.png";
import Pen from "../../../../assets/images/pen.svg";
import locales from "../../../../Constants/en.json";
import { DataList } from "../../../common";
import BasicInformationInfo from "./BasicInformationInfo/BasicInformationEdit";
import '../../../common/common.component.scss'

const basicInfoConfig = [
  {
    label: "Profile pictiure",
    value: Avtar,
    valueClass: "avatar_iconblock",
    type: "image",
    alt: "avtar",
  },
  { label: "First Name", value: "Alex" },
  { label: "Last Name", value: "Black" },
  { label: "Contact Number", value: "+1 (000) 000-0000" },
  { label: "Gender", value: "Male" },
  { label: "User ID", value: "306776" },
  { label: "Date of Birth", value: "Date of Birth" },
  { label: "Marital Status", value: "Single" },
  { label: "State / Province", value: "State / Province" },
  { label: "City", value: "City" },
  { label: "Zip Code / Postal Code", value: "Zip Code / Postal Code" },
  { label: "Religion", value: "Religion" },
  { label: "Blood Group", value: "Blood Group" },
  { label: "Nationality", value: "Nationality" },
  { label: "Citizenship", value: "Citizenship" },
  { label: "Address Line 1", value: "Address Line 1" },
  { label: "Address Line 2", value: "Address Line 2" },
];

function BasicInformation() {
  const [readMode, setReadMode] = useState(true);

  return (
    <div className="basicInformation_container">
      <div className="basicInformation_info_container">
        {readMode && (
          <div className="haeder_section">
            <>
              <h5 className="title">Basic Information</h5>
              <button className="edit_btn" onClick={() => setReadMode(false)}>
                <span className="icon">
                  <img src={Pen} alt="edit"></img>
                </span>
                {locales.edit_title}
              </button>
            </>
          </div>
        )}

        <div className="body_section">
          {readMode ? (
            <div className="read_mode">
              <div className="profile_listing_data">
                <DataList config={basicInfoConfig} />
              </div>
            </div>
          ) : (
            <BasicInformationInfo setReadMode={setReadMode} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
