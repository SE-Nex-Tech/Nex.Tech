import React from 'react';
import * as XLSX from 'xlsx';
import styles from "./reports.module.scss";

const DownloadTableExcel = ({
  filename,
  sheets,
  bookSummary,
  gameSummary,
  usagePerYearLevel,
  usagePerDepartment,
  usagePerUserType,
  totalCount
}) => {

  const handleExport = () => {
    const wb = XLSX.utils.book_new();

    sheets.forEach(sheet => {
      const { sheetName, tableData, fixedColumnWidths } = sheet;
      const ws = XLSX.utils.aoa_to_sheet(tableData);

      // Initialize column widths array if not already initialized
      if (!ws['!cols']) {
        ws['!cols'] = [];
      }

      if (fixedColumnWidths && fixedColumnWidths.length > 0) {
        // Set fixed column widths for the specified columns
        fixedColumnWidths.forEach(({ columnIndex, width }) => {
          ws['!cols'][columnIndex] = { width };
        });
      } else {
        // Calculate and set column widths dynamically
        const columnWidths = tableData.reduce((acc, row) => {
          row.forEach((cell, colIndex) => {
            const cellWidth = (cell.toString().length + 2) * 1; // Adjust the multiplier as needed
            acc[colIndex] = Math.max(acc[colIndex] || 0, cellWidth);
          });
          return acc;
        }, []);

        ws['!cols'] = columnWidths.map(width => ({ width }));
      }

      // Set row heights to auto
      ws['!autofilter'] = { ref: XLSX.utils.encode_range(XLSX.utils.decode_range(ws['!ref'])) };

      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    });

    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <button
      disabled={!bookSummary && !gameSummary}
      className={
        (bookSummary || gameSummary) && (usagePerUserType || usagePerDepartment || usagePerYearLevel || totalCount)
          ? styles.activeDownloadBtn
          : styles.inactiveDownloadBtn
      }
      onClick={handleExport}
    >
      Download Excel
    </button >

  );
};

