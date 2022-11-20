import React from 'react';

import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';

import { rootStore } from '../../stores';

import { API_CONSTS } from '../../utils/constants';


import './index.css';

class Login extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
    }

    submitForm = async () => {
        const res = await fetch(`${API_CONSTS.AUTH_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
        })
        const data = await res.json();
        
        if (data) {
            rootStore.userStore.setUserData(data);
            window.localStorage.setItem('userData', JSON.stringify(data));
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 500);
        }
    }

    render() {
        return (
            <div className="Login">
                <div className="login-modal">
                    <h1>Login</h1>
                    <p>Enter your username and password</p>
                    <TextField
                        style={{ width: "90%", margin: "5px" }}
                        type="text"
                        label="Username"
                        variant="outlined"
                        onChange={(event: any) => {
                            this.setState({
                                username: event.target.value
                            })
                        }}
                    />
                    <TextField
                        style={{ width: "90%", margin: "5px" }}
                        type="password"
                        label="Password"
                        variant="outlined"
                        onChange={(event: any) => {
                            this.setState({
                                password: event.target.value
                            })
                        }}
                    />
                    <Button
                        variant="contained" 
                        style={{ marginTop: "25px", width: "90%" }}
                        onClick={this.submitForm}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        )
    }
}

export default Login;