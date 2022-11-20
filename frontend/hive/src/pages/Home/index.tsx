import * as React from 'react';

import HomeLayout from '../../layouts/Home';

import FiltrableTable from '../../components/FiltrableTable';

import { API_CONSTS } from '../../utils/constants';

import './index.css';

class Home extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            companies: [],
        };
    }

    componentDidMount(): void {
        fetch(`${API_CONSTS.BASE_URL}/statistics/companies/ranks`)
            .then(response => response.json())
            .then(companies => {
                this.setState({ companies: companies.companies })
            });
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

                    <FiltrableTable 
                        data={this.state.companies}
                    />

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

                    <div className="header-image-container">
                        <img
                            src={require('../../assets/images/big-banner.png')}
                            alt="header with earth"
                            className="header-image up-rounded"
                        />
                    </div>

                    <div className="ongoing-activities">
                        <h1>ONGOING ACTIVITIES</h1>
                        <div className="auxiliary-banners">
                            <img
                                src={require('../../assets/images/banner-3.png')}
                                alt="banner 3"
                                className="auxiliary-banner rounded"
                            />
                            <img
                                src={require('../../assets/images/banner-4.png')}
                                alt="banner 4"
                                className="auxiliary-banner rounded"
                            />
                        </div>
                    </div>

                    <div className="fulfilled-activities">
                        <h1>FULFILLED ACTIVITIES</h1>
                        <div className="auxiliary-banners">
                            <img
                                src={require('../../assets/images/event-1.png')}
                                alt="banner 3"
                                className="auxiliary-banner rounded"
                            />
                            <img
                                src={require('../../assets/images/event-2.png')}
                                alt="banner 4"
                                className="auxiliary-banner rounded"
                            />
                            <img
                                src={require('../../assets/images/event-3.png')}
                                alt="banner 4"
                                className="auxiliary-banner rounded"
                            />
                        </div>
                    </div>
                </div>
            </HomeLayout>
        );
    }
}

export default Home;