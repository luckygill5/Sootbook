import React, { useState, useEffect } from 'react';
import { ReactComponent as UserPlus } from '../../../../assets/images/user-plus.svg';
import Upload from "../../../../assets/images/upload.svg";
import Download from "../../../../assets/images/download.svg";
import Filter from "../../../../assets/images/filter.svg";
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { ReactComponent as Cross } from '../../../../assets/images/x.svg';
import { ReactComponent as List } from '../../../../assets/images/list.svg';
import { ReactComponent as UserSquare } from '../../../../assets/images/user-square-2.svg';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

function UserRoles(props) {
    const [value, setValue] = React.useState('cardview');

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handleClick = () => {
        console.info('You clicked the Chip.');
    };

    const handleDelete = () => {
        console.info('You clicked the delete icon.');
    };

    return (
        <div className='userRoles_container'>
            <div className='header_flexbox'>
                <h5 className='title'>Users</h5>
                <button className='addroleBtn'>
                    <span className='icon'>
                        <UserPlus />
                    </span>
                    Add Role
                </button>
            </div>
            <div className='listcardview_container'>
                <div className='header_section'>
                    <div className='searchBox'>
                        <input type='text' className='search-input' placeholder='Search by keywords'></input>
                    </div>
                    <div className='action_flexBox'>
                        <button className='actionBtn'>
                            <span className='icon'>
                                <img src={Upload} alt="upload" className='img'></img>
                            </span>
                            Export
                        </button>
                        <button className='actionBtn'>
                            <span className='icon'>
                                <img src={Download} alt="upload" className='img'></img>
                            </span>
                            Import
                        </button>
                        <button className='actionBtn'>
                            <span className='icon'>
                                <img src={Filter} alt="upload" className='img'></img>
                            </span>
                            Filter
                        </button>
                    </div>
                </div>
                <div className='viewManage_section'>
                    <div className='chip_flebox'>
                        <Stack direction="row" spacing={1}>
                            <Chip label="Account Manager"
                                onClick={handleClick}
                                onDelete={handleDelete}
                                deleteIcon={<Cross />}
                            ></Chip>
                            <Chip label="Active"
                                onClick={handleClick}
                                onDelete={handleDelete}
                                deleteIcon={<Cross />}
                            />
                        </Stack>
                        <span className='clearallBtn'>Clear all</span>
                    </div>
                    <div className='view_manage'>
                        <RadioGroup
                            aria-labelledby="demo-controlled-radio-buttons-group"
                            name="controlled-radio-buttons-group"
                            value={value}
                            onChange={handleChange}
                        >
                            <div className={`list_view ${value == 'listview' ? 'active' : ''}`}>
                                <FormControlLabel value="listview" control={<Radio />} />
                                <List />
                            </div>
                            <div className={`card_view ${value == 'cardview' ? 'active' : ''}`}>
                                <FormControlLabel value="cardview" control={<Radio />} />
                                <UserSquare />
                            </div>

                        </RadioGroup>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserRoles;