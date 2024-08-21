import React, {useState,useEffect} from 'react';
import BasicInformationInfo from './BasicInformationInfo/BasicInformationInfo';

function basicInformation(){

    return (
        <React.Fragment>
            <div className='basicInformation_container'>
                <BasicInformationInfo/>
            </div>
        </React.Fragment>
    )

}

export default basicInformation;