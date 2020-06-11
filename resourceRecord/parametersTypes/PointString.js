import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class PointString extends Component {

    onChangePointString = (event) => {
        this.props.setData(this.props.columnName, event.target.value)
    };

    render() {
        return (
            <div>
                <TextField required type="text" label={this.props.label} value={this.props.value}
                           onChange={this.onChangePointString}/>
            </div>
        );
    }
}

export default PointString;