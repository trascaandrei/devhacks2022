import * as React from 'react';

import HomeLayout from '../../layouts/Home';

import FiltrableTable from '../../components/FiltrableTable';

import './index.css';

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HomeLayout>
                <div className="Home">
                    <div className="header-image-container">
                        <img
                            src={require('../../assets/images/header-image.png')}
                            alt="header with earth"
                            className="header-image"
                        />
                    </div>

                    <FiltrableTable />

                    <div className="auxiliary-banners">
                        <img
                            src={require('../../assets/images/banner-1.png')}
                            alt="banner 1"
                            className="auxiliary-banner"
                        />
                        <img
                            src={require('../../assets/images/banner-2.png')}
                            alt="banner 1"
                            className="auxiliary-banner"
                        />
                    </div>
                </div>
            </HomeLayout>
        );
    }
}

export default Home;