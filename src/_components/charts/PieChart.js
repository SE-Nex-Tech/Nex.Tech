import React from "react";
import { DonutChart } from "@mantine/charts";
import { NativeSelect } from "@mantine/core";
import { data } from "@/data/pie";
import styles from "./piechart.module.scss";

const PieChart = () => {
  return (
    <>
      <div classname={styles.container}>
        <DonutChart
          size={130}
          thickness={30}
          data={data}
          tooltipDataSource="segment"
          chartLabel="Out of 75"
        />
      </div>
    </>
  );
};

export default PieChart;