const ExportToExcel = ({
  fileName,
  adminName,
  reportPeriodString,
  reportDate,
  bookUserType,
  bookYearLevel,
  bookDept,
  bookUsage,
  gameUserType,
  gameYearLevel,
  gameDept,
  gameUsage,
  bookSummary,
  gameSummary,
  usagePerYearLevel,
  usagePerDepartment,
  usagePerUserType,
  totalCount,
}) => {

  const getBookCountByUserType = (userType) => {
    const r = bookUserType.bookUserTypeC.find(obj => obj.user_type === userType);
    if (r) {
      return r._count.user_type;
    } else {
      return 0;
    }
  }

  const getBookCountByYearLevel = (yearLevel) => {
    const r = bookYearLevel.bookYearLevelC.find(obj => obj.year_level === yearLevel);
    if (r) {
      return r._count.year_level;
    } else {
      return 0;
    }
  }

  const getBookCountByDept = (department) => {
    const r = bookDept.bookDeptC.find(obj => obj.department === department);

    if (r) {
      return r._count.department;
    } else {
      return 0;
    }
  }

  const getGameCountByUserType = (userType) => {
    const r = gameUserType.gameUserTypeC.find(obj => obj.user_type === userType);
    if (r) {
      return r._count.user_type;
    } else {
      return 0;
    }
  }

  const getGameCountByYearLevel = (yearLevel) => {
    const r = gameYearLevel.gameYearLevelC.find(obj => obj.year_level === yearLevel);

    if (r) {
      return r._count.year_level;
    } else {
      return 0;
    }
  }

  const getGameCountByDept = (department) => {
    const r = gameDept.gameDeptC.find(obj => obj.department === department);

    if (r) {
      return r._count.department;
    } else {
      return 0;
    }
  }

  const bookRequestsPerUserType = usagePerUserType ? [
    ["Requests per user type"],
    ["Student", "Faculty", "Staff", "Total"],
    [getBookCountByUserType("Student"), getBookCountByUserType("Faculty"), getBookCountByUserType("Staff"), bookUserType.bookReqCount],
    [""],
  ] : [];

  const gameRequestsPerUserType = usagePerUserType ? [
    ["Requests per user type"],
    ["Student", "Faculty", "Staff", "Total"],
    [getGameCountByUserType("Student"), getGameCountByUserType("Faculty"), getGameCountByUserType("Staff"), gameUserType.gameReqCount],
    [""],
  ] : [];

  const bookRequestsPerYearLevel = usagePerYearLevel ? [
    ["Student requests per year level"],
    ["1st Year", "2nd Year", "3rd year", "4th Year", "Total"],
    [getBookCountByYearLevel("1st Year"), getBookCountByYearLevel("2nd Year"), getBookCountByYearLevel("3rd Year"), getBookCountByYearLevel("4th Year"), bookYearLevel.studentBookReqs],
    [""],
  ] : [];

  const gameRequestsPerYearLevel = usagePerYearLevel ? [
    ["Student requests per year level"],
    ["1st Year", "2nd Year", "3rd year", "4th Year", "Total"],
    [getGameCountByYearLevel("1st Year"), getGameCountByYearLevel("2nd Year"), getGameCountByYearLevel("3rd Year"), getGameCountByYearLevel("4th Year"), gameYearLevel.studentGameReqs],
    [""],
  ] : [];

  const bookRequestsPerDept = usagePerDepartment ? [
    [""],
    ["Student requests per department"],
    ["Information Technology", "Computer Science", "Information Systems", "Total"],
    [getBookCountByDept("Information Technology"), getBookCountByDept("Computer Science"), getBookCountByDept("Information Systems"), bookDept.studentBookReqs],
  ] : [];

  const gameRequestsPerDept = usagePerDepartment ? [
    [""],
    ["Student requests per department"],
    ["Information Technology", "Computer Science", "Information Systems", "Total"],
    [getGameCountByDept("Information Technology"), getGameCountByDept("Computer Science"), getGameCountByDept("Information Systems"), gameDept.studentGameReqs],
  ] : [];

  const bookUsageStatistics = totalCount ? [
    ["Usage Statistics"],
    [""],
    ["Popular Books"],
    ["Book Title", "Usage Count"],
  ] : [];

  const gameUsageStatistics = totalCount ? [
    ["Usage Statistics"],
    [""],
    ["Popular Boardgames"],
    ["Boardgame Title", "Usage Count"],
  ] : [];


  const bookRows = totalCount ? bookUsage.bookRCounts.map((r) => {
    const book = bookUsage.bookR.find((e) => e.book_id === r.book_id).book;
    const count = r._count.book_id;
    return [book.title, count];
  }) : [];


  const gameRows = totalCount ? gameUsage.gameRCounts.map((r) => {
    const boardgame = gameUsage.gameR.find((e) => e.boardgame_id === r.boardgame_id).boardgame;
    const count = r._count.boardgame_id;
    return [boardgame.title, count];
  }) : [];

  bookUsageStatistics.push(...bookRows);

  gameUsageStatistics.push(...gameRows);

  const sheets = [
    {
      sheetName: 'Report Details',
      tableData: [
        ["University of Santo Tomas"],
        ["College of Information and Computing Sciences"],
        [""],
        ["BiblioTechAI Report Summary"],
        ["Generated By:", adminName],
        ["Report Period:", reportPeriodString],
        ["Report Creation Date:", reportDate],
      ]
    },
  ];

  if (bookSummary) {
    sheets.push({
      sheetName: 'Books',
      tableData: [
        ["User Demographics"],
        [""],

        ...bookRequestsPerUserType,
        ...bookRequestsPerYearLevel,
        ...bookRequestsPerDept,
        ...bookUsageStatistics,
      ],
      fixedColumnWidths: [
        { columnIndex: 0, width: 20 },
        { columnIndex: 1, width: 20 },
        { columnIndex: 2, width: 20 },
        { columnIndex: 3, width: 20 },
        { columnIndex: 4, width: 20 },
      ],
    });
  }

  if (gameSummary) {
    sheets.push({
      sheetName: 'Boardgames',
      tableData: [
        ["User Demographics"],
        [""],
        ...gameRequestsPerUserType,
        ...gameRequestsPerYearLevel,
        ...gameRequestsPerDept,
        ...gameUsageStatistics
      ],
      fixedColumnWidths: [
        { columnIndex: 0, width: 20 },
        { columnIndex: 1, width: 20 },
        { columnIndex: 2, width: 20 },
        { columnIndex: 3, width: 20 },
        { columnIndex: 4, width: 20 },
      ],
    });
  }

  return (
    <>
      <DownloadTableExcel
        filename={fileName}
        sheets={sheets}
        bookSummary={bookSummary}
        gameSummary={gameSummary}
        usagePerYearLevel={usagePerYearLevel}
        usagePerDepartment={usagePerDepartment}
        usagePerUserType={usagePerUserType}
        totalCount={totalCount}
      />
    </>
  );
};

export default ExportToExcel;
