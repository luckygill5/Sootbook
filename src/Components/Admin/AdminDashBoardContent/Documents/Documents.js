import React, {useState,useEffect} from 'react';
import Pen from "../../../../assets/images/pen.svg";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import locales from "../../../../Constants/en.json";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ReactComponent as Arrow } from "../../../../assets/images/chevron-down.svg";
import { FileUploader } from "react-drag-drop-files";
import './Documents.scss'

function Documents(props){
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        Search :'',
        DocName:'',
        DocType : "",
        DocID:'',
        DocExpire:""
    })

    const handlefileChange = (file) => {
        
        setFile(file);
    };

    const handleChange = (e) => {
       
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    const handleSubmit = () => {
        setEditMode(false)
    }

    const handleEdit = () => {
        setEditMode(true)
    }
    return (
        <div className='documents_container'>
              {editMode ? null : (<div className='header_flex'>
                    <h5 className='title'>Documents</h5>
                    <button className='edit_btn' onClick={() => handleEdit()}>
                        <span className='icon'>
                            <img src={Pen} alt="edit"></img>
                        </span>
                        {locales.edit_title}
                    </button>
                </div>)}
    {
               editMode ? (
                <div className='search_fieldbox'>
                    <input type='text' className='search_input' placeholder='Search Preline' value={formData.Search} name="Search" onChange={(event) => handleChange(event)}></input>
                </div>
               ) : null 
            }
            <div className='table_section'>
                <div className='table_container'>
                <div className='table_head'>
                    <div className='row col-4'>
                        <div className='thead'>
                            <span className='text'>Title</span>
                            <div className='sort'>
                                <span className='up_icon'>
                                    <Arrow/>
                                </span>
                                <span className='down_icon'>
                                <Arrow/>
                                </span>
                            </div>
                        </div>
                        <div className='thead'>
                        <span className='text'>Amount</span>
                            <div className='sort'>
                                <span className='up_icon'>
                                    <Arrow/>
                                </span>
                                <span className='down_icon'>
                                <Arrow/>
                                </span>
                            </div>
                        </div>
                        <div className='thead'>
                        <span className='text'>Allowance Option</span>
                            <div className='sort'>
                                <span className='up_icon'>
                                    <Arrow/>
                                </span>
                                <span className='down_icon'>
                                <Arrow/>
                                </span>
                            </div>
                        </div>
                        <div className='thead'>
                        <span className='text'>Amount Option</span>
                            <div className='sort'>
                                <span className='up_icon'>
                                    <Arrow/>
                                </span>
                                <span className='down_icon'>
                                <Arrow/>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='table_body'>
                    <div className='no_record'>
                    No records available
                    </div>
                </div>
                </div>
                <div className='pagination_container'>
                    <div className='navigation'>
                        <ul className='count_list'>
                            <li>
                                <span className='arrow_prev'><Arrow/></span>
                            </li>
                            <li>
                            <span className='count selected'>1</span>
                            </li>
                            <li>
                            <span className='count'>2</span>
                            </li>
                            <li>
                            <span className='count'>3</span>
                            </li>
                            <li>
                            <span className='count'>...</span>
                            </li>
                            <li>
                                <span className='count'>10</span>
                            </li>
                            <li>
                            <span className='arrow_next'><Arrow/></span>
                            </li>
                        </ul>
                        <Select
                                    className="select_pageBox"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={countryselectedData}
                                    label="Age"
                                //  onChange={handleChange}
                                >
                                    <MenuItem name="Single" value="Startup">5 page</MenuItem>
                                    <MenuItem name="Married" value="Startup">10 page</MenuItem>
                                </Select>
                    </div>
                    <div className='gotopage'>
                        <span className='label'>Go to</span>
                        <input className='gotoInput' type='text'></input>
                        <span className='label'>page</span>
                    </div>
                </div>
            </div>
            {
                editMode ? (
                    <div className='form_container'>
                        <h5 className='title'>Add New Document </h5>
                        <div className='input_flexbox col-2'>
                        <div className='input_box'>
                                <label className='mandate'>Document Name</label>
                                <input type='text' className='input_element' placeholder='Title' value={formData.DocName} name="DocName" onChange={(event) => handleChange(event)}></input>
                            </div>
                            <div className='input_box'>
                                <label className='mandate'>Document Type</label>
                                <input type='text' className='input_element' placeholder='Title' value={formData.DocType} name="DocType" onChange={(event) => handleChange(event)}></input>
                            </div>
                        </div>
                        <div className='uplaod_container'>
                        <label className='mandate'>Document File</label>
                        <div className='uploadBox'>
                            <button className='uploadBtn'>Choose file
                            <FileUploader maxSize={50} classes="fileUploader" handleChange={handlefileChange} name="file" types={fileTypes} />
                            </button>
                            <div className='filename'>{file && file.name ? `${file.name}` : `No file chosen`}</div>
                            </div>
                        </div>
                        
                            <div className='input_flexbox col-2'>
                        <div className='input_box'>
                                <label className='mandate'>Document ID</label>
                                <input type='text' className='input_element' placeholder='Title' value={formData.DocId} name="DocId" onChange={(event) => handleChange(event)}></input>
                            </div>
                            <div className='input_box'>
                                <label className='mandate'>Document Expires on</label>
                                <input type='text' className='input_element' placeholder='Title' value={formData.DocExpire} name="DocExpire" onChange={(event) => handleChange(event)}></input>
                            </div>
                        </div>
                        <div className='button-container'>
                                <button className='saveBtn' onClick={() => handleSubmit()}>Save</button>
                            </div>
                    </div>
                ) : null
            }
        </div>
    )
}

export default Documents;