import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from '../../helpers/axios'

const ApexChart: React.FC = () => {
  const [piechartData, setPieChartData] = useState<number[]>([]);
  console.log("🚀 ~ file: PieChart.tsx:7 ~ piechartData:", piechartData)
  const fetchPieChartData = async () => {
    try {
      const response = await axios.get<number[]>('/category/pie-chart');
      if (response?.data) {
        setPieChartData(response.data);
      } else {
        setPieChartData([]);
      }
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      setPieChartData([]);
    }
  };

  useEffect(() => {
    fetchPieChartData();
  }, [])
  
  const defaultData: number[] = [0, 0, 0, 0];
  const sanitizedData = piechartData.map(value => value !== null ? value : 0);


  const options: ApexCharts.ApexOptions = {
    chart: {
      width: 700,
      type: 'donut',
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    labels: ['Income', 'Investment', 'Expense Budget', 'Saving Budgets'],
    legend: {
      formatter: (val: string, opts: ApexCharts.LegendFormatterContext) => {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex];
      },
    },
    title: {
      text: 'Finance Pie Chart',
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
   
  };

  return (
    <div id="chart">
      {
        piechartData.length === 0 || piechartData.every(value => value === null) ?
        (
          <p className='text-xl text-red-500'>
          Please !, Add Some Transcations
        </p>
        ):
        (
          <ReactApexChart options={options} series={sanitizedData} type="donut" width={700} />
        )
      }
      
    </div>
  );
};

export default ApexChart;
