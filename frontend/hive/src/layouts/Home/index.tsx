import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';

import './index.css'

class HomeLayout extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }
    
    render() {
        return (
            <div className="HomeLayout">
                <Navbar />
                {this.props.children}
                <Footer />
            </div>
        );
    }
}

export default HomeLayout;