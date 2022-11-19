import * as React from 'react';
import { observer } from "mobx-react";

import DashboardLayout from '../../layouts/Dashboard';
import NgoDashboard from './components/NgoDashboard';
import CompanyDashboard from './components/CompanyDashboard';

import './index.css';

import { rootStore } from '../../stores';
import { USER_TYPES } from '../../utils/constants';

class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
        };
    }

    render() {
        const userType = rootStore.userStore.userData.userType;

        return (
            <DashboardLayout>
                {userType === USER_TYPES.ngo ? (
                    <NgoDashboard />
                ) : (
                    <CompanyDashboard />
                )}
            </DashboardLayout>
        );
    }
}

export default observer(Dashboard);