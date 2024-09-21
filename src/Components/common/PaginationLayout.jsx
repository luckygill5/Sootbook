import React, { useState } from 'react';
import { ReactComponent as Arrow } from "../../assets/images/chevron-right.svg";
import Pagination from '@mui/material/Pagination';
import { Select } from '../common';
import './common.component.scss'

function PaginationLayout({ paginationSet, pageNo }) {
    const [page, setPage] = React.useState(1);
    const [value, setValue] = React.useState('');
    const handleChange = (event, value) => {
        paginationSet(value)
        //   setPage(value);

    };

    const handlePaginationSelect = (event) => {
        const { value } = event.target;
        paginationSet(value.split('page')[0])
        setValue(value);
        
    }

    
    return (
        <div className='paginationsection'>
            <div className='leftCol'>
                <Pagination count={10} shape="rounded" page={pageNo} onChange={handleChange} />
                <div className='paginationSelect'>
                <Select
                    label={''}
                    name={'paginationSelect'}
                    options={[
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
                    <input type="text"></input>
                    <span className='label'>page</span>
                </div>
            </div>
        </div>
    )
}

export default PaginationLayout