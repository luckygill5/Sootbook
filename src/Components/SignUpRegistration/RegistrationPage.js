import React, { useState, useEffect } from 'react';
import locales from "../../Constants/en.json";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelector, useDispatch } from 'react-redux';
import { FileUploader } from "react-drag-drop-files";
import { Registration } from '../../services/Registration.service';

function RegistrationPage(props) {
    const fileTypes = ["JPG", "PNG", "GIF"];
    const data = useSelector((state) => state);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const [multibranch, setMultiBranch] = useState("");
    const [newdata, setNewData] = useState({
        companyname: "",
        industryselectedData: "",
        companyTypeData: "",
        countryselectedData: "",
        address: "",
        tin: "",
        vat: "",
        employeeNumber: "",
        heardValue: "",
        multibranch: "",
        termscondition: false,
        subscribeNews: false

    })


    const handleChange = (e) => {
        const { name, value, checked } = e.target;
        if (e.target.name == "termscondition" || e.target.name == "subscribeNews") {
            setNewData((prevState) => ({
                ...prevState,
                [name]: checked
            }))

        } else {
            setNewData((prevState) => ({
                ...prevState,
                [name]: value
            }))
        }

    };


    const handlefileChange = (file) => {
        setFile(file);
    };

    const handleRegistration = () => {
        const userid = JSON.parse(localStorage.getItem('profileData')).vendor._id;
        const formData = {
            userid: userid,
            companyname: newdata.companyname,
            industryselectedData: newdata.industryselectedData,
            companyTypeData: newdata.companyTypeData,
            countryselectedData: newdata.countryselectedData,
            address: newdata.address,
            tin: newdata.tin ,
            vat: newdata.vat,
            file: file,
            employeeNumber: newdata.employeeNumber,
            heardValue: newdata.heardValue,
            multibranch: newdata.multibranch,
            subscribeNews: newdata.subscribeNews
        }
        Registration(formData).then((response) => {
            if (response && response.data) {
                window.localStorage.setItem('profileData', JSON.stringify(response.data));
                props.continueSubscription()
            }
        })


    }
    useEffect(() => {
        document.scrollingElement.scrollTop = 0;

    }, [])


    return (
        <React.Fragment>
            <div className='registrationPage_wrapper'>
                <h2 className='title'>{locales.registration_title}</h2>
                <div className='body_container'>
                    <div className='grid_box'>
                        <div className='input_flexBox'>
                            <label className='mandate'>Company Name</label>
                            <input type='text' className='input_text' value={newdata.companyname} name="companyname" onChange={handleChange}></input>
                        </div>
                        <div className='select_flexBox industry_selectBox'>
                            <label className='mandate'>Industry</label>
                            <Select
                                className="industry_select"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newdata.industryselectedData}
                                label="Age"
                                onChange={handleChange}
                                name="industryselectedData"
                            >
                                {
                                    data?.countryIndustrylist?.data?.industry &&
                                    data?.countryIndustrylist?.data?.industry.length > 0 &&
                                    data?.countryIndustrylist?.data?.industry.map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                                        )
                                    })
                                }

                            </Select>
                        </div>
                    </div>
                    <div className='grid_box'>
                        <div className='select_flexBox industry_selectBox'>
                            <label className='mandate'>Company Type</label>
                            <Select
                                className="industry_select"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newdata.companyTypeData}
                                label="Age"
                                onChange={handleChange}
                                name="companyTypeData"
                            >
                                <MenuItem value={"Pharma Chemist"}>Pharma Chemist</MenuItem>
                                <MenuItem value={"Medical"}>Medical</MenuItem>
                                <MenuItem value={"Food Research"}>Food Research</MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div className='grid_box'>
                        <div className='select_flexBox'>
                            <label className='mandate'>Country</label>
                            <Select
                                className="country_select"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={newdata.countryselectedData}
                                label="Age"
                                onChange={handleChange}
                                name="countryselectedData"
                            >
                                {
                                    data?.countryIndustrylist.data &&
                                    data?.countryIndustrylist.data.country &&
                                    data?.countryIndustrylist.data.country.map((item, index) => {
                                        return <MenuItem key={index} name={item.name} value={item._id}>{item.name}</MenuItem>
                                    })
                                }
                            </Select>
                        </div>
                        <div className='input_flexBox'>
                            <label className='mandate'>Address</label>
                            <input type='text' className='input_text' value={newdata.address} name="address" onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className='grid_box'>
                        <div className='input_flexBox'>
                            <label>TIN</label>
                            <input type='text' className='input_text' value={newdata.tin} name="tin" onChange={handleChange}></input>
                        </div>
                        <div className='input_flexBox'>
                            <label>VAT</label>
                            <input type='text' className='input_text' value={newdata.vat} name="vat" onChange={handleChange}></input>
                        </div>
                    </div>
                    <div className='dropbox_container'>
                        <label className='label'>VAT Certification/ Business Licensee</label>
                        <div className='dropBox'>
                            <div className='content'>
                                <span className='up_title'>Drop your files here or <span className='bluehighlight'>browse</span></span>
                                <span className='soft_title'>Maximum size: 50MB</span>
                            </div>
                            <FileUploader maxSize={50} classes="fileUploader" handleChange={handlefileChange} name="file" types={fileTypes} />
                        </div>

                    </div>
                    <div className='grid_box'>
                        <div className='select_flexbox'>
                            <div className='dropdown'>
                                <label className='mandate'>Employee Number</label>
                                <Select
                                    className="country_select"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={newdata.employeeNumber}
                                    label="Age"
                                    onChange={handleChange}
                                    name="employeeNumber"
                                >
                                    <MenuItem value={1 - 10}>1-10</MenuItem>
                                    <MenuItem value={11 - 50}>11-50</MenuItem>
                                    <MenuItem value={51 - 100}>51-100</MenuItem>
                                </Select>
                            </div>
                            <div className='dropdown'>
                                <label className='mandate'>How do you heard about this?</label>
                                <Select
                                    className="country_select"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={newdata.heardValue}
                                    label="Age"
                                    onChange={handleChange}
                                    name="heardValue"
                                >
                                    <MenuItem value={'From friends'}>From friends</MenuItem>
                                    <MenuItem value={"From pharmacies"}>From pharmacies</MenuItem>
                                    <MenuItem value={"Google"}>Google</MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className='bottom_inputOption'>
                        <ul>
                            <li>
                                <FormControl className='switch_radio'>
                                    <FormLabel className='mandate' id="demo-radio-buttons-group-label">Do you have multi branches</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        value={newdata.multibranch}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="Yes" control={<Radio name="multibranch" />} label="Yes" />
                                        <FormControlLabel value="No" control={<Radio name="multibranch" />} label="No" />

                                    </RadioGroup>
                                </FormControl>
                            </li>
                            <li>
                                <FormGroup className='checkBox_block'>
                                    <FormControlLabel control={<Checkbox checked={newdata.termscondition} name="termscondition" onChange={handleChange} />} label="By creating the account you agree terms and conditions" />
                                </FormGroup>
                            </li>
                            <li>
                                <FormGroup className='checkBox_block'>
                                    <FormControlLabel control={<Checkbox checked={newdata.subscribeNews} name="subscribeNews" onChange={handleChange} />} label="Subscribe me to the newsletter" />
                                </FormGroup>
                            </li>
                        </ul>
                    </div>
                    <div className='action'>
                        <button className='next_btn'
                            disabled={
                                (newdata.companyname !== "" &&
                                    newdata.industryselectedData !== "" &&
                                    newdata.companyTypeData !== "" &&
                                    newdata.countryselectedData !== "" &&
                                    newdata.address !== "" &&
                                    newdata.tin !== "" &&
                                    newdata.vat !== "" &&
                                    newdata.termscondition !== false &&
                                    newdata.employeeNumber !== "" &&
                                    newdata.heardValue !== "" &&
                                    newdata.multibranch !== "") ? false : true
                            }
                            onClick={() => handleRegistration()}>{locales.continue_to_subscription}</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default RegistrationPage