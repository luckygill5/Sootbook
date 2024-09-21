import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as UserPlus } from '../../../../assets/images/user-plus.svg';
import Upload from '../../../../assets/images/upload.svg';
import Download from '../../../../assets/images/download.svg';
import Filter from '../../../../assets/images/filter.svg';
import Equal from '../../../../assets/images/equal.svg';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ReactComponent as Cross } from '../../../../assets/images/x.svg';
import { ReactComponent as List } from '../../../../assets/images/list.svg';
import { ReactComponent as UserSquare } from '../../../../assets/images/user-square-2.svg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import UserAvtar1 from '../../../../assets/images/user_Avatar1.png';
import UserAvtar2 from '../../../../assets/images/user_Avatar2.png';
import UserAvtar3 from '../../../../assets/images/user_Avatar3.png';
import UserAvtar4 from '../../../../assets/images/user_Avatar4.png';
import UserAvtar5 from '../../../../assets/images/user_Avatar5.png';
import UserAvtar6 from '../../../../assets/images/user_Avatar6.png';
import { ReactComponent as FileText } from '../../../../assets/images/file-text.svg';
import { ReactComponent as Phone } from '../../../../assets/images/phone.svg';
import { ReactComponent as Mail } from '../../../../assets/images/mail.svg';
import CloseX from '../../../../assets/images/x-cross.svg';
// import CardLayout from './EmployeeRoleCard';

import TabularLayout from './EmployeeRoleTabular';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../Employee.scss';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Input, Select, TextArea } from '../../../../Components/common';
import { exportToExcel } from 'react-json-to-excel';
import { useSelector, useDispatch } from 'react-redux';
import { setData, addData } from '../../../../Slices/EmployeeListSlice';
import { UserList } from '../../../../services/userList.service.js';
import CardLayout from '../../User/UserRoleListing/UserRoleCard.jsx';

