import * as React from 'react';
import locales from "../../Constants/en.json"
import classNames from 'classnames';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./common.component.scss"

const filter = createFilterOptions();


export function AutoComplete({
  label,
  value,
  name,
  onChange,
  isRequired,
  options,
  wrapperClass,
  touched,
  error,
  disabled,
  option
}) {
  const [valueData, setValueData] = React.useState(value);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClear = () => {
    setValueData('');
    let Obj = {
      name: name,
      value: "",
    }
    onChange(Obj)
  }



  const handleOnchange = (event)=> {

    setValueData(event.target.value); 
    onChange(event)
   
  }


  return (
    <React.Fragment>
    <div className={classNames(`inputField autocompleteBox ${option[0].label.includes(value) == false && option[0].id.includes(value) == false  ?  'notMatched' : ""}`, wrapperClass, { "disabled": disabled })}>
      <label>
        {label}
        {isRequired && <em style={{
          color: 'rgb(239, 68, 68)'
        }}>*</em>}
      </label>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={option}
        value={valueData || value}
        selectOnFocus
        clearOnBlur
        renderOption={(props, option, value) => {
          const { key, ...optionProps } = props;
          return (
            <>
              <li key={key} {...optionProps} onClick={() => {
                setValueData(option.label);
                let Obj = {
                  name: name,
                  value: option.id,
                }
                onChange(Obj)
              }}>
                {option.label}
              </li> 
            </>
          );
        }}
        renderInput={(params) => <TextField {...params} value={option.id}  name={name}
          onChange={(props) => { handleOnchange(props) }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {params.InputProps.endAdornment}
                {(
                  <InputAdornment position="end" className='customClear'>
                    <IconButton
                      aria-label="clear input"
                      onClick={handleClear}
                      edge="end"
                    >
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )}
              </>
            ),
          }}
        />}
      />
      <div className='addOption'><span className='addLink' onClick={handleClickOpen}>Add</span><span className='value'>{value}</span></div>
      {touched && error ? <p className="form-error">{error}</p> : null}
    </div>


    <Dialog
        open={open}
        onClose={handleClose}
        className='addOptionModal'
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className='modal_title'>
          {`Add ${name}`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <form className='form_container'>
              <div className='flexbox'>
                
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  className='cancelBtn' onClick={handleClose}>{locales.cancel_label}</Button>
          <Button className='saveBtn' onClick={handleClose} autoFocus>
            {locales.submit_title}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

