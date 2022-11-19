import React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { MenuItem } from '@mui/material';

import './index.css';
import { observer } from 'mobx-react';
import { rootStore } from '../../stores';
import { ACTIVITY_TYPES } from '../../utils/constants';

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
        this.state = {
            activityType: '',
            fields: {
                title: '',
                description: '',
                details: {
                    nrSquareMeters: null,
                    pricePerSquareMeter: null,
                    nrTrees: null,
                    pricePerTree: null,
                }
            }
        };
    }

    handleChange = (event: any) => {
        this.setState({ 
            activityType: event.target.value,
            fields: {
                ...this.state.fields,
                details: {
                    nrSquareMeters: null,
                    pricePerSquareMeter: null,
                    nrTrees: null,
                    pricePerTree: null,
                }
            }
        });
    }

    submitForm = () => {
        const { fields, activityType } = this.state;
        const { activityTypes } = rootStore.activitiesStore;
        const currentActivityType = activityTypes.find(
            (activity: any) => activity.name === activityType
        );

        const payload = {
            activityId: currentActivityType?.activityId,
            ...fields,
            details: Object.keys(fields.details)
                .filter((k) => fields.details[k] != null)
                .reduce((a, k) => ({ ...a, [k]: parseInt(fields.details[k]) }), {})
        }
        console.log(payload);
    }

    renderDynamicFields() {
        const { activityTypes } = rootStore.activitiesStore;
        const currentActivityType = activityTypes.find(
            (activityType: any) => activityType.name === this.state.activityType
        );

        console.log(currentActivityType, activityTypes);

        return (
            <>
                {currentActivityType?.details.map((detail: any) => {
                    return (
                        <TextField
                            key={detail.key}
                            id={detail.key}
                            label={detail.value}
                            variant="outlined"
                            type="text"
                            style={{ width: "100%", margin: "5px" }}
                            onChange={(event: any) => {
                                this.setState({
                                    fields: {
                                        ...this.state.fields,
                                        details: {
                                            ...this.state.fields.details,
                                            [detail.key]: event.target.value
                                        }
                                    }
                                })
                            }}
                        />
                    )
                })}
            </>
        );
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
                                value={this.state.activityType}
                                onChange={this.handleChange}
                                select
                            >
                                <MenuItem value={ACTIVITY_TYPES.plantingTrees}>Plant a tree</MenuItem>
                                <MenuItem value={ACTIVITY_TYPES.cleaningWaste}>Clean waste</MenuItem>
                            </TextField>
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="text"
                                label="Title"
                                variant="outlined"
                                onChange={(event: any) => {
                                    this.setState({
                                        fields: {
                                            ...this.state.fields,
                                            title: event.target.value
                                        }
                                    })
                                }}
                            />
                            <TextField
                                style={{ width: "100%", margin: "5px" }}
                                type="text"
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={(event: any) => {
                                    this.setState({
                                        fields: {
                                            ...this.state.fields,
                                            description: event.target.value
                                        }
                                    })
                                }}
                            />

                            {this.renderDynamicFields()}

                            <Button
                                variant="contained" 
                                style={{ marginTop: "25px" }}
                                onClick={this.submitForm}
                            >
                                Create
                            </Button>
                        </div>
                    </Box>
                </Modal>
            </div>
        );
    }
}

export default observer(CreateActivity);
