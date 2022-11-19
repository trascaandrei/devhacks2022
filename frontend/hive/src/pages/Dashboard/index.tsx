import * as React from 'react';

import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

import TableWithTitle from '../../components/TableWithTitle';
import CreateActivity from '../../components/CreateActivity';

import DashboardLayout from '../../layouts/Dashboard';

import './index.css';

import { routeNames } from '../../utils/routes';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
  ) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
  ];

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options: ChartOptions<"line"> = {
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

const labels = ['August', 'September', 'Octomber', 'November'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Your activities',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 10 })),
            borderColor: 'white',
            backgroundColor: 'white',
        },
    ],
};

class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {
        return (
            <DashboardLayout>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <div className="dashboard-title">
                        <h1>Dashboard</h1>
                        <Fab color="primary" aria-label="add">
                            <AddIcon 
                                onClick={() => this.setState({ open: true })}
                            />
                        </Fab>
                    </div>
                    <div className="dashboard-activities">
                        <div className="dashboard-activities-table">
                            <TableWithTitle 
                                title="Your activities"
                                tableHeaders={['Activity', 'Amount', 'Date', 'Status', 'Actions']}
                                rows={rows}
                                moreLink={routeNames.activities}
                            />
                        </div>
                        <div className="dashboard-activities-chart">
                            <h1>History</h1>
                            <div className="dashboard-activities-linechart">
                                <Line options={options} data={data} />
                            </div>
                        </div>
                    </div>
                    
                    <TableWithTitle 
                        title="Requests"
                        tableHeaders={['Activity', 'Amount', 'Company', 'Actions']}
                        rows={rows}
                        moreLink={routeNames.requests}
                    />
                </Box>
                <CreateActivity 
                    open={this.state.open}
                    handleClose={() => this.setState({ open: false })}
                />
            </DashboardLayout>
        );
    }
}

export default Dashboard;