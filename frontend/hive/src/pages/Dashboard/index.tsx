import * as React from 'react';

import DashboardLayout from '../../layouts/Dashboard';

// import { routeNames } from '../../utils/routes';

class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <DashboardLayout>
                <h1>Dashboard</h1>
            </DashboardLayout>
        );
    }
}

export default Dashboard;