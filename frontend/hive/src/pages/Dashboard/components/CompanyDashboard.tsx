import * as React from 'react';
import { observer } from "mobx-react";

import { Box, Typography } from '@mui/material';
import LinearProgress, { LinearProgressProps, linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { options } from '../../../utils/chartUtils';

import TableWithTitle from '../../../components/TableWithTitle';
import CreateActivity from '../../../components/CreateActivity';

import { routeNames } from '../../../utils/routes';
import { rootStore } from '../../../stores';

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

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

const BorderLinearProgress = styled(LinearProgressWithLabel)(() => ({
    height: 10,
    borderRadius: 5,
}));

class CompanyDashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
        };
    }

    componentDidMount(): void {
        rootStore.activitiesStore.fetchActivities();
    }

    render() {
        return (
            <>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <h1>Welcome, N-ABLE. You're almost there.</h1>
                    <h3>You've given back 450/700 points</h3>
                    <Box sx={{ width: '100%' }}>
                        <BorderLinearProgress value={60} />
                    </Box>
                    <div className="dashboard-activities">
                        <div className="dashboard-activities-table">
                            <TableWithTitle 
                                title="Find activities"
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
                        title="History"
                        tableHeaders={['Activity', 'Amount', 'Company', 'Actions']}
                        rows={rows}
                        moreLink={routeNames.requests}
                    />
                </Box>
                <CreateActivity 
                    open={this.state.open}
                    handleClose={() => this.setState({ open: false })}
                />
            </>
        );
    }
}

export default observer(CompanyDashboard);