function EmployeeRolesList({ Userhandle , setEditUserData}) {
    const data = useSelector(state => state);

    const { rolePermissionList = [] } = data.userSaveList?.data;
    const dispatch = useDispatch();
    const [TableBody, setTableBody] = useState('');
    const [view, setView] = React.useState('cardview');
    const [RoleFilter, setRoleFilter] = useState({
        Branch_Manager: '',
        Regional_Manager: '',
        Organization_Administrator: '',
    });

    const manageColumnData = [
        'Employee Id',
        'First Name',
        'Email',
        'Role',
        'Creation date',
        'Created by',
        'Status',
    ];
    const [RolefilterCollect, setRoleFilterCollect] = useState([]);
    const filterDrawer = useRef(null);
    const manageDrawer = useRef(null);

    const handleChange = event => {
        setView(event.target.value);
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    const userCardData = [
        {
            profileImg: UserAvtar1,
            name: 'Miles, Esther',
            designation: 'Product manager',
            status: 'Active',
            SubData: [
                {
                    item: '23CSDC',
                    icon: <FileText />,
                },
                {
                    item: '+4369010013603',
                    icon: <Phone />,
                },
                {
                    item: 'product@gmail.com',
                    icon: <Mail />,
                },
            ],
        },
        {
            profileImg: UserAvtar2,
            name: 'Nguyen, Shane',
            designation: 'Product manager',
            status: 'Active',
            SubData: [
                {
                    item: '23CSDC',
                    icon: <FileText />,
                },
                {
                    item: '+4369010013603',
                    icon: <Phone />,
                },
                {
                    item: 'product@gmail.com',
                    icon: <Mail />,
                },
            ],
        },
        {
            profileImg: UserAvtar3,
            name: 'Henry, Arthur',
            designation: 'Product manager',
            status: 'Active',
            SubData: [
                {
                    item: '23CSDC',
                    icon: <FileText />,
                },
                {
                    item: '+4369010013603',
                    icon: <Phone />,
                },
                {
                    item: 'product@gmail.com',
                    icon: <Mail />,
                },
            ],
        },
        {
            profileImg: UserAvtar4,
            name: 'Flores, Juanita',
            designation: 'Product manager',
            status: 'Active',
            SubData: [
                {
                    item: '23CSDC',
                    icon: <FileText />,
                },
                {
                    item: '+4369010013603',
                    icon: <Phone />,
                },
                {
                    item: 'product@gmail.com',
                    icon: <Mail />,
                },
            ],
        },
        {
            profileImg: UserAvtar5,
            name: 'Cooper, Kristin',
            designation: 'Product manager',
            status: 'Active',
            SubData: [
                {
                    item: '23CSDC',
                    icon: <FileText />,
                },
                {
                    item: '+4369010013603',
                    icon: <Phone />,
                },
                {
                    item: 'product@gmail.com',
                    icon: <Mail />,
                },
            ],
        },
        {
            profileImg: UserAvtar6,
            name: 'Black, Marvin',
            designation: 'Product manager',
            status: 'Active',
            SubData: [
                {
                    item: '23CSDC',
                    icon: <FileText />,
                },
                {
                    item: '+4369010013603',
                    icon: <Phone />,
                },
                {
                    item: 'product@gmail.com',
                    icon: <Mail />,
                },
            ],
        },
    ];

    const tableHead = [
        { title: 'User ID' },
        { title: 'Username' },
        { title: 'Email' },
        { title: 'Role' },
        { title: 'Creation date' },
    ];

    const tableBody = [
        {
            id: 'OFO123',
            name: `Annette Black`,
            email: 'sara.cruz@example.com',
            role: 'Branch Manager',
            date: '26 Oct-2020, 00:00',
        },
        {
            id: 'WF2DS3',
            name: 'Darrell Steward',
            email: '',
            role: 'Regional Manager',
            date: '19 Apr 2021, 00:00',
        },
        {
            id: 'DSVSDF3',
            name: 'Eleanor Pena',
            email: 'jessica.hanson@example.com',
            role: 'Organization Administrator',
            date: '26 Oct-2020, 00:00',
        },
        {
            id: '234GH5',
            name: 'Leslie Alexander',
            email: '',
            role: 'Trust Administrator',
            date: '26 Oct-2020, 00:00',
        },
        {
            id: 'IJ89G4',
            name: 'Brooklyn Simmons',
            email: 'deanna.curtis@example.com',
            role: 'Accountant',
            date: '26 Oct-2020, 00:00',
        },
        {
            id: 'ZXCSDC',
            name: 'Arlene McCoy',
            email: 'kenzi.lawson@example.com',
            role: 'Agent',
            date: '26 Oct-2020, 00:00',
        },
        {
            id: 'OGA323',
            name: 'Annette Black',
            email: 'felicia.reid@example.com',
            role: 'Tax Officer',
            date: '26 Oct-2020, 00:00',
        },
        {
            id: 'SDF23E2',
            name: 'Arlene McCoy',
            email: 'tanya.hill@example.com',
            role: 'Vice President',
            date: '26 Oct-2020, 00:00',
        },
    ];

    const handleFilterDrawer = () => {
        filterDrawer.current.classList.add('slide');
    };

    const handleCloseDrawer = () => {
        if (filterDrawer.current.className == 'filterDrawer slide') {
            filterDrawer.current.classList.remove('slide');
        }
    };

    const handleManageColumn = () => {
        manageDrawer.current.classList.add('slide');
    };

    const handleCloseManageDrawer = () => {
        if (manageDrawer.current.className == 'manageDrawer slide') {
            manageDrawer.current.classList.remove('slide');
        }
    };

    const handleRoleFilter = e => {
        const { name, checked } = e.target;
        setRoleFilter(prevState => ({
            ...prevState,
            [name]: checked,
        }));
        if (RolefilterCollect.includes(name)) {
            let refilter = RolefilterCollect.filter(item => {
                if (item !== name) {
                    return item;
                }
            });
            setRoleFilterCollect([...refilter]);
        } else {
            setRoleFilterCollect([...RolefilterCollect, name]);
        }
    };

    const handleFilter = () => {
        if (RolefilterCollect.length == 0 && (TableBody.length == 0 || TableBody.length > 0)) {
            setTableBody(tableBody);
        } else if (RolefilterCollect.length > 0) {
            let filterData = [];
            TableBody.map(item => {
                Object.keys(item).map(key => {
                    if (RolefilterCollect.includes(item[key].split(' ').join('_'))) {
                        filterData.push(item);
                    }
                });
            });
            setTableBody(filterData);
        }
    };

    const handleClearFilter = () => {
        if (RolefilterCollect.length > 0) {
            RolefilterCollect.map(item => {
                setRoleFilter(prevState => ({
                    ...prevState,
                    [item]: false,
                }));
            });
        }
        setRoleFilterCollect([]);
    };

    useEffect(() => {
        
        UserList()?.then(response => {
            if (response && response.data) {
                dispatch(addData(response.data));
            }
        });
       
    }, []);

    const handleManageColumnFilter = event => {
        const filter = tableHead.filter(item => {
            if (item.title !== event) {
                return item;
            }
        });

    };
    return (
        <div className='userRoles_container'>
            <div className='header_flexbox'>
                <h5 className='title'>Employees</h5>
                <button className='addroleBtn' onClick={() => Userhandle()}>
                    <span className='icon'>
                        <UserPlus />
                    </span>
                    Add Employee
                </button>
            </div>
            <div className='listcardview_container'>
                <div className='header_section'>
                    <div className='searchBox'>
                        <input
                            type='text'
                            className='search-input'
                            placeholder='Search by keywords'
                        ></input>
                    </div>
                    <div className='action_flexBox'>
                        <button
                            className='actionBtn'
                            type='button'
                            onClick={() => exportToExcel(tableBody, 'downloadfilename')}
                        >
                            <span className='icon'>
                                <img src={Upload} alt='upload' className='img'></img>
                            </span>
                            Export
                        </button>
                        <button className='actionBtn'>
                            <span className='icon'>
                                <img src={Download} alt='upload' className='img'></img>
                            </span>
                            Import
                        </button>
                        <button
                            className='actionBtn'
                            type='submit'
                            onClick={() => handleFilterDrawer()}
                        >
                            <span className='icon'>
                                <img src={Filter} alt='upload' className='img'></img>
                            </span>
                            Filter
                        </button>
                    </div>
                </div>
                <div className='viewManage_section'>
                    <div className='chip_flebox'>
                        <Stack direction='row' spacing={1}>
                            <Chip
                                label='Account Manager'
                                onClick={handleClick}
                                onDelete={handleDelete}
                                deleteIcon={<Cross />}
                            ></Chip>
                            <Chip
                                label='Active'
                                onClick={handleClick}
                                onDelete={handleDelete}
                                deleteIcon={<Cross />}
                            />
                        </Stack>
                        <span className='clearallBtn'>Clear all</span>
                    </div>
                    <div className='view_manage'>
                        <RadioGroup
                            aria-labelledby='demo-controlled-radio-buttons-group'
                            name='controlled-radio-buttons-group'
                            value={view}
                            onChange={handleChange}
                        >
                            <div className={`list_view ${view == 'listview' ? 'active' : ''}`}>
                                <FormControlLabel value='listview' control={<Radio />} />
                                <List />
                            </div>
                            <div className={`card_view ${view == 'cardview' ? 'active' : ''}`}>
                                <FormControlLabel value='cardview' control={<Radio />} />
                                <UserSquare />
                            </div>
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <div className='view_container'>
                {view == 'cardview' ? (
                    <CardLayout
                        employeData={data.userListData?.data?.employees}
                        cardData={userCardData}
                        rolePermissionList={rolePermissionList}
                        setEditUserData={setEditUserData}
                        Userhandle={Userhandle}
                    />
                ) : view == 'listview' ? (
                    <TabularLayout
                        employeData={data.userListData?.data?.employees}
                        manageColumn={() => handleManageColumn()}
                    />
                ) : null}
            </div>
            {
                <div className='filterDrawer' ref={filterDrawer}>
                    <div className='headerFlexbox'>
                        <h5 className='title'>All filters</h5>
                        <button className='closeBtn' type='submit' onClick={handleCloseDrawer}>
                            <img src={CloseX} alt='close' className='img-close'></img>
                        </button>
                    </div>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1-content'
                            id='panel1-header'
                        >
                            Role
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul className='role_listing'>
                                {Object.keys(RoleFilter).map(item => {
                                    return (
                                        <li className='check_item'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={RoleFilter[item]}
                                                        name={item}
                                                        onChange={event => handleRoleFilter(event)}
                                                    />
                                                }
                                                label={item.split('_').join(' ')}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls='panel1-content'
                            id='panel2-header'
                        >
                            Status
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul className='status_listing'>
                                <li className='check_item'>
                                    <FormControlLabel control={<Checkbox />} label='Active' />
                                </li>
                                <li className='check_item'>
                                    <FormControlLabel control={<Checkbox />} label='Blocked' />
                                </li>
                                <li className='check_item'>
                                    <FormControlLabel control={<Checkbox />} label='Inactive' />
                                </li>
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                    <div className='bottom_actions'>
                        <button className='clearFilter' type='submit' onClick={handleClearFilter}>
                            Clear all filter
                        </button>
                        <button className='applyFilter' type='submit' onClick={handleFilter}>
                            Apply filter
                        </button>
                    </div>
                </div>
            }

            {
                <div className='manageDrawer' ref={manageDrawer}>
                    <div className='headerFlexbox'>
                        <h5 className='title'>Choose Column</h5>
                        <button
                            className='closeBtn'
                            type='submit'
                            onClick={handleCloseManageDrawer}
                        >
                            <img src={CloseX} alt='close' className='img-close'></img>
                        </button>
                    </div>
                    <div className='search_flexbox'>
                        <Input
                            label={''}
                            type={'text'}
                            name={'field_box'}
                            id={'field_box'}
                            wrapperClass={'col12'}
                            value={''}
                            placeholder={'Find a field'}
                            //   onChange={handleChange}
                            //   onBlur={handleBlur}
                            // isRequired
                            //   error={errors.first_name}
                            //   touched={touched.first_name}
                        />
                    </div>
                    <ul className='manageColumnListing'>
                        {manageColumnData &&
                            manageColumnData.length > 0 &&
                            manageColumnData.map((label, index) => {
                                return (
                                    <li key={index} className='list_item'>
                                        <span className='checkBox'>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onChange={() =>
                                                            handleManageColumnFilter(label)
                                                        }
                                                        checked={
                                                            tableHead[index]?.title &&
                                                            tableHead[index]?.title == label
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                }
                                                label={label}
                                            />
                                        </span>
                                        <span className='bar'>
                                            <img
                                                src={Equal}
                                                alt='equal_icon'
                                                className='bar_icon'
                                            ></img>
                                        </span>
                                    </li>
                                );
                            })}
                    </ul>
                    <div className='bottom_actions'>
                        <button className='clearFilter' type='submit' onClick={handleClearFilter}>
                            Clear all filter
                        </button>
                        <button className='applyFilter' type='submit' onClick={handleFilter}>
                            Apply filter
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default EmployeeRolesList;
