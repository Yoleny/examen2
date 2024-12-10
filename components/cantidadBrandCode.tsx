'use client';

import { getSumaBrandCode } from '@/service/Api';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProductData {
  brandCode: string;
  Total: number;
}

export default function SumaBrandCode() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Suma de Brand Code',
        data: [] as number[],
        backgroundColor: [] as string[],
      },
    ],
  });

  useEffect(() => {
    getSumaBrandCode()
      .then((data: ProductData[]) => {
        const brandCodes = data.map((item) => item.brandCode);
        const totals = data.map((item) => item.Total);

        // Generar colores aleatorios para cada segmento del gráfico
        const backgroundColors = totals.map(() => {
          return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        });

        setChartData({
          labels: brandCodes,
          datasets: [
            {
              label: 'Suma de Brand Code',
              data: totals,
              backgroundColor: backgroundColors,
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
          <h3>Suma de Productos por Marca</h3>
          <Pie data={chartData} />
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}