import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import './RatingViews.scss'

function RatingViews(){

    const ratingViewData = [
        {
            rating :"100M+",
            info : "Efficiently manage your pharmacy operations with FOGO ERP"
        },
        {
            rating :"25+",
            info : "Expand your pharmacy's reach with FOGO ERP ecommerce solution"
        },
        {
            rating :"24/7",
            info : "Optimize your pharmacy's efficiency with FOGO ERP integration"
        },
    ]
    return(
        <React.Fragment>
            <div className='rating_views_container'>
                <div className='container'>
                <div className='grid_flexBox'>
                    {
                        ratingViewData &&
                        ratingViewData.length > 0 &&
                        ratingViewData.map((item, index) => {
                            return (
                                <div className='flex-item'>
                                <div className='rating'>{item.rating}</div>
                                <div className='info'>{item.info}</div>
                            </div>
                            )
                        })
                    }

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RatingViews;