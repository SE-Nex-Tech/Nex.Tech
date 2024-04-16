"use client";

import React, { useState, useCallback, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const StudentFields = (transaction) => {
    const selectedBook = transaction.material
    const ticket = transaction.borrowTicket
    const client = transaction.client

    const date = new Date(ticket.date);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = monthNames[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    let hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedDateTime = `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;

    return (<>
        <p>
            <strong>Receipt No.:</strong> {ticket.id}
        </p>
        <p>
            <strong>Call No.:</strong> {selectedBook.call_num}
        </p>
        <p>
            <strong>Title:</strong> {selectedBook.title}
        </p>
        <p>
            <strong>Request Date:</strong> {formattedDateTime}
        </p>
        <p>
            <strong>Student No.:</strong> {client.student_num}
        </p>
        <p>
            <strong>Name:</strong> {client.name}
        </p>
        <p>
            <strong>Email:</strong> {client.email}
        </p>
        <p>
            <strong>Department:</strong> {client.department}
        </p>
        <p>
            <strong>Year Level:</strong> {client.year_level}
        </p>
        <p>
            <strong>Section:</strong> {client.section}
        </p>
    </>)
}

export default StudentFields
