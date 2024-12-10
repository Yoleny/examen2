'use client';

import { getTotalCategoryCode } from '@/service/Api';
import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ProductData {
    categoryCode: string; 
    Total: number;
}

export default function TotalCategoryCode() {
  const [chartData, setChartData] = useState({
    labels: [] as string[],
    datasets: [
      {
        label: 'Total por Categoría',
        data: [] as number[],
        backgroundColor: [] as string[],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProductData[] = await getTotalCategoryCode();
        const categoryCodes = data.map((item) => item.categoryCode);
        const totals = data.map((item) => item.Total);

        const backgroundColors = totals.map(() => {
          return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
        });

        setChartData({
          labels: categoryCodes,
          datasets: [
            {
              label: 'Total por Categoría',
              data: totals,
              backgroundColor: backgroundColors,
            },
          ],
        });
      } catch (error) {
        console.error('Ocurrió un error al obtener los datos:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData.labels.length > 0 ? (
        <div>
          <h3>Total de Productos por Categoría</h3>
          <Doughnut data={chartData} />
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}