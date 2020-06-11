import React, {Component} from 'react';
import {TextField, Button, FormControl, Grid, Box} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from '../../utils/axios';

const gridStyles = {
    marginTop: 30
}

const formControlStyles = {
    marginBottom: 20
}

class ResourceTemplateCreate extends Component {

    state = {
        name: undefined,
        description: undefined,
        errorMessage: ''
    }

    create = () => {
        axios.post("/resource-template", this.state).then(response => {
            this.props.history.push("/resource-template");
        }, error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(error.response.data.message);
        })
    }

    isValid = () => {
            return this.state.name === undefined;
    }

    onChangeName = (event) => {
        let name = event.target.value;
        if (name.trim().length === 0) {
            name = undefined;
        }
        this.setState({name});
    }

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});
    }

    goBack = () => {
        this.props.history.goBack();
    }

    render() {
        return (
            <div>
                <Grid container spacing={3}
                      style={gridStyles}>
                    <Grid item xs={4}>
                        <Box mx="auto">
                            <Box mt={4}>
                                <Button
                                    variant="contained"
                                    startIcon={<ArrowBackIosIcon/>}
                                    onClick={this.goBack}
                                >Go Back</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box mx="auto">
                            <Box
                                display="flex"
                                flexDirection="column">
                                <h1>Create Resource Template</h1>
                                <FormControl style={formControlStyles}>
                                    <TextField type="text" label="name" onChange={this.onChangeName}
                                               helperText={this.state.errorMessage} error={!!this.state.errorMessage}/>
                                </FormControl>
                                <FormControl style={formControlStyles}>
                                    <TextField type="text" label="description" onChange={this.onChangeDescription}/>
                                </FormControl>
                                <FormControl>
                                    <Button variant="contained"
                                            color="primary"
                                            size="large"
                                            startIcon={<SaveIcon/>}
                                            disabled={this.isValid()}
                                            onClick={this.create}
                                    >Create</Button>
                                </FormControl>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}/>
                </Grid>
            </div>
        );
    }
}

export default ResourceTemplateCreate;