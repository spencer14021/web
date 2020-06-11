import React, {Component} from 'react';
import axios from "../../utils/axios";
import DialogContent from "@material-ui/core/DialogContent";
import {FormControl, TextField} from "@material-ui/core";
import PointInteger from "./parametersTypes/PointInteger";
import PointString from "./parametersTypes/PointString";
import PointDouble from "./parametersTypes/PointDouble";
import RangeInteger from "./parametersTypes/RangeInteger";
import RangeDouble from "./parametersTypes/RangeDouble";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import PointReference from "./parametersTypes/PointReference";
import CoordinateString from "./parametersTypes/CoordinateString";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

class ResourceRecordUpdate extends Component {

    state = {
        name: this.props.item.name,
        description: this.props.item.description,
        resourceParameters: this.props.resourceTemplate.resourceParameters,
        parameters: this.props.item.parameters,
        open: false
    };

    update = () => {
        axios.patch(`/resource/${this.props.tableName}/${this.props.item.id}`, this.state).then(
            response => {
                this.setState({
                    name: "",
                    description: "",
                    parameters: {},
                    open: true
                    // data: {}
                })
                //
                // this.props.handleClose();
            }).catch(error => {
            console.dir(error.response.data);
        })
    };

    onChangeName = (event) => {
        let name = event.target.value;
        console.log(name);
        if (name.trim().length === 0) {
            name = undefined;
        }
        this.setState({name});
    };

    onChangeDescription = (event) => {
        let description = event.target.value;
        this.setState({description});

        // this.props.setData(this.props.columnName, event.target.value)
    };

    setData = (columnName, value) => {
        this.setState({parameters: {...this.state.parameters, [columnName]: value}})
    };


    handleClose = () => {
        this.setState({open: false});
        this.props.handleClose();
        this.props.getRecordsData();
    };

    render() {
        return (
            <div>
                <DialogContent dividers>
                    <div>
                        <FormControl>
                            <TextField required type="text" label="name" onChange={this.onChangeName}
                                       value={this.state.name}/>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl>
                            <TextField type="text" label="description" onChange={this.onChangeDescription}
                                       value={this.state.description}/>
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
                                                   value={this.state.parameters[element.columnName]}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_STRING') {
                                e = (<PointString key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  value={this.state.parameters[element.columnName]}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'POINT_DOUBLE') {
                                e = (<PointDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  value={this.state.parameters[element.columnName]}
                                                  setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_INTEGER') {
                                e = (<RangeInteger key={element.name}
                                                   label={element.name}
                                                   columnName={element.columnName}
                                                   valueFrom={this.state.parameters[element.columnName.concat('_from')]}
                                                   valueTo={this.state.parameters[element.columnName.concat('_to')]}
                                                   setData={this.setData}/>)
                            } else if (element.parameterType === 'RANGE_DOUBLE') {
                                e = (<RangeDouble key={element.name}
                                                  label={element.name}
                                                  columnName={element.columnName}
                                                  valueFrom={this.state.parameters[element.columnName.concat('_from')]}
                                                  valueTo={this.state.parameters[element.columnName.concat('_to')]}
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
                                                       value={this.state.parameters[element.columnName.concat('_coordinate')]}
                                                       setData={this.setData}/>)
                            }
                            return e;
                        })
                    }
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={this.update} color="primary">
                        Update
                    </Button>
                    <Button autoFocus onClick={this.props.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
                <Snackbar open={this.state.open} autoHideDuration={1000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity="success">
                        Resource successfully updated
                    </Alert>
                </Snackbar>
            </div>
        );
    }
}

export default ResourceRecordUpdate;