import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useEffect, useState } from "react";

export default function Pichart(props: any) {
  const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });
  const [optionsData, setOptionsData] = useState<any>();
  const [seriesData, setSeriesData] = useState<any>();
  useEffect(() => {
    const options: ApexOptions = {
        chart: {
            type: 'donut',
          },
          labels: ['Salary', 'Entertainment','Mandatory', 'Home', 'Emi' ],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
    };
    setSeriesData(props.totalPercentage);
    setOptionsData(options);
  },[props.totalPercentage]);

  return (
    <div id="chart">
      {typeof window !== undefined && (
        <ApexCharts
          options={optionsData}
          series={seriesData}
          type="donut"
          height={350}
        />
      )}
    </div>
  );
}
