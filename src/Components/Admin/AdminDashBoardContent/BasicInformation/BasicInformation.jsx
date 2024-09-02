import React, { useState, useEffect } from "react";
import { axiosClient } from "../../../../services/axiosClient";
import { DataList } from "../../../common";
import BasicInformationInfo from "./BasicInformationInfo/BasicInformationEdit";
import Avtar from "../../../../assets/images/avatar-large.png";
import Pen from "../../../../assets/images/pen.svg";
import locales from "../../../../Constants/en.json";
import '../../../common/common.component.scss'


const basicInfoConfig = [
  {
    label: "Profile pictiure",
    value: Avtar,
    valueClass: "avatar_iconblock",
    name: "avatar",
    type: "image",
    alt: "avtar",
  },
  { label: "First Name", value: "Alex", name: "first_name" },
  { label: "Last Name", value: "Black", name: "last_name" },
  { label: "Contact Number", value: "+1 (000) 000-0000", name: "phone" },
  { label: "Gender", value: "Male", name: "gender" },
  { label: "User ID", value: "306776", name: "empId" },
  { label: "Date of Birth", value: "Date of Birth", name: "dob" },
  { label: "Marital Status", value: "Single", name: "martial_status" },
  { label: "State / Province", value: "State / Province", name: "state" },
  { label: "City", value: "City", name: "city" },
  { label: "Zip Code / Postal Code", value: "Zip Code / Postal Code", name: "postal" },
  { label: "Religion", value: "Religion", name: "religion" },
  { label: "Blood Group", value: "Blood Group", name: "blood_group" },
  { label: "Nationality", value: "Nationality", name: "nationality" },
  { label: "Citizenship", value: "Citizenship", name: "citizenship" },
  { label: "Address Line 1", value: "Address Line 1", name: "address_1" },
  { label: "Address Line 2", value: "Address Line 2", name: "address_2" },
];

function BasicInformation() {
  const userid = JSON.parse(localStorage.getItem('profileData')).userId
  const [readMode, setReadMode] = useState(true);

  const [basicInformation, setBasicInformation] = useState({});

  const getBasicInfo = async () => {
    let response = await axiosClient.post(`admin/vendor/basicInfo`, JSON.stringify({ "userId": userid }));
    if (response.status === 200) {
      setBasicInformation(response.data?.data?.employee || {});
    }
  }

  useEffect(() => {
    getBasicInfo()
  }, []);

  return (
    <div className="basicInformation_container">
      <div className="basicInformation_info_container">
        <div className="haeder_section">
          <>
            <h5 className="title">Basic Information</h5>
            {readMode && <button className="edit_btn" onClick={() => setReadMode(false)}>
              <span className="icon">
                <img src={Pen} alt="edit"></img>
              </span>
              {locales.edit_title}
            </button>}
          </>
        </div>

        <div className="body_section">
          {readMode ? (
            <div className="read_mode">
              <div className="profile_listing_data">
                <DataList config={basicInfoConfig} dataSource={basicInformation} />
              </div>
            </div>
          ) : (
            <BasicInformationInfo setReadMode={setReadMode} basicInformation={basicInformation} getBasicInfo={getBasicInfo} />
          )}
        </div>
      </div>
    </div>
  );
}

export default BasicInformation;
