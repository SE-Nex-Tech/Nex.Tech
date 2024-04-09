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
    if (data.type === "bookUsage") {

        const rows = data.bookRCounts.map((r) => (
            <View style={styles.row}>

                <Text style={[styles.rowData, { width: "50%" }]}>{data.bookR.find((e) => e.book_id === r.book_id).book.title}</Text>
                <Text style={[styles.rowData, { width: "50%" }]}>{r._count.book_id}</Text>

            </View>
        ));



        return <Fragment>
            <View style={styles.row}>
                <Text style={[styles.rowHeader, { width: "99.8%" }]}>Popular Books</Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.rowData, { width: "50%" }]}>Book Title</Text>
                <Text style={[styles.rowData, { width: "50%" }]}>Usage Count</Text>
            </View>
            {rows}
        </Fragment>;
    } else if (data.type === "gameUsage") {
        const rows = data.gameRCounts.map((r) => (
            <View style={styles.row}>

                <Text style={[styles.rowData, { width: "50%" }]}>{data.gameR.find((e) => e.boardgame_id === r.boardgame_id).boardgame.title}</Text>
                <Text style={[styles.rowData, { width: "50%" }]}>{r._count.boardgame_id}</Text>

            </View>
        ));



        return <Fragment>
            <View style={styles.row}>
                <Text style={[styles.rowHeader, { width: "99.8%" }]}>Popular Books</Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.rowData, { width: "50%" }]}>Book Title</Text>
                <Text style={[styles.rowData, { width: "50%" }]}>Usage Count</Text>
            </View>
            {rows}
        </Fragment>;
    }
    else if (data.type === "bookUserType") {



        const getCountByUserType = (userType) => {
            const userObject = data.bookUserTypeC.find(obj => obj.user_type === userType);
            return userObject._count.user_type;
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
            const userObject = data.gameUserTypeC.find(obj => obj.user_type === userType);
            return userObject._count.user_type;
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
    else {
        return <Fragment></Fragment>;
    }


};

export default TableRows;