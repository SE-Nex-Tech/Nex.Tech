import React from "react";
import { DonutChart } from "@mantine/charts";
import { NativeSelect } from "@mantine/core";
// import { data } from "@/data/pie";
import styles from "./piechart.module.scss";
import { PieChart } from '@mantine/charts';

const PieCharts = ({ data, count }) => {
  return (
    <>
      <div classname={styles.container}>
        {/* <DonutChart
          size={130}
          thickness={30}
          data={data}
          tooltipDataSource="segment"
          chartLabel={"Out of " + count}
        /> */}
        <PieChart
          withLabelsLine
          labelsPosition="outside"
          labelsType="percent"
          withLabels
          data={data}
          size={130}
          thickness={30}
          withTooltip 
          tooltipDataSource="segment"
        />
      </div>
    </>
  );
};

export default PieCharts;
