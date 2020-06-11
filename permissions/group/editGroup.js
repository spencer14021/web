import React, {Component} from "react";
import axios from "../../../utils/axios";
import {TextField, Button, FormControl, Grid, Box} from '@material-ui/core';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Alert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";

const gridStyles = {
    marginTop: 30
};

const formControlStyles = {
    marginBottom: 20
};

const messageOk = 'Successfully updated!!!';

class EditGroup extends Component {
    state = {
        resID: this.props.match.params.id,
        name: this.props.match.params.name,
        description: "",
        oldName: "",
        oldDescription: "",
        errorMessage: "",
        id: "",
    };

    getData = () => {
        axios.get(`group/${this.state.name}`).then(response => {
            let data = response.data;
            this.setState({
                id: data.id,
                name: data.name,
                description: data.description,
                oldName: data.name,
                oldDescription: data.description,
                errorMessage: "",
                successMessage: "",
            })
            if(this.state.description === null) {
                this.setState({
                    description: "",
                    oldDescription: ""
                })
            }
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
        axios.put(`/group/${this.state.oldName}`, data).then(
            response => {
                this.setState({
                    successMessage: messageOk,
                    oldName: this.state.name
                })
            }, error => {
                this.setState({errorMessage: error.response.data.message});
                this.setState({name: this.state.oldName})
            }
        )
    };

    componentDidMount() {
        this.getData();
    }

    goBack = () => {
        this.props.history.push(`/group/view/${this.state.resID}/${this.state.oldName}`);
    };

    isValid = () => {
        return this.state.name !== "" &&
            (this.state.name !== this.state.oldName ||
                this.state.description !== this.state.oldDescription);
    };

    onChangeName = (event) => {
        let name = event.target.value;
        this.setState({name});
    };

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});
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
                            <h1>Edit group {this.state.oldName}</h1>
                            {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                            {this.state.successMessage && <Alert severity="success">{this.state.successMessage}</Alert>}
                            <FormControl style={formControlStyles}>
                                <TextField type="text" label="name" onChange={this.onChangeName}
                                           value={this.state.name}/>
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
            </Grid>
        );
    }
}

export default EditGroup;