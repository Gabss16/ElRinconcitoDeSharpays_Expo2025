import { useRef, useEffect } from 'react';
import {
  Chart,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js';

Chart.register(
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    chartInstanceRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Sharpays Boutique',
          'Bougies',
          'FrostyBites',
          'El Paraiso de Dioss',
        ],
        datasets: [
          {
            data: [12, 8, 5, 10], // Cantidad de productos por negocio (ejemplo)
            backgroundColor: ['#ff87d4', '#b2f1f0', '#f9e375', '#c2b6ff'],
            borderColor: 'white',
            borderWidth: 5,
            hoverOffset: 10,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              pointStyle: 'circle',
              padding: 30,
            },
          },
          title: {
            display: false, // No mostrar título
          },
        },
      },
    });

    return () => {
      chartInstanceRef.current?.destroy();
    };
  }, []);

  return (
    <div
      className='doughnutGraphic'
      style={{
        borderRadius: 25,
        boxShadow: '0px 6px 0px 2px rgba(0, 0, 0, 0.14)'
      }}
    >
      <canvas ref={chartRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default DoughnutChart;
