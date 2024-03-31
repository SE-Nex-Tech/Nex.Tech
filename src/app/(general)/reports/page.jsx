"use client";

import React, { useState, useEffect, useRef  } from "react";
import Header from "@/_components/header/Header";
import { usePathname } from "next/navigation";
import styles from "./reports.module.scss";
import { Button, Center, NativeSelect, Loader, Switch, Group } from "@mantine/core";
import Navigator from "@/_components/navigator/navigator";
import { DatePickerInput } from "@mantine/dates";
import { Table, rem } from "@mantine/core";
import PieChart from "@/_components/charts/PieChart";
import { data } from "@/data/pie";
import { ToastContainer, toast } from "react-toastify";
import { closeModal, modals, openConfirmModal } from "@mantine/modals";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const findUser = (user_type, req_id, users) => {
  if (user_type === "Student") {
    return users.students.find((r) => r.request_id === req_id).name;
  } else if (user_type === "Faculty") {
    return users.faculty.find((r) => r.request_id === req_id).name;
  } else if (user_type === "Staff") {
    return users.staff.find((r) => r.request_id === req_id).name;
  }
};

import { useSession, getSession } from "next-auth/react";
import Unauthenticated from "@/_components/authentication/unauthenticated";

const Reports = () => {
  const current = usePathname();
  const [value, setValue] = useState();
  const [value2, setValue2] = useState();

  const [borrows, setBorrows] = useState([]);
  const [bookR, setBookR] = useState([]);
  const [gameR, setGameR] = useState([]);
  const [bookRCounts, setBookRCounts] = useState([]);
  const [gameRCounts, setGameRCounts] = useState([]);
  const [users, setUsers] = useState({});
  const [inval, setInval] = useState();
  const [bookPie, setBookPie] = useState([]);
  const [gamePie, setGamePie] = useState([]);

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
      const height = (canvas.height * width)/canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("test.pdf");
    }catch (error){
      console.log(error);
    }

  }


  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/reports", {
        method: "POST",
        body: JSON.stringify({
          value,
          value2,
        }),
      });
      const {
        invalid_dates,
        result,
        bookReqs,
        gameReqs,
        book_requests_count,
        game_requests_count,
        users,
        bookRC,
        gameRC,
      } = await response.json();

      setBorrows(result);
      setBookR(bookReqs);
      setGameR(gameReqs);
      setBookRCounts(book_requests_count);
      setGameRCounts(game_requests_count);
      setUsers(users);
      setBookPie(bookRC);
      setGamePie(gameRC);

      console.log(bookRC);
      console.log(gameRC);

      if (invalid_dates != undefined && inval != undefined) {
        toast.warning("Invalid date range");
        toast.warning("Fetching records starting from 4 weeks ago");
      } else {
        setInval(invalid_dates);
      }
    };

    getData();
  }, [value, value2]);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <Loader
        color="yellow"
        size="xl"
        cl
        classNames={{ root: styles.loading }}
      />
    );
  }

  if (status === "unauthenticated") {
    return <Unauthenticated />;
  }







  const reportsModal = (transaction) => {
    console.log("Generate Report");


    modals.openConfirmModal({
      title: <h1>Report Generation</h1>,
      size: "sm",
      radius: "md",
      withCloseButton: false,
      closeOnClickOutside: false,
      centered: true,
      onCancel: () => console.log("Cancel"),
      onConfirm: () => generatePDF(),
      children: customReport(),
      labels: { confirm: "Generate", cancel: "Cancel" },
      confirmProps: {
        radius: "xl",
        bg: "rgb(141, 16, 56)",
      },

      cancelProps: {
        radius: "xl",
        bg: "#989898",
        color: "white",
      },
    });



  };

  const customReport = () => {

    return (
      <>
        <Switch
          defaultChecked
          label="Books Summary"
        />
        <Switch
          defaultChecked
          label="Board Games Summary"
        />
        <h4>Show Usage per:</h4>
        <Switch
          defaultChecked
          label="Year Level"
        />
        <Switch
          defaultChecked
          label="Department"
        />
        <Switch
          defaultChecked
          label="User Type"
        />

      </>
    )
  }



  return (
    <>
      <div>
        <Header currentRoute={current} />
      </div>
      <Center maw="100%" mih="85%" className={styles.center}>
        <div className={styles.left_container}>
          <div className={styles.navigator}>
            <Navigator
              buttonText={"Analytics Overview"}
              showIcon={false}
              disableLink={true}
            />
          </div>
          <div className={styles.date_selector}>
            <h3>Date Range:</h3>
            <DatePickerInput
              placeholder="Pick dates"
              value={value}
              onChange={setValue}
              radius={"xl"} // BEGIN: Set default date to current date
            />
            <DatePickerInput
              placeholder="Pick dates"
              value={value2}
              onChange={setValue2}
              radius={"xl"} // END: Set default date to current date
            />
            <Button
              variant="filled"
              color="rgb(141, 16, 56)"
              radius="xl"
              onClick={reportsModal}
            >
              Download
            </Button>
          </div>
          <h3>Request Summary</h3>
          <div className={styles.summary}  ref={pdfRef}>
            <Table
              striped
              highlightOnHover
              withTableBorder
              className={styles.table}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Date</Table.Th>
                  <Table.Th>Code</Table.Th>
                  <Table.Th>User Type</Table.Th>
                  <Table.Th>Name</Table.Th>
                  <Table.Th>Type</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody className={styles.table_body}>
                {borrows.map((r) => (
                  <Table.Tr>
                    <Table.Th>{new Date(r.date).toDateString()}</Table.Th>
                    <Table.Th>{r.id}</Table.Th>
                    <Table.Th>{r.user_type}</Table.Th>
                    <Table.Th>{findUser(r.user_type, r.id, users)}</Table.Th>
                    <Table.Th>{r.type}</Table.Th>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </div>
        </div>

        <div className={styles.right_container}>
          <div className={styles.charts}>
            <div className={styles.chart1}>
              <div className={styles.header}>
                <h3>Books</h3>
                <NativeSelect
                  radius="xl"
                  data={["User Type", "Year Level", "Department"]}
                />
              </div>
              <PieChart data={bookPie} />
            </div>
            <div className={styles.chart2}>
              <div className={styles.header}>
                <h3>Games</h3>
                <NativeSelect
                  radius="xl"
                  data={["User Type", "Year Level", "Department"]}
                />
              </div>
              <PieChart data={gamePie} />
            </div>
          </div>
          <div className={styles.statistics}>
            <h3>Usage Statistics</h3>
            <div className={styles.summary}>
              <Table
                striped
                highlightOnHover
                withTableBorder
                className={styles.table}
              >
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Book Title</Table.Th>
                    <Table.Th>Total Requests</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody className={styles.table_body}>
                  {bookRCounts.map((r) => (
                    <Table.Tr>
                      <Table.Td>
                        {bookR.find((e) => e.book_id === r.book_id).book.title}
                      </Table.Td>
                      <Table.Td>{r._count.book_id}</Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          </div>
        </div>
      </Center>
      <ToastContainer />
    </>
  );
};

export default Reports;
