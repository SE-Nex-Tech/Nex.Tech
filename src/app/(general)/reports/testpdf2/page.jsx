"use client";

import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import styles from "./page.module.scss";

const GeneratePDF = () => {

    const pdfRef = useRef(null);

    const generatePDF = async () => {
        const content = pdfRef.current;

        const doc = new jsPDF();
        doc.html(content, {
            callback: function (doc) {
                // doc.save('sample.pdf');
                doc.setProperties({
                    title: "Report"
                });
                doc.output('dataurlnewwindow');
            }
        });


    }

    return (
        <>
            <div ref={pdfRef} className={styles.mainContainer}>
                <h1>hello!</h1>
                <h1>world!</h1>

            </div>
            <button onClick={generatePDF}>test</button>
        </>)

};

export default GeneratePDF;
