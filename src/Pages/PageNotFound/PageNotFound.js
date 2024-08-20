import React, {useState} from 'react';
import locales from "../../Constants/en.json";
import { Link, useNavigate } from "react-router-dom";
import './PageNotFound.scss'

function PageNotFound(){
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <div className='pagenotfound_container'>
                <p className='info'>The page you are looking for is not available right now.</p>
                <button className='signin_btn' onClick={() => navigate( "/")}>go to home</button>
            </div>
        </React.Fragment>
    )
}

export default PageNotFound;