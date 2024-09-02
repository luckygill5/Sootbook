import React, { useState } from 'react';
import locales from '../../Constants/en.json';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Purchase } from '../../services/purchase.service';
import CheckCircle from '../../assets/images/check-circle-blue.svg';
import { Link, useNavigate } from 'react-router-dom';
import { DatePicker } from '../common/';

function PaymentMethodPage(props) {
    const [paymentOption, setPaymentOption] = useState('');
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        nameCard: '',
        cardNumber: '',
        expiryDate: '',
        securityCode: '',
    });
    const navigate = useNavigate();
    const amount = props.paymentvalue;

    const handlePayment = () => {
        const userid = JSON.parse(localStorage.getItem('profileData')).userId;
        const data = {
            userId: userid,
            amount: amount,
        };
        Purchase(data).then(response => {
            if (response && response.status == true) {
                setSuccess(true);
            }
        });
    };

    const handlePaymentOption = e => {
        setPaymentOption(e.target.value);
    };

    const handleChange = e => {
        if (e?.target) {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        } else {
            const { name, value } = e;
            setFormData(prevState => ({
                ...prevState,
                [name]: value,
            }));
        }
    };

    return (
        <React.Fragment>
            <div className='paymentMethodPage_wrapper'>
                <h2 className='title'>{locales.payment_method_title}</h2>
                <div className='body_container'>
                    <FormControl className='paymentModes'>
                        {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
                        <RadioGroup
                            aria-labelledby='demo-radio-buttons-group-label'
                            defaultValue='female'
                            name='radio-buttons-group'
                        >
                            <FormControlLabel
                                className='bank_transfer'
                                value='Bank transfer'
                                control={<Radio onChange={handlePaymentOption} />}
                                label='Bank transfer '
                            />
                            <FormControlLabel
                                className='pay_pal'
                                value='PayPal'
                                control={<Radio onChange={handlePaymentOption} />}
                                label='PayPal'
                            />
                            <FormControlLabel
                                className='credit_debit'
                                value='Credit/Debit card'
                                control={<Radio onChange={handlePaymentOption} />}
                                label='Credit/Debit card'
                            />
                        </RadioGroup>
                    </FormControl>
                    <div className='form_container'>
                        <div className='inputField name_cardBox'>
                            <label className='mandate'>Name on card (As written on card)</label>
                            <input
                                type='text'
                                placeholder='NAME SURNAME'
                                className='input_text'
                                value={formData.nameCard}
                                name='nameCard'
                                onChange={event => handleChange(event)}
                            ></input>
                        </div>
                        <div className='inputField card_number_box'>
                            <label className='mandate'>Card number</label>
                            <input
                                type='text'
                                placeholder='xxxx-xxxx-xxxx-xxxx'
                                maxLength={16}
                                className='input_text'
                                value={formData.cardNumber}
                                name='cardNumber'
                                onChange={event => handleChange(event)}
                            ></input>
                        </div>
                        <div className='inputField grid_box'>
                            <div className='flex_item'>
                                <DatePicker
                                    label={'Expiry date'}
                                    wrapperClass={`expiryDate`}
                                    isRequired
                                    name={"expiryDate"}
                                    dateFormat={'MM/YYYY'}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='flex_item cvv_code'>
                                <label className='mandate'>Security code</label>
                                <input
                                    type='password'
                                    placeholder='CCV'
                                    maxLength={3}
                                    className='input_text'
                                    value={formData.securityCode}
                                    name='securityCode'
                                    onChange={event => handleChange(event)}
                                ></input>
                                <span className='info_icon'></span>
                            </div>
                        </div>
                        <div className='action'>
                            <button
                                className='pay_btn'
                                disabled={
                                    formData.cardNumber !== '' &&
                                    formData.expiryDate !== '' &&
                                    formData.nameCard !== '' &&
                                    formData.securityCode !== '' &&
                                    paymentOption !== ''
                                        ? false
                                        : true
                                }
                                onClick={handlePayment}
                            >
                                {locales.pay_now}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {success && (
                <div className='success_page_container'>
                    <div className='successmodal'>
                        <div className='check_icon'>
                            <img src={CheckCircle} alt='check' className='icon'></img>
                        </div>
                        <h5 className='title'>{locales.congratulations_title}</h5>
                        <p className='info'>
                            {locales.success_info.replace('admin2000@gmail.com', `${email}`)}
                        </p>
                        <button className='dashBtn' onClick={() => navigate('/SignIn')}>
                            {locales.go_dashboard}
                        </button>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default PaymentMethodPage;
