import React, { useState, useEffect } from 'react';
import locales from "../../Constants/en.json";
import { ReactComponent as Trash } from "../../assets/images/trash-2.svg";
import { ReactComponent as Pencil } from "../../assets/images/pencil.svg";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './ProductMaster.scss'

function ProductCards({ productData }) {



    return (
        <div className='productCard_container'>
            <div className='card_flexContainer'>
                {productData ?
                    productData &&
                    productData.length > 0 &&
                    productData.map((data) => {
                        return (
                            <div className='card_item'>
                                <div className='head_flexbox'>
                                    <div className='thumbnail'>
                                        <img src={data.image[0]} alt="thumbnail"></img>
                                    </div>
                                    <div className='action_flex'>
                                        <button className='commonBtn'><Trash /></button>
                                        <button className='commonBtn'><Pencil /></button>

                                    </div>
                                </div>
                                <h5 className='title'>{data.name}</h5>
                                <span className='subtitle'>{data.genericName}</span>
                                <div className='moreInfo'>
                                    <ul>
                                        <li>
                                            <span className='label'>Net Price:</span>
                                            <span className='text'>{data.netPrice}</span>
                                        </li>
                                        <li>
                                            <span className='label'>Product Code:</span>
                                            <span className='text'>{data.productCode}</span>
                                        </li>
                                        <li>
                                            <span className='label'>strength</span>
                                            <span className='text'>{data.strength}</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )
                    })
                    : <Box className="loader_container" sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>}
            </div>
        </div>
    )
}

export default ProductCards;