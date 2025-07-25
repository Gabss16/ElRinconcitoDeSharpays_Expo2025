import { useRef, useEffect } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrar todos los módulos necesarios para un gráfico de barras
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
  const ctx = chartRef.current.getContext('2d');

  if (chartInstanceRef.current) {
    chartInstanceRef.current.destroy();
  }

  chartInstanceRef.current = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [
        'Camisa Café',
        'Vela Corazón',
        'Vela Cheesecake',
        'Cactus Vela',
        'Frosty Mango',
        'Frosty Cajeta',
        'Frosty Fresa',
        'Flor Rosa',
        'Duo Suculenta'
      ],
      datasets: [
        {
          data: [25, 40, 18, 30, 50, 45, 42, 20, 12],
          backgroundColor: [
            '#f06292', '#ba68c8', '#4db6ac',
            '#ff8a65', '#7986cb', '#9575cd',
            '#64b5f6', '#e57373', '#81c784'
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Unidades Vendidas'
          }
        },
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 45,
            minRotation: 45
          }
        }
      },
    },
  });
}, []);


  return (
    <div className='barGraphic' style={{borderRadius: 25, boxShadow: '0px 6px 0px 2px rgba(0, 0, 0, 0.14)'}}>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;