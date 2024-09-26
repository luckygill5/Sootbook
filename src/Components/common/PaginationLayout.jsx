import React, { useEffect, useState } from 'react';
import { ReactComponent as Arrow } from "../../assets/images/chevron-right.svg";
import Pagination from '@mui/material/Pagination';
import { Select } from '../common';
import './common.component.scss'

function PaginationLayout({ paginationSet, pageNo , totalPages }) {
    const [page, setPage] = React.useState(1);
    const [value, setValue] = React.useState('1 page');
    const  [gotoPage, setgotoPage] = React.useState();
    const handleChange = (event, value) => {
        paginationSet(value)
        //   setPage(value);

    };

    const handlePaginationSelect = (event) => {
        const { value } = event.target;
        paginationSet(value.split('page')[0])
        setValue(value);        
    }

    const handlePageChange=(event)=>{
        const {value} =event.target;
        paginationSet(parseInt(value));
        setgotoPage(value);
    }

    
    return (
        <div className='paginationsection'>
            <div className='leftCol'>
                <Pagination count={totalPages} shape="rounded" page={pageNo} onChange={handleChange} />
                <div className='paginationSelect'>
                <Select
                    label={''}
                    name={'paginationSelect'}
                    options={[
                        { id: "1 page", value: "1 page" },
                        { id: "5 page", value: "5 page" },
                        { id: "10 page", value: "10 page" },
                        { id: "15 page", value: "15 page" },
                    ]}
                    wrapperClass={'col12'}
                    value={value}
                    onChange={handlePaginationSelect}
                />
                </div>
            </div>
            <div className='rightCol'>
                <div className='flexbox'>
                    <span className='label'>Go to</span>
                    <input type="text"  value={gotoPage} onChange={handlePageChange}></input>
                    <span className='label'>page</span>
                </div>
            </div>
        </div>
    )
}

export default PaginationLayout