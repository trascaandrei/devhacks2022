import * as React from 'react';
import { observer } from "mobx-react";
import { Box, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

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
import ActivityModal from '../../../components/ActivityModal';

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

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

class NgoDashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            open: false,
            openSnackbar: false,
            openActivity: false,
            activity: null,
        };
    }

    componentDidMount(): void {
        rootStore.activitiesStore.fetchActivities();
        rootStore.activitiesStore.fetchActivityTypes();
        rootStore.activitiesStore.fetchRequests();
    }

    render() {
        const { activities, requests } = rootStore.activitiesStore;
        const activitiesToDisplay = activities.map((activity: any) => ({
            title: activity.title,
            amount: activity.details.nrSquareMeters || activity.details.nrTrees,
            price: activity.details.pricePerTree || activity.details.pricePerSquareMeter,
            status: 'In progress',
            actions: (
                <Fab
                    color="primary"
                    size="small"
                    onClick={() => this.setState({ open: true })}
                >
                    <VisibilityIcon />
                </Fab>
            )
        }));
        const requestsToDisplay = requests.map((request: any) => ({
            title: request.action.title,
            amount: request.details.nrSquareMeters || request.details.nrTrees,
            company: request.company.name,
            actions: (
                <Fab
                    color="primary"
                    size="small"
                    onClick={() => this.setState({ openActivity: true, activity: request })}
                >
                    <VisibilityIcon />
                </Fab>
            )
        }));
        
        return (
            <>
                <Box sx={{ '& > :not(style)': { m: 1 } }}>
                    <div className="dashboard-title">
                        <h1>Welcome, NGO X</h1>
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
                        title="Requests"
                        tableHeaders={['Activity', 'Amount', 'Company', 'Actions']}
                        rows={requestsToDisplay}
                        moreLink={routeNames.requests}
                    />
                </Box>
                <CreateActivity 
                    open={this.state.open}
                    handleClose={(success = false) => {
                        this.setState({ open: false })
                        if (success) {
                            this.setState({ openSnackbar: true })
                        }
                    }}
                />
                <ActivityModal
                    open={this.state.openActivity}
                    handleClose={() => this.setState({ openActivity: false })}
                    activity={this.state.activity}
                    isRequest
                />
                <Snackbar open={this.state.openSnackbar} autoHideDuration={6000}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Activity added!
                    </Alert>
                </Snackbar>
            </>
        );
    }
}

export default observer(NgoDashboard);