import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import FogoLogo from '../../assets/images/logo_fogo.svg';
import Webflow from "../../assets/images/web_flow.svg";
import Relume from "../../assets/images/relume.svg";
import {
    Routes, Route, Link,
    useLocation
} from "react-router-dom";
import './OurPartners.scss'

function OurPartners() {

    const partnersData = [Webflow, Relume, Webflow, Relume, Webflow, Relume, Webflow, Relume, Webflow, Relume, Webflow]

    return (
        <React.Fragment>
            <div className='ourpartner_section'>
                <div className='container'>
                    <div className='our_partner_grid'>
                        <h5 className='subtitle'>Empower</h5>
                        <h2 className='title'>
                            Our Partners
                        </h2>
                        <div className='partner_flex'>
                            {
                                partnersData &&
                                partnersData.length > 0 &&
                                partnersData.map((item, index) => {
                                    return (
                                        <span className='icon_box' key={index}>
                                            <img src={item} alt="icon"></img>
                                        </span>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default OurPartners;