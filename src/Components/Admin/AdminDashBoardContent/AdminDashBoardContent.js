import React, { useState } from 'react';
import EmployeeMaster from '../../../Pages/EmployeeMaster/EmployeeMaster.js';
import SearchIcon from "../../../assets/images/search_icon.svg";
import BellIcon from "../../../assets/images/bell_icon.svg";
import AvtaarIcon from "../../../assets/images/avatar-large.png";
import File from "../../../assets/images/file_icon.svg";
import Create from "../../../assets/images/create_icon.svg";
import Reload from "../../../assets/images/reload.svg";
import Location from "../../../assets/images/map-pin.svg";
import Phone from "../../../assets/images/dial.svg";
import { ReactComponent as Contract } from "../../../assets/images/contract.svg";
import { ReactComponent as BInfo } from "../../../assets/images/basic_info.svg";
import { ReactComponent as PInfo } from "../../../assets/images/user_new.svg";
import { ReactComponent as Document } from "../../../assets/images/documents.svg";
import { ReactComponent as CPass } from "../../../assets/images/c_password.svg";
import { ReactComponent as UserCogNew } from "../../../assets/images/user-cogNew.svg";
import Sort from "../../../assets/images/sort.svg";
import ArrowRight from "../../../assets/images/chevron-right.svg";
import { ReactComponent as ArrowRightIcon } from "../../../assets/images/chevron-right.svg";
import { ReactComponent as DotsIcon } from "../../../assets/images/bullets.svg";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BasicInformation from './BasicInformation/BasicInformation.jsx';
import PersonalInformation from './PersonalInformation/PersonalInformation';
import ContractContent from './ContractContent/ContractContent';
import Documents from './Documents/Documents';
import ChangePassword from './ChangePassword/ChangePassword';
import RolePrivilege from './RolePrivilege/RolePrivilege';
import User from '../../../Pages/AdminSideNav_Menu/User/User';
import ProductMaster from '../../../Pages/ProductMaster/ProductMaster.js';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Collection from './DashboardCollections/DashboardCollections.js';
import './AdminDashBoardContent.scss'
import AddNewEmployee from '../../../Pages/EmployeeMaster/AddNewEmployee/AddNewEmployee.js';
import Employee from '../../../Pages/AdminSideNav_Menu/Employee/Employee.js';

// interface TabPanelProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
//   }

