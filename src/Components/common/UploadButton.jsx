import React, { useState } from 'react';
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader"

// Initialize once (at the start of your app).
const uploader = Uploader({
    apiKey: "free" // Get production API keys from Bytescale
  });

  
const options = {
    maxFileCount: 1,
    styles: {
        colors: {
            primary: "#377dff"
        }
    }
}


export const MyUploadButton = ({ setFiles }) => {
    return (
        <UploadButton
            uploader={uploader}
            options={options}
            onComplete={setFiles}>
            {({ onClick }) =>
                <button className='fileUploader' onClick={onClick}>
                    Upload a file...
                </button>
            }
        </UploadButton>
    )

}
