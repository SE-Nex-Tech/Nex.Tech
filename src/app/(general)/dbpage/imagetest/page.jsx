"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";


const ImageTest = () => {

    // State to store the file
    const [file, setFile] = useState([]);

    // State to store the base64
    const [base64, setBase64] = useState([]);

    // When the file is selected, set the file state
    const onFileChange = (e) => {
        if (!e.target.files) {
            return;
        }

        setFile(e.target.files[0]);
    };

    // On click, clear the input value
    const onClick = (e) => {
        e.currentTarget.value = "";
    };

    // On submit, upload the file
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            return;
        }

        // Convert the file to base64
        const base64 = await toBase64(file);

        setBase64(base64);
        console.log(base64);

          // You can upload the base64 to your server here
          await fetch("/api/your-upload-endpoint", {
            method: "POST",
            body: JSON.stringify({ base64 }),
            headers: {
              "Content-Type": "application/json",
            },
          });

        // Clear the states after upload
        //   setFile(null);
        //   setBase64(null);
    };

    // Convert a file to base64 string
    const toBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <>
            <h1>Upload Image</h1>
            <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={onFileChange}
                    onClick={onClick}
                />
                <button type="submit">Upload</button>
            </form>
            {base64 && (
                <Image src={base64} width={500} height={500} alt="Uploaded Image" />
            )}
        </>
    );
};



export default ImageTest;
