import React, { useState } from 'react';
import locales from "../../Constants/en.json";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { ReactComponent as Plus } from '../../assets/images/plus.svg';
import { ReactComponent as Minus } from '../../assets/images/minus.svg';
import Banner from "../../assets/images/presentation-1.png"
import './FAQS.scss'

function FAQS() {
    const [expanded, setExpanded] = useState(false);


    const handleChange =
        (panel) => (event, isExpanded) => {
            if(expanded == isExpanded){
                setExpanded(false)
            }else{
                setExpanded(isExpanded ? panel : false);
            }
            
        };


    const faqcontentData = [
        {
            mainHeading: "What is ERP software?",
            description: "Yes, Preline is an open-source project and is copyright 2022 Htmlstream."
        },
        {
            mainHeading: "What is ERP software?",
            description: "Yes, Preline is an open-source project and is copyright 2022 Htmlstream."
        },
        {
            mainHeading: "Is Preline UI free?",
            description: "Yes, Preline is an open-source project and is copyright 2022 Htmlstream."
        },
        {
            mainHeading: "What is ERP software?",
            description: "Yes, Preline is an open-source project and is copyright 2022 Htmlstream."
        },
        {
            mainHeading: "What is ERP software?",
            description: "Yes, Preline is an open-source project and is copyright 2022 Htmlstream."
        }
    ]

    return (
        <React.Fragment>
            <div className='faqs_section'>
                <div className='container'>
                <h5 className='subtitle'>Enhance</h5>
                <h4 className='title'>FAQs</h4>
                <p className='info'>Find answers to common questions about our ERP software for pharmacies.</p>
                <div className='grid_box'>
                    <div className='flex_left'>
                        <div className='accord_content_list'>
                            {
                                faqcontentData &&
                                faqcontentData.length > 0 &&
                                faqcontentData.map((item, index) => {
                                    return (
                                        <Accordion expanded={expanded === `${index + 1}`} onChange={handleChange(`${index + 1}`)}>
                                            <AccordionSummary
                                                expandIcon={expanded==(index + 1) ?<Minus/> :  <Plus /> }
                                                aria-controls={`panel${index + 1}bh-content`}
                                                id={`panel${index + 1}bh-header`}
                                            >
                                                <Typography sx={{ width: '90%', flexShrink: 0 }}>
                                                    {item.mainHeading}
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Typography>
                                                    {
                                                        item.description
                                                    }
                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    )
                                })
                            }


                        </div>
                    </div>
                    <div className="flex_right">
                        <div className='img_block'>
                            <img src={Banner} alt="banner"></img>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </React.Fragment >
    )
}

export default FAQS;