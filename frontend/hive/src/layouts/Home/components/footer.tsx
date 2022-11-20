import React from "react";

class Footer extends React.Component<any, any> {
    render() {
        return (
            <div className="footer">
                <img
                    src={require('../../../assets/images/logo.png')} 
                    alt="logo" 
                    style={{marginRight: 15, marginLeft: 25}}
                />
                <div className="footer-menu">
                    <h3>Menu</h3>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Rankings</li>
                        <li>Ongoing activities</li>
                        <li>Fulfilled activities</li>
                        <li>Join the hive</li>
                    </ul>
                </div>
                <div className="footer-menu">
                    <h3>USEFUL LINKS</h3>
                    <ul>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Cookie Policy</li>
                        <li>FAQ</li>
                        <li>Support</li>
                    </ul>
                </div>

            </div>
        )
    }
}

export default Footer;