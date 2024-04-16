import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({

    row: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: -1,
        width: "100%",
    },

    rowHeader: {
        textAlign: "left",
        padding: "2 2 0 10",
        border: "1px solid black",
    },

    rowData: {
        textAlign: "center",
        padding: 2,
        border: "1px solid black",
    }

});



const TableRows = ({ data }) => {
    if (data.display) {
        if (data.type === "bookUsage") {

            const rows = data.bookRCounts.map((r) => (
                <View style={styles.row}>

                    <Text style={[styles.rowData, { width: "50%" }]}>{data.bookR.find((e) => e.book_id === r.book_id).book.title}</Text>
                    <Text style={[styles.rowData, { width: "50%" }]}>{r._count.book_id}</Text>

                </View>
            ));

            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.8%" }]}>Popular Books</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "50%" }]}>Book Title</Text>
                    <Text style={[styles.rowData, { width: "50%" }]}>Usage Count</Text>
                </View>
                {rows}
            </>;
        } else if (data.type === "gameUsage") {
            const rows = data.gameRCounts.map((r) => (
                <View style={styles.row}>

                    <Text style={[styles.rowData, { width: "50%" }]}>{data.gameR.find((e) => e.boardgame_id === r.boardgame_id).boardgame.title}</Text>
                    <Text style={[styles.rowData, { width: "50%" }]}>{r._count.boardgame_id}</Text>

                </View>
            ));



            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.8%" }]}>Popular Boardgames</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "50%" }]}>Boardgame Title</Text>
                    <Text style={[styles.rowData, { width: "50%" }]}>Usage Count</Text>
                </View>
                {rows}
            </>;
        }
        else if (data.type === "bookUserType") {



            const getCountByUserType = (userType) => {
                const r = data.bookUserTypeC.find(obj => obj.user_type === userType);
                if (r) {
                    return r._count.user_type;
                } else {
                    return 0;
                }
            }

            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.4%" }]}>Requests per user type</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%" }]}>Student</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Faculty</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Staff</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Total</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByUserType("Student")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByUserType("Faculty")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByUserType("Staff")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{data.bookReqCount}</Text>
                </View>
            </>;
        } else if (data.type === "gameUserType") {
            const getCountByUserType = (userType) => {
                const r = data.gameUserTypeC.find(obj => obj.user_type === userType);
                if (r) {
                    return r._count.user_type;
                } else {
                    return 0;
                }
            }

            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.4%" }]}>Requests per user type</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%" }]}>Student</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Faculty</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Staff</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Total</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByUserType("Student")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByUserType("Faculty")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByUserType("Staff")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{data.gameReqCount}</Text>
                </View>
            </>;
        }
        else if (data.type === "bookYearLevel") {

            const getCountByYearLevel = (yearLevel) => {
                const r = data.bookYearLevelC.find(obj => obj.year_level === yearLevel);
                if (r) {
                    return r._count.year_level;
                } else {
                    return 0;
                }
            }

            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.2%" }]}>Student requests per year level</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "20%" }]}>1st Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>2nd Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>3rd Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>4th Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>Total</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("1st Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("2nd Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("3rd Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("4th Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{data.studentBookReqs}</Text>
                </View>
            </>;
        } else if (data.type === "gameYearLevel") {

            const getCountByYearLevel = (yearLevel) => {
                const r = data.gameYearLevelC.find(obj => obj.year_level === yearLevel);

                if (r) {
                    return r._count.year_level;
                } else {
                    return 0;
                }
            }

            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.2%" }]}>Student requests per  year level</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "20%" }]}>1st Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>2nd Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>3rd Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>4th Year</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>Total</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("1st Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("2nd Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("3rd Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{getCountByYearLevel("4th Year")}</Text>
                    <Text style={[styles.rowData, { width: "20%" }]}>{data.studentGameReqs}</Text>
                </View>
            </>;
        } else if (data.type === "bookDept") {
            const getCountByDept = (department) => {
                const r = data.bookDeptC.find(obj => obj.department === department);

                if (r) {
                    return r._count.department;
                } else {
                    return 0;
                }
            }

            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.4%" }]}>Student requests per department</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%", fontSize: 11.4 }]}>Information Technology</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Computer Science</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Information Systems</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Total</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByDept("Information Technology")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByDept("Computer Science")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByDept("Information Systems")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{data.studentBookReqs}</Text>
                </View>
            </>;
        } else if (data.type === "gameDept") {
            const getCountByDept = (department) => {
                const r = data.gameDeptC.find(obj => obj.department === department);

                if (r) {
                    return r._count.department;
                } else {
                    return 0;
                }
            }

            return <>
                <View style={styles.row}>
                    <Text style={[styles.rowHeader, { width: "99.4%" }]}>Student requests per department</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%", fontSize: 11.4 }]}>Information Technology</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Computer Science</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Information Systems</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>Total</Text>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByDept("Information Technology")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByDept("Computer Science")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{getCountByDept("Information Systems")}</Text>
                    <Text style={[styles.rowData, { width: "25%" }]}>{data.studentGameReqs}</Text>
                </View>
            </>;
        }
        else {
            return <></>;
        }
    }else{
        return <></>;
    }



};

export default TableRows;