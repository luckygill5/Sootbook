import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react'
import constants from "../../Constants/en.json";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './AttributeManagment.scss';

function AttributeManagment() {
    const [selectIndustry, setSelectIndustry] = useState('');
    const [open, setOpen] = useState(false);
    const [attributeFormCount, setAttributeFormCount] = useState([1]);
    const [attributeFirstData, setAttributeFirstData] = useState([]);
    const [attributeSecondData, setAttributeSecondData] = useState([]);
    const handleChange = (event) => {
        setSelectIndustry(event.target.value);
    };

    const handleAttrFirst = (event) => {
           if((event.key) ){
            const modify = attributeFirstData.splice(event.target.name, 1, event.target.value);
            setAttributeFirstData([...attributeFirstData])
        }  

    }

    const handleAttrSecond = (event) => {
        if((event.key) ){
            const modify = attributeSecondData.splice(event.target.name, 1, event.target.value);
            setAttributeSecondData([...attributeSecondData])
        }  

    }

    const handleAttrFormCount = () => {
        let attrfirstset = document.querySelectorAll(".inputfield_attrType");
        let attrSecondSet = document.querySelectorAll(".inputfield_attrVal");
        let validator = false;
        let secondValidator = false
        for(var i=0; i<attrfirstset.length; i++){
            if(Boolean(attrfirstset[i].querySelector(`#inputfield_attrType_${i}`).value) == false){
                validator = true
            }else{
                validator = false
            }

        }

        for(var i=0; i<attrSecondSet.length; i++){
            if(Boolean(attrSecondSet[i].querySelector(`#inputfield_attrVal_${i}`).value) == false){
                secondValidator = true
            }else{
                secondValidator = false
            }

        }
        if(validator == false && secondValidator == false && attributeFirstData.length > 0 && attributeSecondData.length > 0){
        setAttributeFormCount([...attributeFormCount, attributeFormCount.length+1])
        }
        else{
            setOpen(true)
        }
       

    }

    const handleClose = () => {
        setOpen(false)
    }

    const action = (
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      );


    console.log("render--", attributeFirstData, attributeSecondData)
    return (
        <React.Fragment>
        <div className="section_attributeManage">
            <div className='head-block'>
                <h1 className='title'>{constants.Attribute_Manage}</h1>
            </div>
            <div className='data_submit'>
                <form>
                    <FormControl fullWidth className='selectindustry_fieldbox'>
                        <InputLabel id="demo-simple-select-label">{constants.Select_Industry_Title}</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectIndustry}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <div className='submitBtn_box'>
                        <Button variant="contained">Save</Button>
                    </div>
                </form>
            </div>
            <div className='attr_collectionSection'>
                <div className='flexBox'>
                    <div className='form_controlBox'>
                        {
                            attributeFormCount && attributeFormCount.length > 0 && attributeFormCount.map((item , index) => {
                                return (
                                    <div className={`form_controls`} key={index}>
                                        <form>
                                            <TextField className='inputfield_attrType' 
                                            id={`inputfield_attrType_${index}`}
                                            //  onBlur={handleattrType} 
                                            //  value={attributeFirstData[index]}
                                             onKeyUp={handleAttrFirst}  
                                             name={index} label="" variant="outlined" />
                                            <TextField 
                                            className="inputfield_attrVal" 
                                            id={`inputfield_attrVal_${index}`}
                                            onKeyUp={handleAttrSecond} label=""  name={index} variant="outlined" />
                                        </form>
                                    </div>
                                ) 
                            })

                        }

                    </div>
                    <div className='add_more'>
                        <Button variant="contained" onClick={handleAttrFormCount}>+</Button>
                    </div>
                </div>
            </div>
        </div>
        <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Fill the inputs"
        action={action}
      />
       </React.Fragment>
    );
}

export default AttributeManagment;