import React, { useEffect, useState, useCallback } from 'react';
import locales from "../../../Constants/en.json";
import { Input, Select } from '../../../Components/common';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ReactComponent as Info } from "../../../assets/images/info.svg";
import { ReactComponent as PlusSquare } from "../../../assets/images/plus-square.svg"
import Cross from "../../../assets/images/x.svg";
import { useDropzone } from 'react-dropzone';
import "./AddNewProduct.scss"


function UploadProduct() {
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [file, setFile] = useState(null);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [removeFile, setRemoveFile] = useState(false)



    const handleFileChange = (event) => {
        const selectedFiles = event;
        const filePreviews = selectedFiles.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));
        filePreviews.map(item => {
            setUploadedFile([...uploadedFile, item.url])
        })
        setFile(filePreviews);
    };

    let fileCollection = [];
    const onDrop = useCallback((acceptedFiles) => {
            const selectedFiles = acceptedFiles;
        const filePreviews = selectedFiles.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file)
        }));

        filePreviews.map(item => {
            fileCollection.push(item.url)
        })
        console.log("upload2", uploadedFile,  fileCollection)
        setUploadedFile([...uploadedFile, ...fileCollection])
        setFile(filePreviews);
        
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true, // This allows multiple files to be selected
        accept: 'image/*', // This restricts the file type to images (you can adjust this)
    });


    const handleRemoveUpload = (event) => {
        let filtered;
        filtered = uploadedFile.filter((item, index) => {
            if (index !== event) {
                return item
            }
        })
        console.log("filtere", filtered);
        fileCollection = []
        setUploadedFile([...filtered]);
        setRemoveFile(true)

    }

    console.log("render", uploadedFile, fileCollection)


    return (
        <div className='uploadProduct_container'>
            <h5 className='section_title'>Upload Product Image</h5>
            <div className='uploadFlexbox'>
                <div className={`uploadBox ${uploadedFile.length > 0 ? 'uploaded' : ''}`} id="dropzone">
                    {
                        uploadedFile &&
                        uploadedFile.length > 0 &&
                        uploadedFile.map((url, index) => {
                            return (
                                <div className='thumbnail'>
                                    <span className='close' onClick={() => handleRemoveUpload(index)}><img src={Cross} alt="close_icon" className='close_icon'></img></span>
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

                    {/* <Dropzone onDrop={acceptedFiles => handleFileChange(acceptedFiles)}>
                    {({ getRootProps, getInputProps }) => (
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p className='uploadInfo'>
                                    <h5 className='title'>Drop your images here or <span className='blue'>browse</span></h5>
                                    <span className='maxlimit'>Maximum size: 50MB
                                        Maximum quantity of images: 5 </span>
                                </p>
                            </div>
                        </section>
                    )}
                </Dropzone> */}
                </div>
            </div>
        </div>
    )
}

export default UploadProduct;