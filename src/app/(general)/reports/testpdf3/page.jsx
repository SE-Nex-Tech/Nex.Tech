"use client";

import React, { useState, useEffect, useRef } from "react";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';

const page = () => {
    // Create styles
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });

    // Create Document Component
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );

    // const App = () => (
    //     <PDFViewer>
    //       <MyDocument />
    //     </PDFViewer>
    //   );

    // const generatePDF = async () => {
    //     ReactDOM.render(<App />, document.getElementById('root'));
    // }

    return (
        <>
            {/* <PDFViewer>
                <MyDocument />
            </PDFViewer> */}
            <PDFDownloadLink document={MyDocument()} fileName={"resume.pdf"}>
                <button>test</button>
            </PDFDownloadLink>
            {/* <button onClick={generatePDF}>test</button> */}
        </>
    );
};

export default page;
