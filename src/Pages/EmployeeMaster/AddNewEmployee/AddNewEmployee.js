import React, { useState } from 'react';
import locales from "../../../Constants/en.json";
// import { ReactComponent as ArrowLeft } from "../../../assets/images/arrow-left.svg";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {ReactComponent as LeftArrow} from "../../../assets/images/arrow-left.svg";
// import BasicInformation_Employee from './BasicInformation_Employee';
import BasicInformationEdit from '../BasicInformation/BasicInformationInfo/BasicInformationEdit';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import RolePrivilege from '../RolePrivilege/RolePrivilege';
import Documents from '../../../Components/Admin/AdminDashBoardContent/Documents/Documents';
import ContractContent from '../ContractContent/ContractContent';
import "./AddEmployee.scss";
function AddNewEmployee({EmployeeHandle, handleBackHRM}) {
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
        <React.Fragment>
        <div className='addUser_container'>
        <div className='backHrm-link'>
                    <button className='backBtn' type='button' onClick={() => handleBackHRM()}>
                        <span className='icon'>
                            {/* <img src={LeftArrow} alt='left-arrow' className='img_block'></img> */}
                        </span>
                        Back to HRM
                    </button>
        </div>
            
        <div className='form_container'>
                <h3 className='title' style={{"width":"200px"}}>Add New Employee</h3>
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
              
     
        {/* {userAdded && (
            <Dialog
                className='addUser_successModal'
                onClose={handleDialogClose}
                open={userAdded}
            >
                <button className='close_btn' type='submit' onClick={() => handleDialogClose()}>
                    <img src={CloseX} alt='close_icon' className='close_img'></img>
                </button>
                <div className='successiconBlock'>
                    <img src={SuccessIcon} alt='static_icon' className='success_icon'></img>
                </div>
                <DialogTitle className='modal_title'>
                    User has been assigned successfully
                </DialogTitle>
                <p className='message'>The user has been successfully added with the role.</p>
            </Dialog>
        )}

        {errorModal && (
            <ErrorModal
                handleErrorClose={handleModalErrorPopUP}
                ErrorPopUp={errorModal}
                ErrorMsg={errorModalMsg}
            />
        )} */}
    </React.Fragment>
       
    )
}

export default AddNewEmployee;