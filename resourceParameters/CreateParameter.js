import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import DropdownParameterType from "./DropdownParameterType";
import Button from "@material-ui/core/Button";
import axios from "../../utils/axios";
import DropdownTemplate from "../resourceTemplate/DropdownTemplate";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

const PARAMETER_TYPE = {
    point: ["int", "double", "string", "reference"],
    range: ["int", "double"],
    coordinates: ["string"]
};

const style = {
    marginTop: 30
}

class CreateParameter extends Component {

    state = {
        columnName: "",
        name: "",
        parameter: "",
        parameterType: "",
        pattern: "",
        relatedResourceTemplateId: "",
        open: false,
        errorMessage: ''
    };

    onChangeName = (e) => {
        this.setState({name: e.target.value})
    };

    onChangeParameter = (e) => {
        this.setState({parameter: e.target.value})
    };
    onChangeParameterType = (e) => {
        this.setState({parameterType: e.target.value})
    };

    setRelatedResourceTemplateId = (id) => {
        this.setState({relatedResourceTemplateId: id})
    };

    create = () => {
        let data = {
            "name": this.state.name,
            "parameterType": `${this.state.parameter.toUpperCase()}_${this.state.parameterType.toUpperCase()}`
        }
        if (this.state.parameterType === "reference") {
            data["relatedResourceTemplateId"] = this.state.relatedResourceTemplateId
        }
        axios.post(`/resource-template/${this.props.resTempId}/resource-parameter`, data).then(
            response => {
                this.setState({
                    columnName: "",
                    name: "",
                    parameter: "",
                    parameterType: "",
                    pattern: "",
                    relatedResourceTemplateId: "",
                    open: true
                })
                this.props.getData();
            }).catch(error => {
            this.setState({errorMessage: error.response.data.message});
        })
    };
    isNotValid = () => {
        let {name, parameter, parameterType} = this.state;
        return (name === "" || parameter === "" || parameterType === "");
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.handleClose();
    }


    render() {
        return (
            <>
                <DialogContent dividers>
                    <Typography variant="body2" color="textSecondary" component="h2">
                        {/*{this.isPublished()}*/}
                        {this.state.errorMessage &&
                        <Alert severity="error">{this.state.errorMessage}</Alert>}
                    </Typography>
                    <TextField label="Name" type="text" name="name" onChange={this.onChangeName}
                               value={this.state.name}/>
                    <div style={style}>
                        <InputLabel id="demo-simple-select-label">Parameter Type</InputLabel>
                        <DropdownParameterType parameterType={this.state.parameter}
                                               onChangeParameterType={this.onChangeParameter}
                                               list={Object.keys(PARAMETER_TYPE)}
                                               style={style}/>
                        {!!this.state.parameter && <DropdownParameterType parameterType={this.state.parameterType}
                                                                          onChangeParameterType={this.onChangeParameterType}
                                                                          list={PARAMETER_TYPE[this.state.parameter]}/>}
                    </div>
                    <div style={style}>
                        {this.state.parameterType === "reference" &&
                        <DropdownTemplate
                            setRelatedResourceTemplateId={this.setRelatedResourceTemplateId}/>}
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus disabled={this.isNotValid()} onClick={this.create} color="primary">
                        Create
                    </Button>
                    <Button autoFocus onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
                <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Resource successfully added
                    </Alert>
                </Snackbar>
            </>
        );
    }
}

export default CreateParameter;