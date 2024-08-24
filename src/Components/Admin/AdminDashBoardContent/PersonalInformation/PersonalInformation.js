import React, { useState, useEffect } from 'react';
import PersonalInfoBio from './PersonalInfoBio/PersonalInfoBio';
import SocialProfile from './SocailProfile/SocailProfile';
import BankAccount from './BankAccount/BankAccount';
import EmergencyContact from './EmergencyContact/EmergencyContact';
import Pen from '../../../../assets/images/pen.svg';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import locales from '../../../../Constants/en.json';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './PersonalInformation.scss';
import '../../../common/common.component.scss';

function PersonalInformation() {
    const data = useSelector(state => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(0);
    const [selectLabel, setSelectLabel] = useState('Bio');

    const tabsData = ['Bio', 'Social Profile', 'Bank Account', 'Emergency Contract'];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectLabel(event.target.innerText);
        setEditMode(false);
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
                <div className='header_flex'>
                    <h5 className='title'>Personal Information</h5>
                    <button className='edit_btn' onClick={() => handleEdit()}>
                        <span className='icon'>
                            <img src={Pen} alt='edit'></img>
                        </span>
                        {locales.edit_title}
                    </button>
                </div>
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
                            <PersonalInfoBio mode={editMode} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={1} className='tabdataBlock'>
                            <SocialProfile mode={editMode} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={2} className='tabdataBlock'>
                            <BankAccount mode={editMode} />
                        </CustomTabPanel>
                        <CustomTabPanel value={value} index={3} className='tabdataBlock'>
                            <EmergencyContact mode={editMode} />
                        </CustomTabPanel>
                    </Box>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PersonalInformation;
