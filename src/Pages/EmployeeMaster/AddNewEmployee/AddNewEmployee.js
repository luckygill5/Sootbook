import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { isEmpty } from 'lodash';
import LeftArrow from '../../../assets/images/arrow-left.svg';
import PersonalInformation from '../PersonalInformation/PersonalInformation';
import RolePrivilege from '../RolePrivilege/RolePrivilege';
import Documents from '../../../Components/Admin/AdminDashBoardContent/Documents/Documents';
import ContractContent from '../ContractContent/ContractContent';
import "./AddEmployee.scss";
import { axiosClient } from '../../../services/axiosClient';
import { useSelector } from 'react-redux';
import { UserSave } from '../../../services/userSave.service';
import { UserListSearch } from '../../../services/UserEmployeeSearch.service';
import BasicInformation from '../BasicInformation/BasicInformation';
import ErrorModal from '../../../Components/CommonErrorModal/ErrorModal';
import locales from '../../../Constants/en.json';
import SuccessIcon from '../../../assets/images/Static Icon.svg';
import CloseX from '../../../assets/images/x-cross.svg';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';


function AddNewEmployee({ handleBackHRM,  editUserData}) {
    const [value, setValue] = useState(0);
    const [userid,SetUserId] = useState("");
    const [readMode, setReadMode] = useState(false);

  const [basicInformation, setBasicInformation] = useState({});
//   const userid = JSON.parse(localStorage.getItem('profileData'))?.userId;
  const [roleList, setRoleList] = useState('');
    const [formDisabled, setFormDisabled] = useState(true);
    const [userAdded, setUserAdded] = useState(false);
    const [errorModal, SetErrorModal] = useState(false);
    const [errorModalMsg, SetErrorModalMsg] = useState("");
    const state = useSelector(state => state);
    const [search, setSearch] = useState([]);
    const [suggestionList, setSuggestionList] = useState([]);

    useEffect(() => {
        let rolelistData = [];
        const { userSaveList: { data: { rolePermissionList } = {} } = {} } = state;
        if (rolePermissionList?.length) {
            rolePermissionList.map(item => {
                rolelistData.push({ id: item._id, value: item.name });
            });
        }
        setRoleList(rolelistData);
    }, []);

    

    const handleSearchEmployee = ({ target: { value } }) => {
        setSearch(value);
        if (value !== '' && value.length >= 3) {
            setTimeout(() => {
                UserListSearch(value).then(response => {
                    if (response && response.status == true) {
                        setSuggestionList(response?.data?.employees);
                    }
                });
            }, 1000);
        } else if (value == '' && value.length < 3) {
            setSuggestionList([]);
        }
    };

  const getBasicInfo = async () => {
    const accessToken = `Bearer ${sessionStorage.accessToken} `
    try {
        let response = await axiosClient.post(
            `admin/vendor/basicInfo/store`, {
            headers: {
                'Content-Type': 'application/json',
                'x-via-device': true,
                'Authorization': accessToken
            },
        }

        );
        if (response.status == 200) {
            console.log(response);
            
            setBasicInformation(response.data?.data?.employee || {});
        }

    } catch (error) {
        console.log("error", error)
    }
    
  }

  useEffect(() => {
    getBasicInfo()
  }, []);


    const handleChange = (event, newValue) => {
        console.log(newValue);
        
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
    useEffect((values) => {
        if (editUserData && !isEmpty(editUserData)) {
            for (let key in values) {
                values[key] = editUserData[key];
                if (key === 'name') {
                    values[key] = editUserData['first_name'] + editUserData['last_name'];
                }
                if (key === 'userId') {
                    values[key] = editUserData['_id'];
                }
            }
            setFormDisabled(false);
        }
    }, [editUserData])
    const AddEmployeeTabs = ['Basic Information', "Personal Information", "Contract", "Roles and Privileges", "Documents"]
    const handleDialogClose = () => {
    };

    return (
    <React.Fragment>
        <div className='addUser_container'>
            <div className='backHrm-link'>
                    <button className='backBtn' type='button' onClick={() => handleBackHRM()}>
                        <span className='icon'>
                            <img src={LeftArrow} alt='left-arrow' className='img_block'></img>
                        </span>
                        Back to HRM
                    </button>
       
            
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
                                <BasicInformation SetUserId={SetUserId} handleBackHRM={handleBackHRM} onTabChange={handleChange} parentScreen ={"employee"} setReadMode={setReadMode} basicInformation={basicInformation} getBasicInfo={getBasicInfo}/>
                            </CustomTabPanel>
                            
                            <CustomTabPanel value={value} index={1} className="tabContentContainer">
                                <PersonalInformation userid={userid} initialEditMode={true}  />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={2} className="tabContentContainer">
                                <ContractContent userid={userid} initialEditMode={true} handleBackHRM={handleBackHRM}/>
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={3} className="tabContentContainer">
                                <RolePrivilege userid={userid} initialEditMode={true} />
                            </CustomTabPanel>
                            <CustomTabPanel value={value} index={4} className="tabContentContainer">
                                <Documents userid={userid} initialEditMode={true}/>
                            </CustomTabPanel>
                        </Box>
                </div>
            </div>
            {userAdded && (
                <Dialog
                    className='addUser_successModal'
                    onClose={()=>{setUserAdded(false);handleBackHRM();console.log('CLICKED1');}}
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
                    handleErrorClose={()=>{SetErrorModal(false);handleBackHRM();}}
                    ErrorPopUp={errorModal}
                    ErrorMsg={errorModalMsg}
                />
            )}
        
        </div>
              
     
        
    </React.Fragment>
       
    )
}

export default AddNewEmployee;