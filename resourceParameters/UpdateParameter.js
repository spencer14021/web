import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import DropdownParameterType from "./DropdownParameterType";
import axios from "../../utils/axios";
import DropdownTemplate from "../resourceTemplate/DropdownTemplate";
import TableCell from "@material-ui/core/TableCell";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import {Edit} from "@material-ui/icons";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const PARAMETER_TYPE = {
    point: ["int", "double", "string", "reference"],
    range: ["int", "double"],
    coordinates: ["string"]
};

class UpdateParameter extends Component {

    state = {
        resTempId: this.props.resTempId,
        id: this.props.id,
        columnName: "",
        name: this.props.name,
        parameter: this.props.parameterType.split('_')[0].toLowerCase(),
        parameterType: this.props.parameterType.split('_')[1].toLowerCase(),
        pattern: "",
        relatedResourceTemplateId: "",
        errorMessage: '',
        open: false
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

    handleClose = () => {
        this.setState({open: false});
    }

    create = () => {
        // let body = { 'isPublished': false };

        let data = {
            "name": this.state.name,
            "parameterType": `${this.state.parameter.toUpperCase()}_${this.state.parameterType.toUpperCase()}`
        };
        if (this.state.parameterType === "reference") {
            data["relatedResourceTemplateId"] = this.state.relatedResourceTemplateId
        }
        axios.put(`/resource-template/${this.state.resTempId}/resource-parameter/${this.state.id}`, data).then(
            response => {
                this.props.getData()
            }).catch(error => {
            this.setState({
                open: true
            })
            this.setState({errorMessage: error.response.data.message});
        })
    };

    render() {
        return (
            <>
                <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.handleClose}
                          anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                    <Alert onClose={this.handleClose} severity="error">
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
                <TableCell align="right">
                    <TextField type="text" name="name" onChange={this.onChangeName} value={this.state.name}/>
                </TableCell>

                <TableCell align="right">
                    <DropdownParameterType parameterType={this.state.parameter}
                                           onChangeParameterType={this.onChangeParameter}
                                           list={Object.keys(PARAMETER_TYPE)}/>

                    {!!this.state.parameter && <DropdownParameterType parameterType={this.state.parameterType}
                                                                      onChangeParameterType={this.onChangeParameterType}
                                                                      list={PARAMETER_TYPE[this.state.parameter]}/>}
                </TableCell>
                <TableCell align="right">

                </TableCell>
                <TableCell align="right">
                    {this.state.parameterType === "reference" &&
                    <DropdownTemplate setRelatedResourceTemplateId={this.setRelatedResourceTemplateId}/>}
                </TableCell>
                <Tooltip title="Save">
                    <IconButton aria-label="Edit" color="primary" onClick={this.create}>
                        <Edit/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Cancel">
                    <IconButton aria-label="cancel" color="secondary" onClick={this.props.cancelClick}>
                        <CancelOutlinedIcon/>
                    </IconButton>
                </Tooltip>
            </>
        );
    }
}

export default UpdateParameter;