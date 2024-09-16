import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { ReactComponent as Arrow } from "../../../../assets/images/chevron-down.svg";
import { ReactComponent as Pin } from "../../../../assets/images/pin.svg";
import { ReactComponent as Copy } from "../../../../assets/images/copy.svg";
import { ReactComponent as DotsIcon } from "../../../../assets/images/bullets.svg";
import { ReactComponent as EyeOff } from "../../../../assets/images/eye-off.svg";
import { ReactComponent as Settings } from "../../../../assets/images/settings_black.svg";
import { ReactComponent as View } from "../../../../assets/images/view.svg";
import { ReactComponent as Pencil } from "../../../../assets/images/pencil.svg";
import { ReactComponent as Bin } from "../../../../assets/images/trash-2.svg";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import "../User.scss"


function TabularLayout({ manageColumn, employeData, setEditUserData, Userhandle }) {
    const [tableHeadArray, setTableHeadArray] = useState([]);


    useEffect(() => {
        let filterData;
        let filteredUsers;
        employeData.map((label, index) => {
            filterData = Object.keys(label).filter((item) => {
                if (item == "first_name") {
                    return item
                }
                //  if(item == "last_name"){
                //     return item
                //  }
                if (item == "email") {
                    return item
                }
                if (item == "role") {
                    return item
                }
                if (item == "createdAt") {
                    return item
                }
                //  if(item == "status"){
                //     return item
                //  }
                //  if(item == "updatedAt"){
                //     return item
                //  }
                if (item == "_id") {
                    return item
                }
            })

        })
        setTableHeadArray(filterData)
    }, [])


    const [anchorEl, setAnchorEl] = useState(null);
    const [control, setControl] = useState(null)
    const [selectedIndex, setSelectedIndex] = useState([]);

    const open = Boolean(anchorEl);
    const show = Boolean(control);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleControl = (event) => {

        setControl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleControlClose = () => {
        setControl(null)
    }

    const handleSelected = (index) => {
        if (selectedIndex.includes(index)) {
            let filter = selectedIndex.filter((item) => {
                if (item !== index) {
                    return item
                }
            })
            setSelectedIndex([...filter])
        }
        else {
            setSelectedIndex([...selectedIndex, index])
        }

    }

    return (
        <React.Fragment>
            <div className='tableFlex_container'>
                <div className='thead'>
                    <div className='row'>
                        <div className='checkbox_block'>
                            <Checkbox />
                        </div>
                        {
                            tableHeadArray &&
                            tableHeadArray.length > 0 &&
                            tableHeadArray.map((item, index) => {
                                return (
                                    <div key={index} className={`tcolumn ${(item.title == 'Username' || item.title == "Email" || item.title == "Role") ? 'lg' : 'sm'}`}>
                                        {item.title == 'User ID' && <span className='pinIcon'><Pin /></span>}
                                        <span className='title'>{item.toUpperCase()}</span>
                                        <div className='sort'>
                                            <span className='arrowUp'><Arrow /></span>
                                            <span className='arrowDown'><Arrow /></span>
                                        </div>
                                        {item == 'first_name' && <button id='basic-button' onClick={handleClick} type='submit' className='manageOptions'><DotsIcon /></button>}

                                    </div>

                                )
                            })

                        }
                        <div className='placeholder'></div>
                    </div>
                </div>
                <div className='tbody'>
                    {
                        employeData &&
                        employeData.length > 0 &&
                        employeData.map((item, index) => {
                            return (
                                <div className={`row ${selectedIndex.includes(index + 1) ? 'selected' : ''}`} key={index}>
                                    <div className={`check_block`}   >
                                        <Checkbox onChange={() => handleSelected(index + 1)} />
                                    </div>
                                    {
                                        Object.keys(item).map((key, index) => {
                                            return (
                                                <>
                                                    {(tableHeadArray.includes(key)) ? <div key={index} className={`tCell sm`}>
                                                        <div className={`data`}>{item[key]}</div>
                                                        {/* {
                                                        true ? <div className='copyIcon'><Copy /></div> :  null
                                                    } */}
                                                    </div> : null}
                                                </>
                                            )
                                        })
                                    }
                                    <div className='moreOption'>
                                        <button className='link' id='control-button' type="submit" onClick={handleControl}>
                                            <DotsIcon />
                                        </button>
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>


            </div>
            {anchorEl && open ? <Menu
                id="basic-menu"
                className='moreMenuOptions'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}><span className='icon'><Pin /></span>Pin column</MenuItem>
                <MenuItem onClick={handleClose}><span className='icon'><EyeOff /></span>Hide column</MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    manageColumn()
                }}><span className='icon'><Settings /></span>Manage column</MenuItem>
            </Menu> : null}

            {control && show ? <Menu
                id="control-menu"
                className='controlMenuOptions'
                anchorEl={control}
                open={show}
                onClose={handleControlClose}
                MenuListProps={{
                    'aria-labelledby': 'control-button',
                }}
            >
                <MenuItem onClick={handleControlClose}><span className='icon'><View /></span>View</MenuItem>
                <MenuItem onClick={(e) => {console.log(e);setEditUserData();Userhandle();handleControlClose();}}><span className='icon'><Pencil /></span>Edit</MenuItem>
                <MenuItem onClick={handleControlClose}><span className='icon'><EyeOff /></span>Delete role</MenuItem>
            </Menu> : null}
        </React.Fragment>
    )
}

export default TabularLayout;