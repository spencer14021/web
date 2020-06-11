import React, {Component} from 'react';
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Tooltip from "@material-ui/core/Tooltip";

class PointStringField extends Component {
    state = {
        value: "",
        errorMessage: undefined
    };

    onChange = (event) => {
        let value = event.target.value;
        this.setState({value}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        if (this.state.value !== "") {
            return `${this.props.columnName}:'${this.state.value}'`
        }
        return ""
    };

    reset = () => {
        this.setState({value: ""}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        })
    };

    render() {
        return (
            <div className={"filterCells"}>
                {this.props.name}
                <TextField type="text"
                           value={this.state.value}
                           style={{minWidth: "30px", marginLeft: "10px"}}
                           onChange={this.onChange}
                           helperText={this.state.errorMessage}
                           error={!!this.state.errorMessage}/>
                <Tooltip title="Clear">
                    <IconButton aria-label="delete"
                                color="primary"
                                onClick={this.reset}>
                        <HighlightOffIcon/>
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default PointStringField;