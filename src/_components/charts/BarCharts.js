import React from "react";
import { DonutChart } from "@mantine/charts";
import { NativeSelect } from "@mantine/core";
// import { data } from "@/data/pie";
import styles from "./piechart.module.scss";
import { BarChart } from '@mantine/charts';

const BarCharts = ({ data, count }) => {
    return (
        <>
            <div classname={styles.container}>
                <BarChart
                    h={300}
                    data={data}
                    dataKey="dateRange"
                    type="stacked"
                    withLegend
                    legendProps={{ verticalAlign: 'bottom' }}
                    series={[
                        { name: 'bookCount', label: 'Book Requests', color: 'violet.6' },
                        { name: 'gameCount', label: 'Game Requests', color: 'blue.6' },
                    ]}
                />
            </div>
        </>
    );
};

export default BarCharts;
