import React, { useState } from 'react';
import { ReactComponent as Arrow } from "../../assets/images/chevron-right.svg";
import './common.component.scss'

function Pagination() {

    return (
        <div className='paginationsection'>
            <div className='leftCol'>
                <ul className='navigation_listing'>
                    <li>
                        <span className='pev-arrow'><Arrow /></span>
                    </li>
                    <li>
                        <span className='select text'>1</span>
                    </li>
                    <li>
                        <span className='text'>2</span>
                    </li>
                    <li>
                        <span className='text'>3</span>
                    </li>
                    <li>
                        <span className='text more'>...</span>
                    </li>
                    <li>
                        <span className='text'>10</span>
                    </li>
                    <li>
                        <span className='next-arrow'><Arrow /></span>
                    </li>
                </ul>
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

export default Pagination