import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { MenuItem, Select, InputLabel, } from '@mui/material';

import './index.css';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
};

class CreateActivity extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        const { open, handleClose } = this.props;

        return (
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h5" component="h3">
                            Create a new activity
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Complete the form below to create a new activity so others companies can join.
                        </Typography>
                        <div className="create-activity-form">
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                label="Activity type"
                                id="demo-simple-select"
                                // value={age}
                                // onChange={handleChange}
                                select
                            >
                                <MenuItem value={10}>Plant a tree</MenuItem>
                                <MenuItem value={20}>Clean waste</MenuItem>
                            </TextField>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="text"
                                label="Title"
                                variant="outlined"
                            />
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="text"
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                            />

                            <Button variant="contained" style={{ marginTop: "25px" }}>Create</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default CreateActivity;
