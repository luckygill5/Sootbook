import React, { useEffect, useState, useCallback } from 'react';
import Cross from "../../assets/images/x.svg";
import { ReactComponent as Alert } from "../../assets/images/alert-triangle.svg";
import { axiosClient } from '../../services/axiosClient';
import { useDropzone } from 'react-dropzone';
import SuccessModal from '../../Components/CommonSuccessModal/SuccessModal';
import ErrorModal from '../../Components/CommonErrorModal/ErrorModal';
import xls from "../../assets/images/xls.png";
import Papa from 'papaparse';
import "./BulkUpload.scss"

function BulkUpload({ breadcrumbUpdateData, updateBreadCrumb, back }) {
    const [breadcrumb, setBreadCrumb] = useState([...breadcrumbUpdateData]);
    const fileTypes = ["JPG", "PNG", "GIF"];
    const [base64, setBase64] = useState('');
    const [errorModal, setErrorModal] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [file, setFile] = useState(null);
    const [uploadAlert, setUploadAlert] = useState(false);
    const [uploadedFile, setUploadedFile] = useState([]);
    const [removeFile, setRemoveFile] = useState(false)
    const [successModal, setSuccessModal] = useState('');
    const [SuccessModalMsg, setSuccessModalMsg] = useState("");
    const [SuccessTitle, setSuccessTitle] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileData, setFileData] = useState([]);


    const disabledUpload =()=>{
      let isDisabled = false;
      if(uploadAlert || uploadedFile.length<1){
        isDisabled = true;
      }  
      return isDisabled;
    }

    const gotoBack = () => {
        back();
    }
    const maxFiles = 1; // Limit the number of files to 1
    let fileCollection = [];
    const onDrop = useCallback((acceptedFiles) => {
        setUploadedFile([]);
        setFileData([]);
        setUploadedFiles([]);
        if ((acceptedFiles[0].type !== "text/csv") && (acceptedFiles[0].type !== "application/vnd.ms-excel")) {
            setUploadAlert("file types supported: .csv, .xlsx");
        }
        else {
            setUploadAlert(false);
            setUploadedFiles(acceptedFiles);
            const selectedFiles = acceptedFiles;
            const filePreviews = selectedFiles.map(file => ({
                name: file.name,
                size: file.size,
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
        multiple: false, // This does not allow multiple files to be selected
        accept: "text/csv", // This restricts the file type to csv (you can adjust this)
    });


    const handleRemoveUpload = (event) => {
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

    var base64Array = [];
    const convertBlobToBase64 = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');
                base64Array.push(`data:image/png;base64,${base64String}`)

            };
            setBase64(base64Array);
            reader.readAsDataURL(blob);
        } catch (error) {
            console.error('Error converting blob to base64:', error);
        }
    };

    useEffect(() => {

        if (uploadedFile &&
            uploadedFile.length > 0) {
            uploadedFile.map((item) => {
                convertBlobToBase64(item);
            })
        }

    }, [uploadedFile])

    const handleSuccessPopupClose = () => {
        setSuccessModal(false);
        setSuccessModalMsg('');
        back();
    }

    const handleModalErrorPopUP = () => {
        setErrorModal(false);
        setErrorMsg('');
    }
    const handleUpload = async () => {
        if (fileData.length > 0) {
            const formData = new FormData();
            formData.append(
                "files",
                uploadedFiles[0],
                uploadedFiles[0].name
            );
            const accessToken = `Bearer ${sessionStorage.accessToken} `
            try {
                let response = await axiosClient.post(
                    `admin/category/importCategoryCsv`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'x-via-device': true,
                            'Authorization': accessToken
                        },
                    }

                );
                if (response.status == 200) {
                    setSuccessModal(true);
                    setSuccessModalMsg(response?.data?.message)

                }

            } catch (error) {
                console.log("error", error);
                setErrorModal(true);
                setErrorMsg(error.response.data.message);
            }
        } else {
            uploadedFiles.forEach((file) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const fileData = reader.result;
                    Papa.parse(fileData, {
                        header: true, // Set to true if your CSV has headers
                        skipEmptyLines: true,
                        complete: (results) => {
                            setFileData(results.data); // Set parsed data to state
                        },
                        error: (error) => {
                            console.error('Error parsing CSV:', error);
                        },
                    });
                };
                reader.readAsText(file);
            });
        }
    }

    const handleClickDownloadTemplate = async () => {
        const accessToken = `Bearer ${sessionStorage.accessToken} `
        try {
            let response = await axiosClient.get(
                `admin/category/exportCategoryCsv`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'x-via-device': true,
                        'Authorization': accessToken
                    },
                }

            );
            if (response.status == 200) {
                const blob = new Blob([response.data], { type: 'application/octet-stream' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'categories.csv';
                a.click();
            }

        } catch (error) {
            console.log("error", error)
        }


    }

    useEffect(() => {
        let removeLastBreadcrumb = breadcrumb.filter((item) => {
            if (item !== 'Bulk Category Creation') {
                return item
            }
        });
        setBreadCrumb([...removeLastBreadcrumb, 'Bulk Category Creation']);
    }, [])

    useEffect(() => {
        updateBreadCrumb(breadcrumb)
    }, [breadcrumb])
    return (
        <React.Fragment>
            <div className='upload_container'>
                <h5 className='section_title'>{fileData.length > 0 ? 'Review Imported Categories' : 'Bulk Category Creation'}</h5>
                <>
                    {fileData.length > 0 ? (
                        <table className='TableSection'>
                            <thead>
                                <tr>
                                    {Object.keys(fileData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {fileData.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map((value, idx) => (
                                            <td key={idx}>{value}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <>
                            <div className='uploadFlexboxZone'>
                                <div className='uploadBoxZone' id="dropzone">
                                    <div {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <p className='uploadInfoZone'>
                                            <React.Fragment>
                                                <h5 className='title'>Click and upload or drag and drop<span className='blue'>Category Template</span></h5>
                                                <span className='maxlimit'>file types supported: .csv, .xlsx</span>
                                            </React.Fragment>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className='uploadFlexbox'>
                                {uploadedFile.length > 0 ? (
                                    <div className='uploadBox' id="dropzone">
                                        {
                                            file &&
                                            file.length > 0 &&
                                            file.map((url, index) => {

                                                return (
                                                    < div className='imageSection'>
                                                        <div className='ImageDetail'>
                                                            <img className='image_icon' src={xls}></img>
                                                            <div className='info_sec'>
                                                            <div className='fileNameInfo'>{url.name}</div>
                                                            <div className='fileSizeInfo' >{url.size} kb</div>
                                                            </div>
                                                        </div>
                                                        <div className='thumbnail'>
                                                            <span className='close' onClick={() => { handleRemoveUpload(index) }}><img src={Cross} alt="close_icon" className='close_icon'></img></span>
                                                        </div>

                                                    </div>

                                                )
                                            })
                                        }
                                    </div>) : 
                                     <div className='DetailSection'>
                                    <ul className='listdetail'>
                                        <li>Download the category template, fill in necessary details for each category.</li>
                                        <li>Upload the completed file.</li>
                                    </ul>
                                </div>
                                }
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
                        </>
                    )}
                </>
                <div className={`button_actions ${fileData.length>0 ? 'tableform': ''}`}>
                    <React.Fragment>
                    {fileData.length === 0 ?
                        (<button className='saveDraftBtn' type='button' onClick={handleClickDownloadTemplate}>Download the Category Template</button>)
                        :("")}
                        <div className='action_flexContainer'>
                            <button className='cancelBtn' type='button' onClick={gotoBack}>Cancel</button>
                            <button className={`addUploadBtn ${
                                disabledUpload()
                                    ? 'disabled': ''
                            } `} disabled={disabledUpload()} onClick={handleUpload}>{fileData.length > 0 ? 'Upload' : 'Review And Upload'}</button>
                        </div>
                    </React.Fragment>


                </div>
            </div>
            {
                successModal &&
                <SuccessModal
                    handleSuccessClose={handleSuccessPopupClose}
                    SuccessPopUp={successModal}
                    SuccessTitle={SuccessModalMsg}
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

export default BulkUpload;