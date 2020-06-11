import React, {Component} from 'react';
import {Box, Button, FormControl, Grid, TextField} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from '../../utils/axios';
import {getUserRole} from '../../service/authService';

const gridStyles = {
    marginTop: 30
};

const formControlStyles = {
    marginBottom: 20
};

class ResourceTemplateUpdate extends Component {

    state = {
        resTempId: this.props.match.params.id,
        oldName: "",
        name: "",
        oldDescription: "",
        description: ""
    };

    getData = () => {
        axios.get(`/resource-template/${this.state.resTempId}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name,
                    oldName: data.name,
                    description: data.description,
                    oldDescription: data.description
                })
            }).catch(error => {

        })

    };

    updateData = () => {
        let data = {};
        if (this.state.name !== this.state.oldName) {
            data["name"] = this.state.name;
        }
        if (this.state.description !== this.state.oldDescription) {
            data["description"] = this.state.description;
        }
        axios.patch(`/resource-template/${this.state.resTempId}`, data).then(
            response => {
                this.props.history.push(`/resource-template/view/${this.state.resTempId}`);
            }, error => {
                this.setState({errorMessage: error.response.data.message});
            }
        )
    };

    verifyUser = () => {
        if (getUserRole() !== "ROLE_MANAGER") {
            this.props.history.push("/home");
        }
    };

    componentDidMount() {
        this.verifyUser();
        this.getData();
    }

    isValid = () => {
        return this.state.name !== "" &&
            (this.state.name !== this.state.oldName ||
                this.state.description !== this.state.oldDescription);
    };

    onChangeName = (event) => {
        let name = event.target.value.trim();
        this.setState({name});
    };

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});
    };

    goBack = () => {
        this.props.history.push(`/resource-template/view/${this.state.resTempId}`);
    };

    render() {
        return (
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
                            <h1>Update Resource Template</h1>
                            <FormControl style={formControlStyles}>
                                <TextField type="text" label="name" onChange={this.onChangeName}
                                           value={this.state.name} helperText={this.state.errorMessage}
                                           error={!!this.state.errorMessage}/>
                            </FormControl>
                            <FormControl style={formControlStyles}>
                                <TextField type="text" label="description" onChange={this.onChangeDescription}
                                           value={this.state.description}/>
                            </FormControl>
                            <FormControl>
                                <Button variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<EditIcon/>}
                                        disabled={!this.isValid()}
                                        onClick={this.updateData}
                                >Update</Button>
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={4}/>
            </Grid>
        );
    }
}

export default ResourceTemplateUpdate;