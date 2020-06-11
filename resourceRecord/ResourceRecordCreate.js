import React, {Component} from 'react';
import {FormControl, TextField} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import axios from "../../utils/axios";
import PointInteger from "./parametersTypes/PointInteger";
import RangeDouble from "./parametersTypes/RangeDouble";
import PointString from "./parametersTypes/PointString";
import PointDouble from "./parametersTypes/PointDouble";
import RangeInteger from "./parametersTypes/RangeInteger";
import PointReference from "./parametersTypes/PointReference";
import CoordinateString from "./parametersTypes/CoordinateString";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PhotoUpload from "./parametersTypes/PhotoUpload";

class ResourceRecordCreate extends Component {

    state = {
        name: undefined,
        description: undefined,
        resourceParameters: this.props.resourceTemplate.resourceParameters,
        parameters: undefined,
        open: false
    };

    create = () => {
        axios.post(`/resource/${this.props.tableName}`, this.state).then(
            response => {
                this.setState({
                    name: "",
                    description: "",
                    parameters: {},
                    open: true
                });
                this.props.getRecordsData();

            }).catch(error => {
            console.dir(error.response.data);
        })
    };

    getParametersSize = (parameters) => {
        let len = 0;
        for (const count in parameters) {
            len++;
        }
        return len;
    };

    isCreateNotValid = () => {
        return (this.state.name === undefined
            || this.state.parameters === undefined
            || ((this.getParametersSize(this.state.parameters) < this.state.resourceParameters.length)))
    };

    onChangeName = (event) => {
        let name = event.target.value;
        if (name.trim().length === 0) {
            name = undefined;
        }
        this.setState({name});
    };

    handleOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false});
        this.props.handleClose();
    };

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});
    };

    setData = (columnName, value, id) => {
        this.setState({
            parameters: {
                ...this.state.parameters,
                [columnName]: value,
                [columnName.substring(0, columnName.length - 5)]: id
            }
        })
    };

    render() {
        return (
            <div>
                <DialogContent dividers>
                    <div>
                        <FormControl>
                            <TextField required type="text" label="name" onChange={this.onChangeName}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <TextField type="text" label="description" onChange={this.onChangeDescription}/>
                        </FormControl>
                    </div>
                    {
                        // elements
                        this.state.resourceParameters.map(element => {
                            let e;
                            if (element.parameterType === 'POINT_INT') {
                                e = (<PointInteger key={element.name}
                                                   label={element.name}
                                                   columnName={element.columnName}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_STRING') {
                                e = (<PointString key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_DOUBLE') {
                                e = (<PointDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_INT') {
                                e = (<RangeInteger key={element.name}
                                                   label={element.name}
                                                   columnName={element.columnName}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_DOUBLE') {
                                e = (<RangeDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_REFERENCE') {
                                e = (<PointReference key={element.name}
                                                     label={element.name}
                                                     columnName={element.columnName}
                                                     relatedResourceTableName={element['relatedResourceTemplateTableName']}
                                                     setData={this.setData}/>)
                            } else if (element.parameterType === 'COORDINATES_STRING') {
                                e = (<CoordinateString key={element.name}
                                                       label={element.name}
                                                       columnName={element.columnName.concat('_coordinate')}
                                                       setData={this.setData}/>)
                            } else if (element.parameterType === 'COORDINATES_STRING') {
                                e = (<CoordinateString key={element.name}
                                                       label={element.name}
                                                       columnName={element.columnName.concat('_coordinate')}
                                                       setData={this.setData}/>)
                            }
                            return e;
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus disabled={this.isCreateNotValid()} onClick={this.create} color="primary">
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
            </div>
        );
    }
}

export default ResourceRecordCreate;