import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';


class InputField extends Component {

    state = {
        type: this.props.type,
        onChange: this.props.onChange,
        label: this.props.label
    }
    

    render() {
        return (
        <div>
            {/*id="standard-basic"*/}
            <TextField type={this.props.type}
                       label={this.props.label}
                       onChange={this.props.onChange}
                       helperText={this.props.helperText}
                       error={this.props.error}/>
        </div>
        );
    }

}

export default InputField;