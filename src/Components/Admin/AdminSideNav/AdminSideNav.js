import React, { useState } from 'react';
import Zoomview from "../../../assets/images/zoomview.svg";
import ExpandView from "../../../assets/images/expand_view.svg";
import { ReactComponent as Dashboard } from "../../../assets/images/home.svg";
import { ReactComponent as Admin } from "../../../assets/images/admin.svg";
import { ReactComponent as HRMICON } from "../../../assets/images/hrm.svg";
import { ReactComponent as MedicineIcon } from "../../../assets/images/medicines_green.svg";
import { ReactComponent as CRMIcon } from "../../../assets/images/crm_green.svg";
import { ReactComponent as CMSIcon } from "../../../assets/images/cms_green.svg";
import { ReactComponent as VendorsIcon } from "../../../assets/images/vendors_green.svg";
import { ReactComponent as FinanceIcon } from "../../../assets/images/finances_green.svg";
import { ReactComponent as ReportIcon } from "../../../assets/images/reports.svg";
import { ReactComponent as DownArrow } from "../../../assets/images/chevron-down.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/images/logout.svg";
import fogoLogo from "../../../assets/images/fogo_logo.svg";
import CompactLogo from "../../../assets/images/compact_logo.svg";
import Tooltip from '@mui/material/Tooltip';
import { setData, addData } from '../../../Slices/LoginServiceSlices';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import './AdminSideNav.scss'




function AdminSideNav(props) {
    const data = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuState, setMenuState] = useState([])

    function handleMenuItem(event) {
        if (event && menuState && menuState.length > 0) {
            if (menuState && menuState.length > 0 && sidebarMenu[event]?.childItem?.subMenu?.length > 0) {
                setMenuState([]);
                setMenuState([event])

            } else if (event) {
                setMenuState([event])
            }

        } else {
            setMenuState([event])
        }

    }

    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("loginData")
        dispatch(addData([]));
        navigate("/")
    }

    const sidebarMenu = [
        {
            item: 'Dashboard',
            icon: <Dashboard />,
            childItem: ''
        },
        {
            item: 'Admin',
            icon: <Admin />,
            childItem: ''
        },
        {
            item: 'HRM',
            icon: <Admin />,
            childItem: {
                subMenu: [
                    {
                        item: 'Link'
                    },
                    {
                        item: 'Employee'
                    }
                ],
            }
        },
        {
            item: 'Medicines',
            icon: <MedicineIcon />,
            childItem: ''
        },
        {
            item: 'CRM',
            icon: <CRMIcon />,
            childItem: ''
        },
        {
            item: 'CMS',
            icon: <CMSIcon />,
            childItem: ''
        },
        {
            item: 'Vendors',
            icon: <VendorsIcon />,
            childItem: ''
        },
        {
            item: 'Finances',
            icon: <FinanceIcon />,
            childItem: {
                subMenu: "",
                count: `9+`
            }
        },
        {
            item: 'Reports',
            icon: <ReportIcon />,
            childItem: ''
        },
    ]

    function handleToggleView() {
        if (document.querySelector('.navMenu_container.expand_view')) {
            document.querySelector('.navMenu_container').classList.remove('expand_view');
            props.expandControl()
        } else {
            document.querySelector('.navMenu_container').classList.add('expand_view');
            props.expandControl()
        }
    }

    return (
        <React.Fragment>
            <div className='navMenu_container'>
                <div className='upper_part'>
                    <div className='header_logoBlock'>
                        <div className='logoBlock'>
                            <img src={fogoLogo} className='fogo_logo' alt='fogo_logo'></img>
                            <img src={CompactLogo} className='compact_logo' alt="compact_logo"></img>
                        </div>
                        <div className='toggle_view'>
                            <button className='toggle_btn' onClick={() => handleToggleView()}>
                                <img src={Zoomview} className='collapse_view' alt="collapse_icon"></img>
                                <img src={ExpandView} className='expand_view' alt="expand_view"></img>
                            </button>
                        </div>
                    </div>
                    <div className='menu_itemContainer'>
                        <ul>
                            {
                                sidebarMenu && sidebarMenu.length > 0 && sidebarMenu.map((item, index) => {
                                    return (
                                        <li key={index}>

                                            <button className={`menu_link ${((index == menuState) && menuState.length > 0) && 'active'}`} onClick={() => handleMenuItem(index)}>
                                                <Tooltip className='tooltip' title={`${item.item}`}></Tooltip>
                                                <div className='icon'>
                                                    {item.icon}
                                                </div> <span className='text'>{item.item}</span>
                                                {
                                                    item?.childItem?.subMenu &&
                                                    item?.childItem?.subMenu.length > 0 && <span className='caret_icon'>
                                                        <DownArrow />
                                                    </span>
                                                }
                                                {
                                                    item?.childItem?.count && <span className='count_status'>{item?.childItem?.count}</span>
                                                }

                                            </button>
                                            {
                                                (index == menuState) && item?.childItem?.subMenu &&
                                                item?.childItem?.subMenu.length > 0 && (
                                                    <ul className='subMenu'>
                                                        {
                                                            item?.childItem?.subMenu.map((item, index) => {
                                                                return (
                                                                    <li>
                                                                        <button className='menu_link'>
                                                                            {item.item}
                                                                        </button>
                                                                    </li>
                                                                )
                                                            })
                                                        }

                                                    </ul>
                                                )
                                            }

                                        </li>
                                    )
                                })
                            }

                        </ul>
                    </div>
                </div>
                <div className='lower_part'>
                    <button className='logout_block' onClick={handleLogout}>
                        <div className='icon'><LogoutIcon /></div>
                        <span className='text'>Log out</span>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminSideNav;