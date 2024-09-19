import React, { useState, useEffect } from 'react';
import locales from "../../Constants/en.json";
import { ReactComponent as Trash } from "../../assets/images/trash-2.svg";
import { ReactComponent as Pencil } from "../../assets/images/pencil.svg";
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as UpDown } from "../../assets/images/chevrons-up-down.svg";
import Copy from "../../assets/images/copy.svg"
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import "./ProductMaster.scss"

function DraftList({ draftData }) {
    const [tableBodyData, setTableBodyData] = useState("");
    const [draftListCheck, setDraftListCheck] = useState([]);
    const [headerDraftCheck, setHeaderDraftCheck] = useState("");
    const draftTableHeader = ["Draft Name", "Last Modifies", "Actions"];

    function formatDate(dateString) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Create a new Date object from the string
        const date = new Date(dateString);

        // Extract day, month, year, and time components
        const day = String(date.getUTCDate()).padStart(2, '0'); // Get the day
        const month = months[date.getUTCMonth()];               // Get the month abbreviation
        const year = date.getUTCFullYear();                     // Get the year
        const hours = String(date.getUTCHours()).padStart(2, '0'); // Get hours (UTC)
        const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Get minutes (UTC)

        // Format the string as desired
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    }

    const handleChangeAll = () => {
        if (draftListCheck.length == draftData.length) {
            setDraftListCheck([])
            setHeaderDraftCheck(false)
        } else {
            let allselect = [];
            draftData &&
                draftData.length > 0 &&
                draftData.map((item, index) => {
                    allselect.push(index)
                })
            setDraftListCheck(allselect);
            setHeaderDraftCheck(true)
        }

    }


    const handlecheckClick = (event) => {

        if (draftListCheck.includes(event)) {
            let filterCheck;
            filterCheck = draftListCheck.filter(item => {
                return item !== event
            })

            if (filterCheck.length == 0) {
                setHeaderDraftCheck(false)
            }
            setDraftListCheck(filterCheck)
        }

        else {
            setDraftListCheck([...draftListCheck, event])
        }

    }

    return (
        <div className='draftList_container'>
            {draftData &&
                draftData.length > 0 ? <div className='draftTable'>
                <div className='tableHead'>
                    <div className='row'>
                        {
                            draftData &&
                            draftData.length > 0 && <div className='tabCheckBox'>
                                <Checkbox checked={headerDraftCheck ? true : false} onChange={() => handleChangeAll()} />
                            </div>
                        }
                        {
                            draftTableHeader &&
                            draftTableHeader.length > 0 &&
                            draftTableHeader.map((data, index) => {
                                return (
                                    <React.Fragment>

                                        <div key={index} className='thead'>
                                            <span className='text'>{data}</span>
                                            <span className='sort'><UpDown /></span>
                                        </div>
                                    </React.Fragment>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='tableBody'>

                    {
                        draftData &&
                        draftData.length > 0 &&
                        draftData.map((item, index) => {

                            return <div key={index} className='row'>

                                {
                                    <div className={`tabCheckBox ${draftListCheck.includes(index) ? 'checked' : ''}`}>
                                        <Checkbox checked={draftListCheck.includes(index) ? true : false} onChange={() => handlecheckClick(index)} />
                                    </div>
                                }
                                {
                                    Object.entries(item).map((data, index) => {
                                        if (data[0] == "name") {
                                            return (
                                                <div className='tabCell'>
                                                    <span className='text'>{data[1]}</span>
                                                    <span className='copy'>
                                                        <img src={Copy} alt="copyIcon" className='icon'></img>
                                                    </span>
                                                </div>
                                            )
                                        }
                                        else if (data[0] == "updatedAt") {
                                            return (

                                                <div className='tabCell'>
                                                    <span className='text'>{formatDate(data[1])}</span>

                                                </div>
                                            )
                                        }




                                    })
                                }
                                <div className='actionCell'>
                                    <span className='edit'>Edit</span>
                                    <span className='delete'>Delete</span>
                                </div>
                            </div>



                        })
                    }

                </div>
            </div> : <Box className="loader_container" sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
        </div>
    )
}

export default DraftList;