import React, { useState, useRef } from 'react';
import { ReactComponent as ArrowUpDown } from '../../assets/images/chevrons-up-down.svg';
import { ReactComponent as Dots } from '../../assets/images/more-horizontal.svg';
import { ReactComponent as Pencil } from '../../assets/images/pencil.svg';
import { ReactComponent as Bin } from '../../assets/images/trash-2.svg';
import { ReactComponent as EyeOff } from '../../assets/images/eye-off.svg';
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Copy from '../../assets/images/copy.svg';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import './CommonTable.scss';


function CommonTable(props) {
    const [indexCheck, setIndexCheck] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [filteredProductCode, setFilteredProductCode] = useState('');
    const [filteredProductID, setFilteredProductID] = useState('');
    const open = Boolean(anchorEl);
    const [copied, setCopied] = useState(false);
    const [copyOpen, setCopyOpen] = useState(false);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = index => {
        props.dataPopulate(index);
    };

    const handleEditClick = index => {
        debugger
        props.dataEditPopulate(index);
    };
    let filtered;
    const handleChange = event => {
        if (indexCheck.includes(event)) {

            filtered = indexCheck.filter(item => {
                if (item !== event) {
                    return item;
                }
            });

            if (indexCheck.includes(0) == true && event !== 0 && filtered.includes(0) == false) {
                setIndexCheck([0, ...filtered]);
            } else {
                setIndexCheck([...filtered]);
            }



            if (selectAll) {
                setSelectAll(false)
            }

        } else {
            setIndexCheck([...indexCheck, event]);
            if (selectAll) {
                setSelectAll(false)
            }
        }
    };

    const handleChangeAll = () => {
        if (selectAll) {
            setIndexCheck([]);
            setSelectAll(false);
        } else {
            let collections =
                props.tableBodyData &&
                props.tableBodyData.length > 0 &&
                props.tableBodyData.map((item, index) => {
                    return index;
                });

            setIndexCheck([...indexCheck, ...collections]);
            setSelectAll(true);
        }
    };

    const handlePopUpClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuOptionClicked = event => {
        filerProductCode(event);
    };

    const filerProductCode = event => {
        let filterObject;
        let filteredCode;
        let FilteredID;
        filterObject =
            props.tableBodyData &&
            props.tableBodyData.length > 0 &&
            props.tableBodyData.filter((item, index) => {
                if (index == event) {
                    return item;
                }
            });
            console.log("filter", filterObject)
        filteredCode = filterObject[0].productCode ? filterObject[0].productCode : filterObject[0].code;
        FilteredID = filterObject[0]._id;
        setFilteredProductCode(filteredCode);
        setFilteredProductID(FilteredID);
    };

    const handleDeleProduct = id => {
        props.deleteProductData(id);
        setAnchorEl(null);
    };

    const handleSnackClose = (
        event,
        reason,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopyOpen(false);
    };
    return (
        <React.Fragment>
            {props.header && props.header.length > 0 && props.tableBodyData && props.tableBodyData.length > 0 ? (
                <div className='commonTable_container'>
                    <div className='table_head'>
                        <div className={`table_row ln_${props.header.length}`}>
                            {props.header && props.header.length > 0 && (
                                <div className='tabCheckBox'>
                                    <Checkbox checked={selectAll ? true : false} onChange={() => handleChangeAll()} />
                                </div>
                            )}
                            {props.header &&
                                props.header.length > 0 &&
                                props.header.map((label, index) => {
                                    return (
                                        <div key={index} className='thead'>
                                            <div className='flexbox'>
                                            <span className='text'>{label}</span>
                                            <span className='icon'>
                                                <ArrowUpDown />
                                            </span>
                                        </div>
                                        </div>
                                    );
                                })}

                            {props.header && props.header.length > 0 && <div className='moreOptions'></div>}
                        </div>
                    </div>
                    <div className='tableBody'>
                        {
                            props.tableBodyData &&
                            props.tableBodyData.length > 0 &&
                            props.tableBodyData.map((item, index) => {
                                return (<div className={`tablerow ln_${props.header.length}`} key={index}>
                                    <div className={`tabCheckBox ${indexCheck.includes(index) ? 'checked' : ''}`}>
                                        <Checkbox checked={indexCheck.includes(index) ? true : false} onChange={() => handleChange(index)} />
                                    </div>
                                    {
                                        Object.entries(item).map((data, index) => {
                                            if (props.header?.includes(data[0]) || props.tableFilterHeader?.includes(data[0])) {
                                                return <div key={index} className={`tableCell ${data[0]}`} >
                                                    <div className='flexbox'>
                                                    {data[0] == 'productCode' ? <span className='text link' onClick={() => data[0] == "productCode" ? handleClick(data[1]) : ''}>{data[1]}</span> : <span className={`text`} >{data[1]}</span>}
                                                    {props.copyHeaderItem.includes(data[0]) ?
                                                        <span className='copy'>
                                                            <CopyToClipboard text={data[1]} onCopy={() => { setCopyOpen(true); setCopied(true) }}>
                                                                <img src={Copy} alt='copyIcon' className='icon'></img>
                                                            </CopyToClipboard>
                                                        </span> : null
                                                    }
                                                     </div>
                                                </div>

                                            }

                                        })
                                    }
                                    <div className='moreOptions'>
                                        <span className='icon'
                                            id="basic-button"
                                            aria-controls={open ? 'basic-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(event) => {
                                                handleMenuOptionClicked(index)
                                                handlePopUpClick(event)
                                            }}><Dots /></span>
                                    </div>
                                </div>
                                )
                            })
                        }


                    </div>
                </div>) : <Box className="loader_container" sx={{ display: 'flex' }}>
                <p>No Data found</p>
            </Box>
            }

            <Menu
                className='editMenu'
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleEditClick(filteredProductCode ? filteredProductCode : filteredProductID)}><span className='icon'><Pencil /></span> Edit</MenuItem>
                <MenuItem onClick={() => handleDeleProduct(filteredProductID)}><span className='icon'><Bin /></span> Delete</MenuItem>
                {/* <MenuItem onClick={handleClose}><span className='icon'><EyeOff /></span> Hide</MenuItem> */}
            </Menu>

            <Snackbar
                open={copyOpen}
                autoHideDuration={3000}
                onClose={handleSnackClose}
                message="Copied"
            //   action={action}
            />
        </React.Fragment>
    );
}

export default CommonTable;
