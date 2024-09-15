import React, { useState } from 'react';
import locales from "../../../Constants/en.json";
// import { ReactComponent as ArrowLeft } from "../../../assets/images/arrow-left.svg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ArrowLeft } from '@mui/icons-material';
// import BasicInformation_Employee from './BasicInformation_Employee';
import BasicInformationEdit from '../BasicInformation/BasicInformationInfo/BasicInformationEdit';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import RolePrivilege from '../RolePrivilege/RolePrivilege';
import Documents from '../../../Components/Admin/AdminDashBoardContent/Documents/Documents';
import ContractContent from '../ContractContent/ContractContent';
function AddNewEmployee() {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
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

    const AddEmployeeTabs = ['Basic Information', "Personal Information", "Contract", "Roles and Privileges", "Documents"]

    return (
        <div className='addNewEmployee_container'>
            <div className='container_section'>
                <h2 className='section_title'>Add New Employee</h2>
                <Box className="tabsContainer" sx={{ width: '100%' }}>
                    <Box className="tabFlexContainer">
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            {
                                AddEmployeeTabs &&
                                AddEmployeeTabs.length > 0 &&
                                AddEmployeeTabs.map((label, index) => {
                                    return (
                                        <Tab label={label} {...a11yProps(index)} />
                                    )
                                })
                            }
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0} className="tabContentContainer">
                        <BasicInformationEdit/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1} className="tabContentContainer">
                        <PersonalInformation initialEditMode={true} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2} className="tabContentContainer">
                        <ContractContent initialEditMode={true}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3} className="tabContentContainer">
                        <RolePrivilege initialEditMode={true} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4} className="tabContentContainer">
                        <Documents initialEditMode={true}/>
                    </CustomTabPanel>
                </Box>
            </div>
        </div>
    )
}

export default AddNewEmployee;