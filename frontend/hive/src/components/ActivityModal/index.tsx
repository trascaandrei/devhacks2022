import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import LinearProgress, { LinearProgressProps, linearProgressClasses } from '@mui/material/LinearProgress';

import './index.css';
import { observer } from 'mobx-react';
import { rootStore } from '../../stores';

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

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

class ActivityModal extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            activityType: '',
            contribution: 0,
        };
    }

    submitForm = () => {
        const { contribution } = this.state;
        const { activity, isRequest } = this.props;

        if (!isRequest) {
            const payload = {
                actionId: activity?.actionId,
                details: {
                    nrSquareMeters: parseInt(contribution),
                }
            }
            
            rootStore.activitiesStore.createRequest(payload);
        } else {
            rootStore.activitiesStore.approveRequest(activity?.requestId);
        }

        this.props.handleClose(true);
    }

    render() {
        const { open, handleClose, activity } = this.props;
        const { contribution } = this.state;
        const totalNeeded = activity?.details?.nrSquareMeters || activity?.details?.nrTrees

        return (
            <div>
                <Modal
                    open={open}
                    onClose={() => handleClose(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {!this.props.isRequest ? (
                            <>
                                <Typography id="modal-modal-title" variant="h5" component="h3">
                                    {activity?.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {activity?.description}
                                </Typography>
                                <Typography id="modal-modal-info" sx={{ mt: 2 }}>
                                    Total needed: <b>{totalNeeded}</b> <br/>
                                    Price per unit: <b>{activity?.details?.pricePerTree || activity?.details?.pricePerSquareMeter} $</b>
                                </Typography>
                            
                                <div className="create-activity-form">
                                    <Box sx={{ width: '100%' }}>
                                        <LinearProgressWithLabel value={100 * (contribution || 0) / totalNeeded} />
                                    </Box>
                                    <TextField
                                        style={{ width: "100%", margin: "5px" }}
                                        type="text"
                                        label="Your contribution (no of units)"
                                        variant="outlined"
                                        onChange={(event: any) => {
                                            this.setState({
                                                contribution: event.target.value
                                            })
                                        }}
                                    />

                                    <Button
                                        variant="contained" 
                                        style={{ marginTop: "25px" }}
                                        onClick={this.submitForm}
                                    >
                                        Contribute
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Typography id="modal-modal-title" variant="h5" component="h3">
                                    {activity?.action.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    {activity?.action.description}
                                </Typography>
                                <Typography id="modal-modal-info" sx={{ mt: 2 }}>
                                    Suggested amount: <b>{totalNeeded}</b> units by <b>{activity?.company.name}</b> <br/>
                                </Typography>
                                <Button
                                    variant="contained" 
                                    style={{ marginTop: "25px" }}
                                    onClick={this.submitForm}
                                >
                                    Accept
                                </Button>
                            </>
                        )}
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default observer(ActivityModal);
