import * as React from 'react';

import ResponsiveDrawer from './components/sidebar';

import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';

import { routeNames } from '../../utils/routes';

import './index.css';

const companyMenu = [
];

class DashboardLayout extends React.Component<any, any> {
    ngoMenu = [
        {
            text: 'Dashboard',
            icon: <DashboardIcon />,
            link: routeNames.dashboard,
    
        }, 
        {
            text: 'Requests',
            icon: <NotificationsActiveIcon />,
            link: routeNames.requests,
        },
        {
            text: 'Activities',
            icon: <LocalActivityIcon />,
            link: routeNames.activities,
        },
    ];

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Dashboard">
                <ResponsiveDrawer 
                    menu={this.ngoMenu}
                />
                <div className="dashboard-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default DashboardLayout;