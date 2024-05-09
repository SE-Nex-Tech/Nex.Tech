import React from 'react';
import * as XLSX from 'xlsx';

const DownloadTableExcel = ({ filename, sheet, tableData }) => {
  const handleExport = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, sheet);
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <button onClick={handleExport} style={{}}>Export Excel</button>
  );
};

const TableComponent = () => {
  const tableData = [
    ["Firstname", "Lastname", "Age"],
    ["Edison", "Padilla", 20],
    ["Alberto", "Lopez", 94]
  ];

  return (
    <>
      <DownloadTableExcel
        filename={"reports"} // filename without date, you can modify it as needed
        sheet="report"
        tableData={tableData}
      />
    </>
  );
};

export default TableComponent;
