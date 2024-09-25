import React, { useEffect, useState, useCallback } from 'react';
import locales from '../../../Constants/en.json';
import { Input, Select } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ReactComponent as Info } from '../../../assets/images/info.svg';
import { ReactComponent as PlusSquare } from '../../../assets/images/plus-square.svg';
import Cross from '../../../assets/images/x.svg';
import { ReactComponent as Alert } from '../../../assets/images/alert-triangle.svg';
import { axiosClient } from '../../../services/axiosClient';
import { useDropzone } from 'react-dropzone';
import SuccessModal from '../../../Components/CommonSuccessModal/SuccessModal';
import ErrorModal from '../../../Components/CommonErrorModal/ErrorModal';
import './AddNewProduct.scss';

function UploadProduct({ productData, ecommerceData, preview, previewData, changeTab, successModalClose, EditMode, draftPopUpClose }) {
    const fileTypes = ['JPG', 'PNG', 'GIF'];
    const [base64, setBase64] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [updateClicked, SetUpdateClicked] = useState(false);
    const [file, setFile] = useState(null);
    const [uploadAlert, setUploadAlert] = useState(false);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [removeFile, setRemoveFile] = useState(false)
    const [addproductFormData, setAddproductFormData] = useState("")
    const [successModal, setSucessModal] = useState("");
    const [ecommerceDataState, setEcommerceDataState] = useState("")
    const [packagingData, setPackagingData] = useState("");
    const [uploadImageState, setUploadImageState] = useState('');
    const [SuccessMsg, setSuccessMsg] = useState('');
    const [SuccessTitle, setSuccessTitle] = useState('');
    const [productAddAPIcall, setProductAddAPIcall] = useState(false);
    const [draftClicked, setDraftClicked] = useState(false);
    const [draftsuccessModal, setDraftSuccessModal] = useState(false);
    const [draftButtonClick, setDraftButtonClick] = useState(false);

    const maxFiles = 5; // Limit the number of files to 3
    let fileCollection = [];
    const onDrop = useCallback(
        acceptedFiles => {
            setUploadedFile([]);
            if (
                uploadedFile &&
                uploadedFile.length > 0 &&
                acceptedFiles &&
                acceptedFiles.length > 0 &&
                uploadedFile.length + acceptedFiles.length > maxFiles
            ) {
                setUploadAlert('Adding an image not more than 5');
            } else if (uploadedFile && uploadedFile.length == 0 && acceptedFiles && acceptedFiles.length == 0 && uploadAlert == false) {
                setUploadAlert('Adding an image not more than 5');
            } else if (((uploadedFile && uploadedFile.length == 0) || uploadedFile.length > 1) && acceptedFiles && acceptedFiles.length == 0) {
                setUploadAlert('Adding an image not more than 5');
            } else {
                setUploadAlert(false);
                const selectedFiles = acceptedFiles;
                const filePreviews = selectedFiles.map(file => ({
                    name: file.name,
                    url: URL.createObjectURL(file),
                }));

                filePreviews.map(item => {
                    fileCollection.push(item.url);
                });

                setUploadedFile([...uploadedFile, ...fileCollection]);
                setFile(filePreviews);
            }
        },
        [uploadedFile],
    );

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles,
        multiple: true, // This allows multiple files to be selected
        accept: 'image/*', // This restricts the file type to images (you can adjust this)
    });

    const handleRemoveUpload = event => {
        if (preview) {
            return false;
        } else {
            let filtered;
            let base64Filtered;
            filtered = uploadedFile.filter((item, index) => {
                if (index !== event) {
                    return item;
                }
            });
            base64Filtered =
                base64 &&
                base64.length > 0 &&
                base64.filter((item, index) => {
                    if (index !== event) {
                        return item;
                    }
                });

            fileCollection = [];
            setUploadedFile([...filtered]);
            setBase64(base64Filtered);
            setRemoveFile(true);
        }
    };

    var base64Array = [];
    const convertBlobToBase64 = async url => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                base64Array.push(`data:image/png;base64,${base64String}`);
            };
            setBase64(base64Array);
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error converting blob to base64:', error);
        }
    };

    useEffect(() => {
        if (uploadedFile && uploadedFile.length > 0) {
            uploadedFile.map(item => {
                convertBlobToBase64(item);
            });
        }
    }, [uploadedFile]);

    const handleAddProduct = () => {
        // setAddproductFormData("");

        if (uploadedFile && uploadedFile.length == 0) {
            setUploadAlert('Please upload at least one image. Adding an image is required to proceed');
        } else if (uploadedFile && uploadedFile.length > 0 && base64 && base64.length > 0) {
            let uploadImageData = {
                image: base64,
            };

            if (uploadImageData && uploadImageData.image.length > 0 && productData) {
                const Packaging = {
                    packaging: [
                        {
                            packType: productData.Sales_Packing_1,
                            quantity: productData.Quantity_1,
                            price: productData.Rate_1,
                            stock: productData.Stock_1,
                        },
                        {
                            packType: productData.Sales_Packing_2,
                            quantity: productData.Quantity_2,
                            price: productData.Rate_2,
                            stock: productData.Stock_2,
                        },
                        {
                            packType: productData.Sales_Packing_3,
                            quantity: productData.Quantity_3,
                            price: productData.Rate_3,
                            stock: productData.Stock_3,
                        },
                    ],
                };
                let collection;
                if (EditMode) {
                    delete productData.Sales_Packing_1;
                    delete productData.Sales_Packing_2;
                    delete productData.Sales_Packing_3;
                    delete productData.Quantity_1;
                    delete productData.Quantity_2;
                    delete productData.Quantity_3;
                    delete productData.Rate_1;
                    delete productData.Rate_2;
                    delete productData.Rate_3;
                    delete productData.Stock_1;
                    delete productData.Stock_2;
                    delete productData.Stock_3;
                    delete ecommerceData.image;
                    delete ecommerceData.packaging;
                    setPackagingData({...Packaging});
                    setUploadImageState({...uploadImageData})
                    setAddproductFormData({...productData})
                    setEcommerceDataState({...ecommerceData})

                    if (draftClicked && draftButtonClick == false) {
                        setDraftButtonClick(true);
                        collection = { ...newproductData, ...Packaging, ...ecommerceData, ...uploadImageData, isDraft: true };
                    } else {
                        collection = { ...newproductData, ...Packaging, ...ecommerceData, ...uploadImageData, isDraft: false };
                    }

                    setAddproductFormData(collection);
                }
            }
        }
    };

    useEffect(() => {
        if(EditMode && updateClicked){
            console.log("addproduct", addproductFormData)
            handleEditProduct({...addproductFormData, ...ecommerceDataState, ...packagingData, ...uploadImageState, isDraft: false });
        }else{
            addProduct()
        }
    }, [addproductFormData, ecommerceDataState, packagingData, uploadImageState]);

    const addProduct = async event => {
        if (addproductFormData !== '' && productAddAPIcall == false) {
            setProductAddAPIcall(true);
            const accessToken = `Bearer ${sessionStorage.accessToken} `;
            try {
                let response = await axiosClient.post(`admin/product/create`, addproductFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        Authorization: accessToken,
                    },
                });

                if (response.status == 200) {
                    // setProductCreateList( response?.data?.data)
                    setSucessModal(true);
                    setSuccessMsg('The new product has been added into the system');
                    setSuccessTitle('Product has been added successfully');
                    setProductAddAPIcall(false);
                    if (draftClicked) {
                        setDraftClicked(false);
                        setDraftSuccessModal(true);
                        setSuccessTitle('Draft saved successfull');
                        setSuccessMsg('');
                    }
                    if (draftButtonClick == true) {
                        setDraftButtonClick(false);
                    }
                }
            } catch (error) {
                console.log('error', error);
                setErrorModal(true);
                setErrorMsg(error.response.data.message);
            }
        }
    };

    const handleSuccessPopupClose = () => {
        setSucessModal(false);
        successModalClose();
    };

    const handleModalErrorPopUP = () => {
        setErrorModal(false);
    };

    const handleDraft = () => {
        if(uploadedFile && uploadedFile.length > 0){
            setDraftClicked(true) 
        }else if(uploadedFile && uploadedFile.length == 0){
            setUploadAlert("Please upload at least one image. Adding an image is required to proceed")
        }
    };

    const handleUpdateProduct = () => {
        handleAddProduct();
        SetUpdateClicked(true);
    };


    

    const handleEditProduct = async (event) => {

        if (event !== "") {
            const accessToken = `Bearer ${sessionStorage.accessToken} `
            try {
                let response = await axiosClient.post(
                    `admin/product/update`, event, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        Authorization: accessToken,
                    },
                });

                if (response.status == 200) {
                    // setProductCreateList( response?.data?.data)
                    setSucessModal(true);
                    SetUpdateClicked(false);
                    setAddproductFormData('');
                    setEcommerceDataState('');
                    setUploadImageState('');
                    setPackagingData('');
                    setSuccessMsg('The product has been updated into the system');
                    setSuccessTitle('Product has been updated successfully');
                }
            } catch (error) {
                console.log('error', error);
                setErrorModal(true);
                setErrorMsg(error.response.data.message);
                setAddproductFormData('');
                setEcommerceDataState('');
                setUploadImageState('');
                setPackagingData('');
            }
        }
    };

    useEffect(() => {
        if (previewData && previewData.image) {
            let newCollection = [];
            previewData.image.map(item => {
                if (item.includes('data:image/png;base64')) {
                    newCollection.push(`${item}`);
                } else {
                    newCollection.push(`data:image/png;base64,${item}`);
                }
            });

            setUploadedFile(newCollection);

            // This will be the Blob object of the image
        }
    }, []);

    useEffect(() => {
        if (draftClicked) {
            handleAddProduct();
        }
    }, [draftClicked]);

    const handleDraftSuccessPopupClose = () => {
        draftPopUpClose();
    };

    return (
        <React.Fragment>
            <div className={`uploadProduct_container ${preview ? 'preview_active' : ''}`}>
                <h5 className='section_title'>Upload Product Image</h5>
                <div className='uploadFlexbox'>
                    <div className={`uploadBox ${uploadAlert && 'uploadError'} ${uploadedFile.length > 0 ? 'uploaded' : ''}`} id='dropzone'>
                        {uploadedFile &&
                            uploadedFile.length > 0 &&
                            uploadedFile.map((url, index) => {
                                return (
                                    <div className='thumbnail'>
                                        <span
                                            className='close'
                                            onClick={() => {
                                                handleRemoveUpload(index);
                                            }}
                                        >
                                            <img src={Cross} alt='close_icon' className='close_icon'></img>
                                        </span>
                                        <img src={url} alt='upload-img' className='upload-img'></img>
                                    </div>
                                );
                            })}

                        {uploadedFile.length == 0 || uploadedFile.length < 5 ? (
                            <div {...getRootProps({ className: 'dropzone' })}>
                                <input {...getInputProps()} />
                                <p className='uploadInfo'>
                                    {uploadedFile.length > 0 ? (
                                        <PlusSquare />
                                    ) : (
                                        <React.Fragment>
                                            <h5 className='title'>
                                                Drop your images here or <span className='blue'>browse</span>
                                            </h5>
                                            <span className='maxlimit'>Maximum size: 50MB Maximum quantity of images: 5 </span>
                                        </React.Fragment>
                                    )}
                                </p>
                            </div>
                        ) : null}
                    </div>
                </div>
                {uploadAlert && (
                    <div className='errorBox'>
                        <p className='container'>
                            <span className='icon'>
                                <Alert />
                            </span>
                            <span className='text'>{uploadAlert}</span>
                        </p>
                    </div>
                )}
                <div className='button_actions'>
                    {preview ? null : (
                        <React.Fragment>
                            <button className='saveDraftBtn' type='button' onClick={handleDraft}>
                                Save Draft
                            </button>
                            <div className='action_flexContainer'>
                                <button className='cancelBtn' type='button' onClick={() => changeTab(1)}>
                                    Back
                                </button>
                                <button
                                    className='addProductBtn'
                                    onClick={() => {
                                        if (EditMode) {
                                            handleUpdateProduct();
                                        } else {
                                            handleAddProduct();
                                        }
                                    }}
                                >{`${EditMode ? 'Update' : `Add Product`}`}</button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
            {successModal && (
                <SuccessModal
                    handleSuccessClose={handleSuccessPopupClose}
                    SuccessPopUp={successModal}
                    SuccessMsg={SuccessMsg}
                    SuccessTitle={SuccessTitle}
                />
            )}
            {errorModal && <ErrorModal handleErrorClose={handleModalErrorPopUP} ErrorPopUp={errorModal} ErrorMsg={errorMsg} />}
            {draftsuccessModal && (
                <SuccessModal
                    handleSuccessClose={handleDraftSuccessPopupClose}
                    SuccessPopUp={draftsuccessModal}
                    SuccessMsg={SuccessMsg}
                    SuccessTitle={SuccessTitle}
                />
            )}
        </React.Fragment>
    );

}

export default UploadProduct;
