"use client";

import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const GeneratePDF = () => {



  const pdfRef = useRef(null);

  const generatePDF = async () => {
    const inputData = pdfRef.current;
    try {
      const canvas = await html2canvas(inputData);
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("test.pdf");
    } catch (error) {
      console.log(error);
    }

  }


  return (
    <>
      <div ref={pdfRef}>
        <h1>hello!</h1>
      </div>
      <button onClick={generatePDF}>test</button>
    </>)

};

export default GeneratePDF;
