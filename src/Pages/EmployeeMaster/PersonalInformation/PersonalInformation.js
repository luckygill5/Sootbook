import React, { useState, useEffect } from 'react';
import PersonalInfoBio from './PersonalInfoBio/PersonalInfoBio';
import SocialProfile from '../PersonalInformation/SocailProfile/SocailProfile';
import BankAccount from "../PersonalInformation/BankAccount/BankAccount";
import EmergencyContact from "../PersonalInformation/EmergencyContact/EmergencyContact";
import { axiosClient } from '../../../services/axiosClient';
import Pen from '../../../assets/images/pen.svg';
import locales from '../../../Constants/en.json';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './PersonalInformation.scss';
import '../../../Components/common/common.component.scss';

function PersonalInformation( {initialEditMode = true }) {
    const [editMode, setEditMode] = useState(true);
    const [value, setValue] = useState(0);
    const [selectLabel, setSelectLabel] = useState('Bio');
    const [bioInfo, setBioInfo] = useState({});
    const [bankInfo, setBankInfo] = useState({});
    const [emergencyInfo, setEmergencyInfo] = useState({});
    const [socialinfo, setSocialinfo] = useState({});
    const userid = JSON.parse(localStorage.getItem('profileData'))?.userId 
    // const profileData = localStorage.getItem('profileData');  
    // const userid = profileData ? JSON.parse(profileData)?.userId : null;


    const getBioInfo = async () => {
        let response = await axiosClient.post(
            `admin/vendor/bioInfo`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setBioInfo(response.data?.data || {});
        }
    };
    const getBankInfo = async () => {
        let response = await axiosClient.post(
            `admin/vendor/bankInfo`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setBankInfo(response.data?.data?.bank || {});
        }
    };
    const getEmergencyInfo = async () => {
        let response = await axiosClient.post(
            `admin/vendor/emergencyInfo`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setEmergencyInfo(response.data?.data?.emergency || {});
        }
    };
    const getSocialinfo = async () => {
        let response = await axiosClient.post(
            `admin/vendor/socialinfo`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setSocialinfo(response.data?.data?.social || {});
        }
    };

    // useEffect(() => {
    //     getBankInfo();
    //     getBioInfo();
    //     getEmergencyInfo();
    //     getSocialinfo();
    // }, []);

    const tabsData = ['Bio', 'Social Profile', 'Bank Account', 'Emergency Contact'];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectLabel(event.target.innerText);
        setEditMode(true);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleEdit = () => {
        setEditMode(true);
    };
    return (
        <React.Fragment>
            <div className='personalInformation_container'>              
                <div className='body_section'>
                    <Box sx={{ width: '100%' }} className='tabsBlock'>
                        <Box>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label='basic tabs example'
                            >
                                {tabsData &&
                                    tabsData.length > 0 &&
                                    tabsData.map((item, index) => {
                                        return (
                                            <Tab
                                                key={index}
                                                label={`${item}`}
                                                {...a11yProps(item)}
                                            />
                                        );
                                    })}
                            </Tabs>
                        </Box>
                        <CustomTabPanel value={value} index={0} className='tabdataBlock'>
                            <PersonalInfoBio
                                mode={editMode}
                                setEditMode={setEditMode}
                                bioInfo={bioInfo}
                                getBioInfo={getBioInfo}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1} className='tabdataBlock'>
                            <SocialProfile
                                mode={editMode}
                                setEditMode={setEditMode}
                                socialinfo={socialinfo}
                                getSocialinfo={getSocialinfo}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2} className='tabdataBlock'>
                            <BankAccount
                                mode={editMode}
                                setEditMode={setEditMode}
                                bankInfo={bankInfo}
                                getBankInfo={getBankInfo}
                            />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3} className='tabdataBlock'>
                            <EmergencyContact
                                mode={editMode}
                                setEditMode={setEditMode}
                                emergencyInfo={emergencyInfo}
                                getEmergencyInfo={getEmergencyInfo}
                            />
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PersonalInformation;
