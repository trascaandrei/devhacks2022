import * as React from 'react';

import { routeNames } from '../../utils/routes';

class Dashboard extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Dashboard">
                <h1>Dashboard</h1>
            </div>
        );
    }
}

export default Dashboard;