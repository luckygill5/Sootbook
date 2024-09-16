import React, { useState, useRef } from 'react';
import { ReactComponent as ArrowUpDown } from "../../assets/images/chevrons-up-down.svg";
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './CommonTable.scss'
import { filter } from 'lodash';


function CommonTable(props) {
    const [indexCheck, setIndexCheck] = useState([]);
    const [selectAll, setSelectAll] = useState(false)


    const handleClick = (index) => {
        console.log("clicked true", index)
        props.dataPopulate(index)
    }

    let filtered;
    const handleChange = (event) => {
        if (indexCheck.includes(event)) {
            filtered = indexCheck.filter((item) => {
                if (item !== event) {
                    return item
                }
            })
            setIndexCheck(filtered)
        } else {
            setIndexCheck([...indexCheck, event])
        }

    }

    const handleChangeAll = () => {
        if (selectAll) {
            setIndexCheck([]);
            setSelectAll(false)
        } else {
            let collections = props.productData &&
                props.productData.length > 0 &&
                props.productData.map((item, index) => {
                    return index
                })


            setIndexCheck([...indexCheck, ...collections])
            setSelectAll(true)
        }

    }


    return (
        <React.Fragment>
       {(props.header &&
                        props.header.length > 0 &&
                        props.productData &&
                        props.productData.length > 0) ? <div className='commonTable_container'>
            <div className='table_head'>
                <div className={`table_row ln_${props.header.length}`}>
                    {props.header &&
                        props.header.length > 0 && <div className='tabCheckBox'>
                            <Checkbox onChange={() => handleChangeAll()} />
                        </div>}
                    {
                        props.header &&
                        props.header.length > 0 &&
                        props.header.map((label, index) => {
                            return (
                                <div key={index} className='thead'>
                                    <span className='text'>{label}</span>
                                    <span className='icon'><ArrowUpDown /></span>
                                </div>
                            )
                        })

                    }

                </div>
            </div>
            <div className='tableBody'>
                {
                    props.productData &&
                    props.productData.length > 0 &&
                    props.productData.map((item, index) => {
                        return (<div className={`tablerow ln_${props.header.length}`} key={index}>
                            <div className={`tabCheckBox ${indexCheck.includes(index) ? 'checked' : ''}`}>
                                <Checkbox checked={indexCheck.includes(index) ? true : false} onChange={() => handleChange(index)} />
                            </div>
                            {
                                Object.entries(item).map((data, index) => {

                                    if (props.header.includes(data[0])) {
                                        return <div key={index} className={`tableCell`} >
                                            {data[0] == 'productCode' ? <span className='text link' onClick={() => data[0] == "productCode" ? handleClick(data[1]) : ''}>{data[1]}</span> : <span className={`text`} >{data[1]}</span>}
                                        </div>

                                    }

                                })
                            }

                        </div>
                        )
                    })
                }


            </div>
        </div> : <Box className="loader_container" sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
    } 
        </React.Fragment>
    )
}

export default CommonTable;