import React from 'react';

import { Button, MenuItem } from '@mui/material';
import TextField from '@mui/material/TextField';

import { rootStore } from '../../stores';

import { API_CONSTS, USER_TYPES } from '../../utils/constants';


import './index.css';

class Signup extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.state = {
            username: '',
            password: '',
            name: '',
            cui: '',
            email: '',
            accountType: '',
        };
    }

    submitForm = async () => {
        const res = await fetch(`${API_CONSTS.AUTH_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                name: this.state.name,
                cui: this.state.cui,
                email: this.state.email,
                type: this.state.accountType,
            }),
        })
        const data = await res.json();
        
        rootStore.userStore.setUserData(data);
        window.location.href = '/dashboard';
    }

    render() {
        return (
            <div className="Signup">
                <div className="signup-modal">
                    <h1>Signup</h1>
                    <p>Enter your details</p>
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
                    <TextField
                        style={{ width: "90%", margin: "5px" }}
                        label="Account type"
                        id="demo-simple-select"
                        value={this.state.accountType}
                        onChange={(event: any) => {
                            this.setState({
                                accountType: event.target.value
                            })
                        }}
                        select
                    >
                        <MenuItem value={USER_TYPES.company}>Company</MenuItem>
                        <MenuItem value={USER_TYPES.ngo}>NGO</MenuItem>
                    </TextField>
                    <TextField
                        style={{ width: "90%", margin: "5px" }}
                        type="text"
                        label="Email"
                        variant="outlined"
                        onChange={(event: any) => {
                            this.setState({
                                email: event.target.value
                            })
                        }}
                    />
                    <TextField
                        style={{ width: "90%", margin: "5px" }}
                        type="text"
                        label="Name"
                        variant="outlined"
                        onChange={(event: any) => {
                            this.setState({
                                name: event.target.value
                            })
                        }}
                    />
                    <TextField
                        style={{ width: "90%", margin: "5px" }}
                        type="text"
                        label="VAT Number"
                        variant="outlined"
                        onChange={(event: any) => {
                            this.setState({
                                cui: event.target.value
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

export default Signup;