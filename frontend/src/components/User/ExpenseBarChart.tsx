/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axios from 'axios';
import { ApexOptions } from 'apexcharts';

const ExpenseBarChart = () => {
  const [series, setSeries] = useState<any[]>([]);
  const [colorMap, setColorMap] = useState<string[]>([]);
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const userId = localStorage.getItem('user_id') || '';

  // Helper to generate random hex color
  const getRandomColor = () => {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/bar_chart_expense_month/${userId}`)
      .then((res) => {
        const data = res.data;

        if (Array.isArray(data)) {
          const randomColors = data.map(() => getRandomColor());
          setColorMap(randomColors);

          setSeries([
            {
              name: 'Expenses',
              data: data.map((item: any, index: number) => ({
                x: item.month,
                y: item.total_expense,
                name: item.name,
                fillColor: randomColors[index],
              })),
            },
          ]);
        } else {
          console.error('API Response is not an array:', data);
        }
      })
      .catch((err) => {
        console.error('Error loading bar chart data:', err);
      });
  }, [apiUrl, userId]);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
    },
    plotOptions: {
      bar: {
        distributed: true, // This allows individual colors per bar
      },
    },
    xaxis: {
      title: {
        text: 'Month',
      },
    },
    yaxis: {
      title: {
        text: 'Total Expenses',
      },
    },
    dataLabels: {
      enabled: true,
    },
    colors: colorMap, // Apply random colors
    tooltip: {
      y: {
        formatter: function (val: number, { dataPointIndex, w }) {
          const expenseName = w.globals.initialSeries[0].data[dataPointIndex].name;
          return `₱${val.toFixed(2)} - ${expenseName}`;
        },
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height={500} />;
};

export default ExpenseBarChart;
