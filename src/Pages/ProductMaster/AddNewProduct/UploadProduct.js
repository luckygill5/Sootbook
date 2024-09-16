import React, { useEffect, useState, useCallback } from 'react';
import locales from "../../../Constants/en.json";
import { Input, Select } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ReactComponent as Info } from "../../../assets/images/info.svg";
import { ReactComponent as PlusSquare } from "../../../assets/images/plus-square.svg"
import Cross from "../../../assets/images/x.svg";
import { ReactComponent as Alert } from "../../../assets/images/alert-triangle.svg";
import { axiosClient } from '../../../services/axiosClient';
import { useDropzone } from 'react-dropzone';
import SuccessModal from '../../../Components/CommonSuccessModal/SuccessModal';
import ErrorModal from '../../../Components/CommonErrorModal/ErrorModal';
import "./AddNewProduct.scss"


function UploadProduct({ productData, ecommerceData, preview, previewData, changeTab }) {
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [base64, setBase64] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [file, setFile] = useState(null);
    const [uploadAlert, setUploadAlert] = useState(false);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [removeFile, setRemoveFile] = useState(false)
    const [addproductFormData, setAddproductFormData] = useState("")
    const [successModal, setSucessModal] = useState("");
    const [draft, setDraft] = useState("")

    // const handleFileChange = (event) => {
    //     const selectedFiles = event;
    //     const filePreviews = selectedFiles.map(file => ({
    //         name: file.name,
    //         url: URL.createObjectURL(file)
    //     }));
    //     filePreviews.map(item => {
    //         setUploadedFile([...uploadedFile, item.url])
    //     })
    //     setFile(filePreviews);
    // };

    const maxFiles = 5; // Limit the number of files to 3
    let fileCollection = [];
    const onDrop = useCallback((acceptedFiles) => {
        setUploadedFile([]);
        if ((uploadedFile && uploadedFile.length > 0 && acceptedFiles && acceptedFiles.length > 0) && (uploadedFile.length + acceptedFiles.length > maxFiles)) {
            setUploadAlert("Adding an image not more than 5");
        } else if ((uploadedFile && uploadedFile.length == 0 && acceptedFiles && acceptedFiles.length == 0) && uploadAlert == false) {
            setUploadAlert("Adding an image not more than 5");
        }
        else if ((uploadedFile && uploadedFile.length == 0 || uploadedFile.length > 1) && (acceptedFiles && acceptedFiles.length == 0)) {
            setUploadAlert("Adding an image not more than 5");
        }
        else {

            setUploadAlert(false)
            const selectedFiles = acceptedFiles;
            const filePreviews = selectedFiles.map(file => ({
                name: file.name,
                url: URL.createObjectURL(file)
            }));

            filePreviews.map(item => {
                fileCollection.push(item.url)
            })

            setUploadedFile([...uploadedFile, ...fileCollection])
            setFile(filePreviews);
        }


    }, [uploadedFile]);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        maxFiles,
        multiple: true, // This allows multiple files to be selected
        accept: 'image/*', // This restricts the file type to images (you can adjust this)
    });


    const handleRemoveUpload = (event) => {
        if (preview) {
            return false
        } else {
            let filtered;
            let base64Filtered;
            filtered = uploadedFile.filter((item, index) => {
                if (index !== event) {
                    return item
                }
            })
            base64Filtered = base64 && base64.length > 0 && base64.filter((item, index) => {
                if (index !== event) {
                    return item
                }
            })

            fileCollection = []
            setUploadedFile([...filtered]);
            setBase64(base64Filtered)
            setRemoveFile(true)
        }


    }

    var base64Array = [];
    const convertBlobToBase64 = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                base64Array.push(`data:image/png;base64,${base64String}`)
                setBase64(base64Array);
            };

            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error converting blob to base64:', error);
        }
    };

    const handleAddProduct = () => {

        setAddproductFormData("");

        if (uploadedFile.length == 0) {
            setUploadAlert("Please upload at least one image. Adding an image is required to proceed")
        }
        else if (uploadedFile.length > 0) {
            uploadedFile &&
                uploadedFile.length > 0 &&
                uploadedFile.map((item) => {
                    convertBlobToBase64(item);
                })
            let uploadImageData = {
                image: base64 ? base64 : []
            }

            if (uploadImageData) {
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
                        }

                    ]
                }
                const { Sales_Packing_1, Sales_Packing_2, Sales_Packing_3, Quantity_1, Quantity_2, Quantity_3, Rate_1, Rate_2, Rate_3, Stock_1, Stock_2, Stock_3, ...newproductData } = productData;
                const collection = { ...newproductData, ...Packaging, ...ecommerceData, ...uploadImageData, isDraft: false };
                setAddproductFormData(collection);
                addProduct()

            }


        }

    }



    const addProduct = async event => {
        if (addproductFormData !== "") {
            const accessToken = `Bearer ${sessionStorage.accessToken} `
            try {
                let response = await axiosClient.post(
                    `admin/product/create`, addproductFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization': accessToken
                    },


                }

                );

                if (response.status == 200) {
                    // setProductCreateList( response?.data?.data)
                    setSucessModal(true)
                }

            } catch (error) {
                console.log("error", error);
                setErrorModal(true);
                setErrorMsg(error.response.data.message)

            }
        }


    }

    const handleSuccessPopupClose = () => {
        setSucessModal(false)
    }

    const handleModalErrorPopUP = () => {
        setErrorModal(false)
    }


    const handleDraft = () => {
        setDraft(true);
        handleAddProduct()
    }


    useEffect(() => {
        if (previewData && previewData.image) {


            let newCollection = [];
            previewData.image.map((item) => {
                if (item.includes("ata:image/png;base64")) {
                    newCollection.push(`${item}`)
                } else {
                    newCollection.push(`data:image/png;base64,${item}`)
                }

            })

            setUploadedFile(newCollection)

            // This will be the Blob object of the image
        }
    }, [])


    return (
        <React.Fragment>
            <div className={`uploadProduct_container ${preview ? 'preview_active' : ''}`}>
                <h5 className='section_title'>Upload Product Image</h5>
                <div className='uploadFlexbox'>
                    <div className={`uploadBox ${uploadAlert && 'uploadError'} ${uploadedFile.length > 0 ? 'uploaded' : ''}`} id="dropzone">
                        {
                            uploadedFile &&
                            uploadedFile.length > 0 &&
                            uploadedFile.map((url, index) => {
                                return (
                                    <div className='thumbnail'>
                                        <span className='close' onClick={() => { handleRemoveUpload(index) }}><img src={Cross} alt="close_icon" className='close_icon'></img></span>
                                        <img src={url} alt="upload-img" className='upload-img'></img>
                                    </div>
                                )
                            })
                        }

                        {uploadedFile.length == 0 || uploadedFile.length < 5 ? <div {...getRootProps({ className: 'dropzone' })}>
                            <input {...getInputProps()} />
                            <p className='uploadInfo'>
                                {uploadedFile.length > 0 ? <PlusSquare /> :
                                    <React.Fragment>
                                        <h5 className='title'>Drop your images here or <span className='blue'>browse</span></h5>
                                        <span className='maxlimit'>Maximum size: 50MB
                                            Maximum quantity of images: 5 </span>
                                    </React.Fragment>
                                }
                            </p>
                        </div> : null}

                    </div>
                </div>
                {uploadAlert && <div className='errorBox'>
                    <p className='container'>
                        <span className='icon'>
                            <Alert />
                        </span>
                        <span className='text'>
                            {uploadAlert}
                        </span>
                    </p>
                </div>}
                <div className='button_actions'>
                    <button className='saveDraftBtn' type='button' onClick={handleDraft}>Save Draft</button>
                    <div className='action_flexContainer'>
                        <button className='cancelBtn' type='button' onClick={() => changeTab(1)}>Cancel</button>
                        <button className='addProductBtn' onClick={handleAddProduct}>Add Product</button>
                    </div>
                </div>
            </div>
            {
                successModal &&
                <SuccessModal
                    handleSuccessClose={handleSuccessPopupClose}
                    SuccessPopUp={successModal}
                    SuccessMsg="The new product has been added into the system"
                    SuccessTitle="Product has been added successfully"
                />
            }
            {errorModal && (
                <ErrorModal
                    handleErrorClose={handleModalErrorPopUP}
                    ErrorPopUp={errorModal}
                    ErrorMsg={errorMsg}
                />
            )}
        </React.Fragment>
    )
}

export default UploadProduct;