function AdminDashBoardContent(props) {
    const data = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [value, setValue] = useState(0);
    const [selectedMenu, setSelectedMenu] = useState('')
    const [pagevalue, setPageValue] = useState('5 Page')

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props

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
        )
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }

    const handleOptionMenu = event => {
        setSelectedMenu(event)
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    const optionMenuData = [
        {
            label: 'Contract',
            icon: <Contract />,
        },
        {
            label: 'Basic Information',
            icon: <BInfo />,
        },
        {
            label: 'Personal Information',
            icon: <PInfo />,
        },
        {
            label: 'Role and Privileges',
            icon: <UserCogNew />,
        },
        {
            label: 'Documents',
            icon: <Document />,
        },
        // {
        //     label: 'Timesheet Agenda',
        //     icon: <TAgenda />,
        // },
        {
            label: 'Change Password',
            icon: <CPass />,
        },
    ]

    const tabsHorizonData = [
        {
            label: 'Contract',
        },
        {
            label: 'Allowances',
        },
        {
            label: 'Comissions',
        },
        {
            label: 'Statutory deductions',
        },
        {
            label: 'Reimbursements',
        },
    ]

    const tabHead = [
        {
            label: 'Title',
        },
        {
            label: 'Amount',
        },
        {
            label: 'Allowance Option',
        },
        {
            label: 'Amount Option',
        },
    ]



    return (
        <React.Fragment>
            <div className={`dashboard_dataWrapper ${props.viewManage && 'expand_view'}`}>
                <div className='header_block'>
                    <div className='searchBlock'>
                        <input type='text' className='input_field'></input>
                        <button className='searchBtn'>
                            <img src={SearchIcon} alt='search_icon'></img>
                        </button>
                    </div>
                    <div className='company_name'>
                        {data?.vendor?.company_name || JSON.parse(sessionStorage.getItem("loginData"))?.vendor?.company_name}
                    </div>
                    <div className='notify_profile_block'>
                        <div className='flex_box'>
                            <span className='notify'>
                                <img src={BellIcon} alt='notify_icon'></img>
                            </span>
                            <span className='profile_icon'>
                                <img src={AvtaarIcon} alt='profile_icon'></img>
                            </span>
                        </div>
                    </div>
                </div>
                <div role='presentation' className='breadcrumb_block'>
                    <Breadcrumbs aria-label='breadcrumb'>
                        <Link underline='hover' color='inherit' href='/'>
                            home
                        </Link>
                        {
                            props.breadcrumbUpdateData &&
                            props.breadcrumbUpdateData.length > 0 ? props.breadcrumbUpdateData.map((data, index) => {
                                return   <Typography key={index} color='text.primary'>{data}</Typography>
                            }) : <Typography color='text.primary'>Applications</Typography>
                        }
                        
                    </Breadcrumbs>
                </div>
                { props.viewcontrol == "Products" ? (
                    <ProductMaster updateBreadCrumb={props.updateBreadCrumb} breadcrumbUpdateData={props.breadcrumbUpdateData}/>
                ):
                 props.viewcontrol == "Employee" ? (
                    <Employee/>
                ) :
                    props.viewcontrol == "Dashboard" ? (
                        <Collection />
                    ) :
                        props.viewcontrol == "User" ? (
                            <User />
                        ) :
                            (
                                <div className='middle_content'>
                                    <div
                                        className={`flexBox_container ${selectedMenu.split(' ').join('_').toLocaleLowerCase()}`}
                                    >
                                        <div className='left_profileBlock'>
                                            <div className='upper_profileData'>
                                                <div className='info_status_flex'>
                                                    <span className='status_info active'>
                                                        <span className='indicator'></span>Active
                                                    </span>
                                                    <div className='more_infoBtnBlock'>
                                                        <button className='more_infoBtn'>
                                                            <DotsIcon />
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='profileimg_data'>
                                                    <div className='profile_imgBlock'>
                                                        <img src={AvtaarIcon} alt='profile_img'></img>
                                                    </div>
                                                    <span className='profile_name'>Alex Black</span>
                                                    <span className='invite_data'>Invited on May 29 2024</span>
                                                    <div className='cta_flexbox'>
                                                        <button className='send_mailBtn'>Send email</button>
                                                        <button className='downloadBtn'>Download</button>
                                                    </div>
                                                </div>
                                                <div className='profileData_list'>
                                                    <ul>
                                                        <li>
                                                            <span className='label'>
                                                                <span className='icon'>
                                                                    <img src={File} alt='ID_icon'></img>
                                                                </span>
                                                                ID
                                                            </span>
                                                            <span className='data'>Armenia</span>
                                                        </li>
                                                        <li>
                                                            <span className='label'>
                                                                <span className='icon'>
                                                                    <img src={Create} alt='create_icon'></img>
                                                                </span>
                                                                Created by
                                                            </span>
                                                            <span className='data'>Anna Brown</span>
                                                        </li>
                                                        <li>
                                                            <span className='label'>
                                                                <span className='icon'>
                                                                    <img src={Reload} alt='update_icon'></img>
                                                                </span>
                                                                Last Updated day
                                                            </span>
                                                            <span className='data'>12.07.2024</span>
                                                        </li>
                                                        <li>
                                                            <span className='label'>
                                                                <span className='icon'>
                                                                    <img src={Location} alt='location_icon'></img>
                                                                </span>
                                                                Location
                                                            </span>
                                                            <span className='data'>USA</span>
                                                        </li>
                                                        <li>
                                                            <span className='label'>
                                                                <span className='icon'>
                                                                    <img src={Phone} alt='call_icon'></img>
                                                                </span>
                                                                Phone
                                                            </span>
                                                            <span className='data'>+4369010013603</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className='bottom_options'>
                                                <ul>
                                                    {optionMenuData &&
                                                        optionMenuData.length > 0 &&
                                                        optionMenuData.map((item, index) => {
                                                            return (
                                                                <li key={index}>
                                                                    <button
                                                                        className={`option_item ${item.label == selectedMenu ? 'active' : ''}`}
                                                                        onClick={() => handleOptionMenu(item.label)}
                                                                    >
                                                                        <span className='label'>
                                                                            <span className='icon'>
                                                                                {item.icon}
                                                                                {/* <img src={item.icon} alt={`${item.label}_icon`}></img> */}
                                                                            </span>
                                                                            {item.label}
                                                                        </span>
                                                                        <span className='arrow_icon'>
                                                                            <ArrowRightIcon />
                                                                            {/* <img src={ArrowRight} alt="right_arrow"></img> */}
                                                                        </span>
                                                                    </button>
                                                                </li>
                                                            )
                                                        })}
                                                </ul>
                                            </div>
                                        </div>
                                        <div className='right_tabData_block'>
                                            {selectedMenu == 'Basic Information' ? (
                                                <BasicInformation />
                                            ) : selectedMenu == 'Personal Information' ? (
                                                <PersonalInformation />
                                            ) : selectedMenu == "Contract" ? (
                                                <ContractContent />
                                            ) : selectedMenu == "Documents" ? (
                                                <Documents />
                                            ) : selectedMenu == "Change Password" ? (
                                                <ChangePassword />
                                            ) : selectedMenu == 'Role and Privileges' ? (
                                                <RolePrivilege/>
                                            ):
                                                <div className='tabs_data_container'>
                                                    <Box sx={{ width: '100%' }}>
                                                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                            <Tabs
                                                                value={value}
                                                                onChange={handleChange}
                                                                aria-label='basic tabs example'
                                                            >
                                                                {tabsHorizonData &&
                                                                    tabsHorizonData.length > 0 &&
                                                                    tabsHorizonData.map((item, index) => {
                                                                        return (
                                                                            <Tab
                                                                                label={`${item.label}`}
                                                                                key={index}
                                                                                {...a11yProps(index)}
                                                                            />
                                                                        )
                                                                    })}
                                                            </Tabs>
                                                        </Box>
                                                        {value == 0 ? (
                                                            <CustomTabPanel
                                                                className='tabsData_block'
                                                                value={value}
                                                                index={0}
                                                            >
                                                                <div className='search-box'>
                                                                    <input
                                                                        type='text'
                                                                        className='search-input'
                                                                        placeholder='Search'
                                                                    ></input>
                                                                </div>
                                                                <div className='tabular_data'>
                                                                    <div className='tableform'>
                                                                        <div className='tableHead'>
                                                                            {tabHead &&
                                                                                tabHead.length > 0 &&
                                                                                tabHead.map((item, index) => {
                                                                                    return (
                                                                                        <div
                                                                                            className='theadItem'
                                                                                            key={index}
                                                                                        >
                                                                                            <span className='text'>
                                                                                                {item.label}
                                                                                            </span>
                                                                                            <span className='sort'>
                                                                                                <span className='arrow_up'>
                                                                                                    <ArrowRightIcon />
                                                                                                </span>
                                                                                                <span className='arrow_down'>
                                                                                                    <ArrowRightIcon />
                                                                                                </span>
                                                                                            </span>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                        </div>
                                                                        <div className='tableBody'>
                                                                            <div className='tbodyRow'>
                                                                                <div className='no-records'>
                                                                                    <span className='text'>
                                                                                        No records available
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='table-pagination'>
                                                                        <div className='count_select'>
                                                                            <ul className='page_count'>
                                                                                <li>
                                                                                    <button className='prev_btn'>
                                                                                        <img
                                                                                            src={ArrowRight}
                                                                                            alt='prev-icon'
                                                                                        ></img>
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button className='option active'>
                                                                                        1
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button className='option'>
                                                                                        2
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button className='option'>
                                                                                        3
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <span className='dot_more'>
                                                                                        ...
                                                                                    </span>
                                                                                </li>
                                                                                <li>
                                                                                    <button className='option'>
                                                                                        10
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button className='next_btn'>
                                                                                        <img
                                                                                            src={ArrowRight}
                                                                                            alt='next-icon'
                                                                                        ></img>
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                            <div className='jump_page'>
                                                                                <Select
                                                                                    labelId='demo-simple-select-label'
                                                                                    id='demo-simple-select'
                                                                                    value={pagevalue}
                                                                                    label='Age'
                                                                                // onChange={handleChange}
                                                                                >
                                                                                    <MenuItem value={'5 Page'}>
                                                                                        5 Page
                                                                                    </MenuItem>
                                                                                    <MenuItem value={'10 Page'}>
                                                                                        10 Page
                                                                                    </MenuItem>
                                                                                    <MenuItem value={'15 Page'}>
                                                                                        15 Page
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='goto_page'>
                                                                            <span className='goto'>Go to</span>
                                                                            <input
                                                                                type='text'
                                                                                className='page_input'
                                                                            ></input>
                                                                            <span className='page'>page</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='data_formContainer'>
                                                                    <form>
                                                                        <div className='input_flexbox'>
                                                                            <div className='inputField'>
                                                                                <label>Allowance Option</label>
                                                                                <Select
                                                                                    labelId='demo-simple-select-label'
                                                                                    id='id_select_input_1'
                                                                                    className='select_input'
                                                                                    // value={age}
                                                                                    label='Age'
                                                                                // onChange={handleChange}
                                                                                >
                                                                                    <MenuItem value={`Non Taxable`}>
                                                                                        Non Taxable
                                                                                    </MenuItem>
                                                                                    <MenuItem value={20}>
                                                                                        Twenty
                                                                                    </MenuItem>
                                                                                    <MenuItem value={30}>
                                                                                        Thirty
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </div>
                                                                            <div className='inputField'>
                                                                                <label>Amount Option</label>
                                                                                <Select
                                                                                    labelId='demo-simple-select-label'
                                                                                    id='id_select_input_2'
                                                                                    className='select_input'
                                                                                    // value={age}
                                                                                    label='Age'
                                                                                // onChange={handleChange}
                                                                                >
                                                                                    <MenuItem value={`Fixed`}>
                                                                                        Fixed
                                                                                    </MenuItem>
                                                                                    <MenuItem value={20}>
                                                                                        Twenty
                                                                                    </MenuItem>
                                                                                    <MenuItem value={30}>
                                                                                        Thirty
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='input_flexbox'>
                                                                            <div className='inputField'>
                                                                                <label>Title</label>
                                                                                <input
                                                                                    type='text'
                                                                                    className='title_input'
                                                                                ></input>
                                                                            </div>

                                                                            <div className='inputField'>
                                                                                <label>Amount</label>
                                                                                <Select
                                                                                    labelId='demo-simple-select-label'
                                                                                    id='id_select_input_1'
                                                                                    className='select_input'
                                                                                    // value={age}
                                                                                    label='Age'
                                                                                // onChange={handleChange}
                                                                                >
                                                                                    <MenuItem
                                                                                        value={`$ Amount USD`}
                                                                                    >
                                                                                        $ Amount USD
                                                                                    </MenuItem>
                                                                                    <MenuItem value={20}>
                                                                                        Twenty
                                                                                    </MenuItem>
                                                                                    <MenuItem value={30}>
                                                                                        Thirty
                                                                                    </MenuItem>
                                                                                </Select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='form_actions'>
                                                                            <button className='reset_btn'>
                                                                                Reset
                                                                            </button>
                                                                            <button className='save_btn'>
                                                                                Save
                                                                            </button>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </CustomTabPanel>
                                                        ) : (
                                                            value == 1 && (
                                                                <CustomTabPanel
                                                                    className='tabs_block2'
                                                                    value={1}
                                                                    index={1}
                                                                >
                                                                    <div>
                                                                        <p>hello</p>
                                                                    </div>
                                                                </CustomTabPanel>
                                                            )
                                                        )}
                                                    </Box>
                                                    <button className='more_optBtn'>
                                                        <DotsIcon />
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                }
                <div className='footer_section'>
                    <div className='flexBox'>
                        <div className='left_block'>
                            <span className='copy_statement'>&copy; 2024 SootRock</span>
                        </div>
                        <div className='right_block'>
                            <ul className='link_list'>
                                <li>
                                    <Link className='footLink'>Terms of Services</Link>
                                </li>
                                <li>
                                    <Link className='footLink'>Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link className='footLink'>Help</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminDashBoardContent
