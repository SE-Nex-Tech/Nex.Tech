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
                    
                    h={450}
                    data={data}
                    dataKey="dateRange"
                    // type="stacked"
                    withLegend
                    xAxisLabel="Date"
                    yAxisLabel="Requests"
                    yAxisProps={{ orientation: 'left'  }}
                    xAxisProps={{ orientation: 'bottom', padding: { left: 30, right: 30 }}}
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
