import { ChartOptions } from 'chart.js';

export const options: ChartOptions<"line"> = {
    responsive: false,
    plugins: {
        legend: {
            display: false,
        },
    },
    elements: {
        line: {
            tension: 0.3,
        }
    },
    scales: { 
        y: {
            ticks: {
                color: 'white',
            },
            grid: {
                display: false,
            },
            border: {
                display: false,
            }
        },
        x: {
            ticks: {
                color: 'white',
            },
            grid: {
                display: false,
            },
            border: {
                display: false,
            }
        }
    }
};