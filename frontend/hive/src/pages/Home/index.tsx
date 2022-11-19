import * as React from 'react';

import { routeNames } from '../../utils/routes';

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="Home">
                <h1>Home</h1>
            </div>
        );
    }
}

export default Home;