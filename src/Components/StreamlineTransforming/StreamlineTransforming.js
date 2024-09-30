import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import { ReactComponent as RightArrow } from '../../assets/images/chevron-right.svg';
import './StreamlineTransforming.scss'

function StreamlineTransforming(props){
    return (
        <React.Fragment>
            <div className='StreamlineTransforming_container'>
                <div className='container'>
                {props.data.subtitle && <h5 className='subtitle'>{props.data.subtitle}</h5>}
                {props.data.title && <h4 className='title'>{props.data.title}</h4>}
                {props.data.info && <p className='info'>{props.data.info}</p> }
                <div className='actions'>
                    <button className='signUp_btn'>{locales.signUp}</button>
                    <button className='learn_more'>{locales.learn_more} 
                        <span className='icon'>
                            <RightArrow/>
                        </span>
                        </button>
                </div>
                <div className='banner_block' style={{
                    backgroundImage : `url(${props.data.image})`
                }}>

                </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default StreamlineTransforming;