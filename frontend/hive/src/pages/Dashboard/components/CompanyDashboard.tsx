import * as React from 'react';
import { observer } from "mobx-react";

import { Box, Typography, Fab } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
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
import ActivityModal from '../../../components/ActivityModal';

import { routeNames } from '../../../utils/routes';
import { rootStore } from '../../../stores';

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
            label: 'Points aquired',
            data: labels?.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            borderColor: '#FFC000',
            backgroundColor: '#FFC000',
        },
        {
            label: 'Points remained',
            data: labels?.map(() => faker.datatype.number({ min: 0, max: 1000 })),
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
            openActivity: false,
            activity: null,
        };
    }

    componentDidMount(): void {
        rootStore.activitiesStore.fetchActivities();
        rootStore.activitiesStore.fetchHistory();
    }

    render() {
        const { activities, history } = rootStore.activitiesStore;
        const user = rootStore.userStore.getUserData();

        const activitiesToDisplay = activities?.map((activity: any) => ({
            title: activity.title,
            amount: activity.details.nrSquareMeters || activity.details.nrTrees,
            price: activity.details.pricePerTree || activity.details.pricePerSquareMeter,
            status: 'In progress',
            actions: (
                <Fab
                    color="primary"
                    size="small"
                    onClick={() => this.setState({ openActivity: true, activity })}
                >
                    <VisibilityIcon />
                </Fab>
            )
        }));
        const historyToDisplay = history?.map((activity: any) => ({
            title: activity.action.title,
            amount: activity.companyDetails.nrSquareMeters || activity.companyDetails.nrTrees,
            name: activity.ong.name,
        }));

        return (
            <>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <h1>Welcome, {user.name}. You're almost there.</h1>
                    <h3>You've given back {user.currentCredit}/{user.targetCredit} points</h3>
                    <Box sx={{ width: '100%' }}>
                        <BorderLinearProgress value={(user.currentCredit * 100) / user.targetCredit} />
                    </Box>
                    <div className="dashboard-activities">
                        <div className="dashboard-activities-table">
                            <TableWithTitle 
                                title="Find activities"
                                tableHeaders={['Activity', 'Amount', 'Price', 'Status', 'Actions']}
                                rows={activitiesToDisplay}
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
                        tableHeaders={['Activity', 'Amount', 'NGO']}
                        rows={historyToDisplay}
                        moreLink={routeNames.requests}
                    />
                </Box>
                <CreateActivity 
                    open={this.state.open}
                    handleClose={() => this.setState({ open: false })}
                />
                <ActivityModal
                    open={this.state.openActivity}
                    handleClose={() => this.setState({ openActivity: false })}
                    activity={this.state.activity}
                />
            </>
        );
    }
}

export default observer(CompanyDashboard);