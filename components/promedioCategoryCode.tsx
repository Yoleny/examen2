'use client';

import { getPromedioCategoryCode } from '@/service/Api';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ProductData {
  categoryCode: string;
  Total: number;
}

export default function PromedioCategoryCode() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Promedio de CategoryCode',
        data: [] as number[],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    getPromedioCategoryCode()
      .then((data: ProductData[]) => {
        const categoryCodes = data.map((item) => item.categoryCode);
        const total = data.map((item) => item.Total);

        setChartData({
          labels: categoryCodes,
          datasets: [
            {
              label: 'Promedio de CategoryCode',
              data: total,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              fill: true,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Ocurrió un error', error);
      });
  }, []);

  return (
    <div>
      {chartData.labels.length > 0 ? (
        <div>
          <h3>Promedio por Categoría</h3>
          <Line data={chartData} />
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}
  