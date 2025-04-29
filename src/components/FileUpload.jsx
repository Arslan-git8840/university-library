"use client";
import React, { useEffect, useRef, useState } from "react";
import { IKImage, ImageKitProvider, IKUpload, IKVideo } from "imagekitio-next";
import { Button } from "./ui/button";
import Image from "next/image";

const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;
const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

const authenticator = async () => {
    try {
        const response = await fetch("https://university-library-tan.vercel.app/api/auth"); // for development http://localhost:3000/api/auth and for production https://university-library.vercel.app/api/auth

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};


function FileUpload({ accept, folder, placeholder, type, onFileUpload, backGroundColor }) {

    const [isUploading, setIsUploading] = useState(false);
    console.log("Public Key:", publicKey);
    console.log("URL Endpoint:", urlEndpoint);
    const [file, setFile] = useState(null);
    const ikUploadRefTest = useRef(null);

    const onError = (err) => {
        setIsUploading(false);
        console.log("Error", err);
    };

    const onSuccess = (res) => {
        setIsUploading(false);
        setFile(res);
        onFileUpload(res.filePath); // Send the filePath to the parent
        console.log("Success", res);
    };

    const onUploadProgress = (progress) => {
        console.log("Progress", progress);
    };

    const onUploadStart = (evt) => {
        setIsUploading(true);
        console.log("Start", evt);
    };

    const onValidate = (file) => {
        if (type === "image" && file.size > 20 * 1024 * 1024) {
            console.error("File size too large. Please upload a file that is less than 20MB.");
            return false;
        }
        if (type === "video" && file.size > 50 * 1024 * 1024) {
            console.error("File size too large. Please upload a file that is less than 50MB.");
            return false;
        }
        return true; // Validation passes
    };



    useEffect(() => {
        console.log(file)
    }, [file]);
    const handleButtonClick = (event) => {
        event.preventDefault(); // Prevent the form from submitting
        ikUploadRefTest.current.click(); // Trigger the file upload dialog
    };
    return (
        <div className="App">
            <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
                <IKUpload
                    useUniqueFileName={true}
                    validateFile={onValidate}
                    folder={folder}
                    accept={accept}
                    onError={onError}
                    onSuccess={onSuccess}
                    onUploadProgress={onUploadProgress}
                    onUploadStart={onUploadStart}
                    style={{ display: 'none' }} // hide the default input and use the custom upload button
                    ref={ikUploadRefTest}
                />
                {ikUploadRefTest && <Button className={`${backGroundColor} text-center w-full text-lg font-bebasNeue mb-4`} onClick={handleButtonClick} disabled={isUploading}>
                    {isUploading ? (
                        <>
                            <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-white border-opacity-50"></span>
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Image
                                src="/icons/upload.svg"
                                alt="upload-icon"
                                width={20}
                                height={20}
                                className="object-contain"
                            />
                            {placeholder}
                        </>
                    )}</Button>}
                {file && <p className="text-white text-center text-sm bg-amber-800 p-2 rounded-lg mb-4">{file?.filePath}</p>}
                {file &&
                    (type === "image" ? (
                        <IKImage
                            alt={file.filePath}
                            path={file.filePath}
                            width={1000}
                            height={1000}
                        />
                    ) : type === "video" ? (
                        <IKVideo
                            path={file.filePath}
                            controls={true}
                            className="h-96 w-full rounded-xl"
                        />
                    ) : null)}
            </ImageKitProvider>

        </div>
    );
}

export default FileUpload;
