import * as React from 'react';
import { observer } from "mobx-react";
import { rootStore } from '../../stores';

import ResponsiveDrawer from './components/sidebar';

import DashboardIcon from '@mui/icons-material/Dashboard';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import WorkIcon from '@mui/icons-material/Work';

import { routeNames } from '../../utils/routes';
import { USER_TYPES } from '../../utils/constants';

import './index.css';

class DashboardLayout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
        };
    }

    render() {
        const userType = rootStore.userStore.getUserData().type;
        console.log(userType);
        const menu = [
            {
                text: 'Dashboard',
                icon: <DashboardIcon />,
                link: routeNames.dashboard,
        
            }, 
            {
                text: 'Activities',
                icon: <WorkIcon />,
                link: routeNames.activities,
            },
            {
                text: userType === USER_TYPES.ngo ? 'Requests' : 'History',
                icon: <EqualizerIcon />,
                link: routeNames.requests,
            },
        ];

        return (
            <div className="Dashboard">
                <ResponsiveDrawer 
                    menu={menu}
                />
                <div className="dashboard-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default observer(DashboardLayout);