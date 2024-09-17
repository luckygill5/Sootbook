import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Contract from './Contract/Contract';
import Allowances from './Allowances/Allowances';
import Commissions from './Commissions/Commissions';
import StatutoryDeductions from './StatutoryDeductions/StatutoryDeductions';
import Reimbursements from './Reimbursements/Reimbursements';
import { axiosClient } from '../../../services/axiosClient';
import { ReactComponent as DotsIcon } from '../../../assets/images/bullets.svg';
import Pen from '../../../assets/images/pen.svg';
import locales from "../../../Constants/en.json";
import './ContractContent.scss';
import '../../../Components/common/common.component.scss';

function ContractContent({initialEditMode = true }) {
    const [editMode, setEditMode] = useState(true);
    const [value, setValue] = useState(0);
    const [selectLabel, setSelectLabel] = useState('Bio');
    const userid = JSON.parse(localStorage.getItem('profileData'))?.userId;

    const [allowanceInformation, setAllowanceInformation] = useState({});
    const [contractInformation, setContractInformation] = useState({});
    const [commissionInformation, setCommissionInformation] = useState({});
    const [reimbursementInformation, setReimbursementInformation] = useState({});
    const [deductionInformation, setDeductionInformation] = useState({});

    const getAllowanceInfo = async () => {
        let response = await axiosClient.post(
            `admin/allowance/list`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setAllowanceInformation(response.data?.data?.allowance[0] || {});
        }
    };

    const getContractInfo = async () => {
        let response = await axiosClient.post(
            `admin/contract/single`,
            JSON.stringify({ userId: userid }),
        );
        console.log({ response });
        if (response.status === 200) {
            setContractInformation(response.data?.data?.contract || {});
        }
    };

    const getCommissionInfo = async () => {
        let response = await axiosClient.post(
            `admin/commission/list`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setCommissionInformation(response.data?.data?.commission[0] || {});
        }
    };

    const getReimbursementInfo = async () => {
        let response = await axiosClient.post(
            `admin/reimbursement/list`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setReimbursementInformation(response.data?.data?.reimbursement[0] || {});
        }
    };

    const getDeductionInfo = async () => {
        let response = await axiosClient.post(
            `admin/statuary_deduction/list`,
            JSON.stringify({ userId: userid }),
        );
        if (response.status === 200) {
            setDeductionInformation(response.data?.data?.statuaryDeduction[0] || {});
        }
    };

    useEffect(() => {
        getAllowanceInfo();
        getContractInfo();
        getCommissionInfo();
        getDeductionInfo();
        getReimbursementInfo();
    }, []);

    const tabsData = [
        'Contract',
        'Allowances',
        'Commissions',
        'Statutory deductions',
        'Reimbursements'
    ];

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSelectLabel(event.target.innerText);
        setEditMode(true);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role='tabpanel'
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return (
        <div className='contractContent_container'>
            <div className='body_section'>
                <Box sx={{ width: '100%' }} className='tabsBlock'>
                    <Box className='tabsFlexbox'>
                        <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
                            {tabsData &&
                                tabsData.length > 0 &&
                                tabsData.map((item, index) => {
                                    return (
                                        <Tab key={index} label={`${item}`} {...a11yProps(item)} />
                                    );
                                })}
                        </Tabs>
                        {/* <button className='moreBtn'>
                            <DotsIcon />
                        </button> */}
                    </Box>
                    <CustomTabPanel value={value} index={0} className='tabdataBlock'>
                        <Contract
                            mode={editMode}
                            setEditMode={setEditMode}
                            contractInformation={contractInformation}
                            getContractInfo={getContractInfo}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1} className='tabdataBlock'>
                        <Allowances
                            mode={editMode}
                            setEditMode={setEditMode}
                            allowanceInformation={allowanceInformation}
                            getAllowanceInfo={getAllowanceInfo}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2} className='tabdataBlock'>
                        <Commissions
                            mode={editMode}
                            setEditMode={setEditMode}
                            commissionInformation={commissionInformation}
                            getCommissionInfo={getCommissionInfo}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={3} className='tabdataBlock'>
                        <StatutoryDeductions
                            mode={editMode}
                            setEditMode={setEditMode}
                            deductionInformation={deductionInformation}
                            getDeductionInfo={getDeductionInfo}
                        />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={4} className='tabdataBlock'>
                        <Reimbursements
                            mode={editMode}
                            setEditMode={setEditMode}
                            reimbursementInformation={reimbursementInformation}
                            getReimbursementInfo={getReimbursementInfo}
                        />
                    </CustomTabPanel>
                </Box>
            </div>

      

            
        </div>
    );
}

export default ContractContent;
