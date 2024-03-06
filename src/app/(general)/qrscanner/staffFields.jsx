"use client";

import React, { useState, useCallback, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

const StaffFields = (transaction) => {
    const selectedBook = transaction.book
    const ticket = transaction.borrowTicket
    const client = transaction.client
    return (<>
        <p>
            <strong>Receipt No.:</strong> {ticket.id}
        </p>
        <p>
            <strong>Call No.:</strong> {selectedBook.call_num}
        </p>
        <p>
            <strong>Request Date:</strong> {ticket.borrow_date}
        </p>
        <p>
            <strong>Employee No.:</strong> {client.employee_num}
        </p>
        <p>
            <strong>Name:</strong> {client.name}
        </p>
        <p>
            <strong>Email:</strong> {client.email}
        </p>
    </>)
}

export default StaffFields