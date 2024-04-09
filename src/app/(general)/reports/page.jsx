"use client";

import React, { useState, useEffect, useRef, Fragment } from "react";
import Header from "@/_components/header/Header";
import { usePathname } from "next/navigation";
import styles from "./reports.module.scss";
import { Button, Center, NativeSelect, Loader, Switch, Group, Modal } from "@mantine/core";
import Navigator from "@/_components/navigator/navigator";
import { DatePickerInput } from "@mantine/dates";
import { Table, rem } from "@mantine/core";
import PieChart from "@/_components/charts/PieChart";
import { data } from "@/data/pie";
import { ToastContainer, toast } from "react-toastify";
import { closeModal, modals, openConfirmModal } from "@mantine/modals";
import { PDFViewer, PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font, Image } from "@react-pdf/renderer";
import { useDisclosure } from '@mantine/hooks';
import TableRows from "./tableRows";
import logoCICS from "@/images/cicslogo.png";

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


// // Register font
// Font.register({ family: 'Plus Jakarta Sans', src: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;700;800&display=swap" });
// Font.register({ family: 'Plus Jakarta Sans', src: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap", fontStyle: 'normal', fontWeight: 'normal'});


// Create styles
const stylesPDF = StyleSheet.create({
  page: {
    flexDirection: 'column',
    fontSize: 12,
    padding: "40 0 40 0",
  },

  header: {
    padding: "7 0 7 0",
    textAlign: 'center',
    alignItems: "center",
  },

  title: {
    padding: "7 0 7 0",
    textAlign: 'center',
    alignItems: "center",
  },

  admin_info: {
    padding: "7 0 7 60",
  },

  user_demographics: {
    padding: "7 0 7 0",

  },

  usage_statistics: {
    padding: "7 0 7 0",
  },

  tableContainer: {
    alignItems: "center",
    gap: 10,
  },

  table: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: -1,
    width: "80%",
  },

  pageNumber: {
    position: 'absolute',
    fontSize: 12,
    top: 760,
    bottom: 0,
    left: 425,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },

});



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

  const [bookUserTypeC, setBookUserTypeC] = useState([]);
  const [gameUserTypeC, setGameUserTypeC] = useState([]);

  const [studentReqs, setStudentReqs] = useState([]);
  const [studentBookReqs, setStudentBookReqs] = useState([]);
  const [studentGameReqs, setStudentGameReqs] = useState([]);

  const [bookYearLevelC, setBookYearLevelC] = useState([]);
  const [gameYearLevelC, setGameYearLevelC] = useState([]);

  const [bookDeptC, SetBookDeptC] = useState([]);
  const [gameDeptC, SetGameDeptC] = useState([]);

  const [bookReqCount, SetBookReqCount] = useState([]);
  const [gameReqCount, SetGameReqCount] = useState([]);


  const [opened, { open, close }] = useDisclosure(false);










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
        bookUserTypeC,
        gameUserTypeC,
        studentReqs,
        bookYearLevelC,
        gameYearLevelC,
        bookDeptC,
        gameDeptC,
      } = await response.json();



      setBookUserTypeC(bookUserTypeC);
      setGameUserTypeC(gameUserTypeC);


      // console.log(bookUserTypeC);
      // console.log(gameUserTypeC);

      setStudentReqs(studentReqs);
      console.log(studentReqs);

      const getTotalCount = (type) => {
        const r = studentReqs.filter(obj => obj.type === type);
        return Object.keys(r).length;
      }

      setStudentBookReqs(getTotalCount("Book"));
      setStudentGameReqs(getTotalCount("Boardgame"));

      setBookYearLevelC(bookYearLevelC);
      setGameYearLevelC(gameYearLevelC);

      console.log(bookYearLevelC);
      console.log(gameYearLevelC);

      SetBookDeptC(bookDeptC);
      SetGameDeptC(gameDeptC);

      console.log(bookDeptC);
      console.log(gameDeptC);

      setBorrows(result);

      // console.log(Object.keys(borrows).length); //total reqs



      setBookR(bookReqs);
      setGameR(gameReqs);

      SetBookReqCount(Object.keys(bookReqs).length);
      SetGameReqCount(Object.keys(gameReqs).length)

      // console.log(bookReqCount); //total book reqs
      // console.log(gameReqCount); //total game reqs

      setBookRCounts(book_requests_count);
      setGameRCounts(game_requests_count);

      setUsers(users);
      setBookPie(bookRC);
      setGamePie(gameRC);


      console.log(bookRC);
      console.log(gameRC);

      console.log(game_requests_count);

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

  const bookUsage = {
    type: "bookUsage",
    bookRCounts: bookRCounts,
    bookR: bookR,

  };

  const gameUsage = {
    type: "gameUsage",
    gameRCounts: gameRCounts,
    gameR: gameR,

  };

  const bookUserType = {
    type: "bookUserType",
    bookReqCount: bookReqCount,
    bookUserTypeC: bookUserTypeC,
  }

  const gameUserType = {
    type: "gameUserType",
    gameReqCount: gameReqCount,
    gameUserTypeC: gameUserTypeC,
  }

  const bookYearLevel = {
    type: "bookYearLevel",
    studentBookReqs: studentBookReqs,
    bookYearLevelC: bookYearLevelC,
  }

  const gameYearLevel = {
    type: "gameYearLevel",
    studentGameReqs: studentGameReqs,
    gameYearLevelC: gameYearLevelC,
  }

  const bookDept = {
    type: "bookDept",
    studentBookReqs: studentBookReqs,
    bookDeptC: bookDeptC,
  }

  const gameDept = {
    type: "gameDept",
    studentGameReqs: studentGameReqs,
    gameDeptC: gameDeptC,
  }


  // Create Document Component
  const MyDocument = () => (
    // format(Date.parse(value),"MMMM dd, yyyy")
    <Document>
      <Page size="LETTER" style={stylesPDF.page}>
        <View fixed style={stylesPDF.header}>
          <Image src={"https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Seal_of_the_University_of_Santo_Tomas.svg/1200px-Seal_of_the_University_of_Santo_Tomas.svg.png"} style={{ width: 50, height: 50, }} />
          <Text >University of Santo Tomas</Text>
          <Text>College of Information and Computing Sciences</Text>
        </View>
        <View fixed style={stylesPDF.title}>
          <Text>BiblioTechAI Report Summary</Text>
        </View>
        <View fixed style={stylesPDF.admin_info}>
          <Text>Generated by: {session.user.name}</Text>
          <Text>Report Period: {new Date(value).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })} - {new Date(value2).toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</Text>
          <Text>Report Creation Date: {new Date().toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' })}</Text>
        </View>

        <View style={stylesPDF.user_demographics}>
          <Text style={{ paddingLeft: 60 }}>User Demographics (Books):</Text>
          <View style={stylesPDF.tableContainer}>
            <View style={stylesPDF.table}>
              <TableRows data={bookUserType} />
            </View>
            <View style={stylesPDF.table}>
              <TableRows data={bookYearLevel} />
            </View>
            <View style={stylesPDF.table}>
              <TableRows data={bookDept} />
            </View>
          </View>
        </View>

        <View style={stylesPDF.usage_statistics}>
          <Text style={{ paddingLeft: 60 }}>Usage Statistics (Books):</Text>
          <View style={stylesPDF.tableContainer}>
            <View style={stylesPDF.table}>
              <TableRows data={bookUsage} />
            </View>
          </View>
        </View>

        <View style={stylesPDF.user_demographics}>
          <Text style={{ paddingLeft: 60 }}>User Demographics (Board Games):</Text>
          <View style={stylesPDF.tableContainer}>
            <View style={stylesPDF.table}>
              <TableRows data={gameUserType} />
            </View>
            <View style={stylesPDF.table}>
              <TableRows data={gameYearLevel} />
            </View>
            <View style={stylesPDF.table}>
              <TableRows data={gameDept} />
            </View>
          </View>
        </View>

        <View style={stylesPDF.usage_statistics}>
          <Text style={{ paddingLeft: 60 }}>Usage Statistics (Board Games):</Text>
          <View style={stylesPDF.tableContainer}>
            <View style={stylesPDF.table}>
              <TableRows data={gameUsage} />
            </View>
          </View>
        </View>


        <Text style={stylesPDF.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );


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
              onClick={open}
            >
              Generate Report
            </Button>
          </div>

          <Modal
            opened={opened}
            onClose={close}
            withCloseButton={false}
            centered
            // size="30%"
            size="70%"
            closeOnClickOutside={false}>
            <div className={styles.report_customization}>
              <div className={styles.modal_container}>
                <div className={styles.customization_container}>
                  <h4>Generate Report:</h4>
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
                </div>


                <div className={styles.preview_container}>

                  <h1>Preview:</h1>
                  <PDFViewer
                    width="600"
                    height="500"
                    showToolbar="false"
                  >
                    <MyDocument />
                  </PDFViewer>
                </div>
              </div>

              <div className={styles.btn_container}>
                <PDFDownloadLink document={MyDocument()} fileName={"reports.pdf"} >
                  <button className={styles.confirmBtn}>Download PDF</button>
                </PDFDownloadLink>

                <button className={styles.cancelBtn} onClick={close}>Cancel</button>
              </div>
            </div>
          </Modal>



          <h3>Request Summary</h3>
          <div className={styles.summary}>
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
