import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class PointDouble extends Component {

    state = {
        value: 0.00
    };

    onChangePointDouble = (event) => {
        this.props.setData(this.props.columnName, parseFloat(event.target.value))
    };

    render() {
        return (
            <div>
                <TextField required type="number" label={this.props.label} value={this.props.value} onChange={this.onChangePointDouble}/>
            </div>
        );
    }
}

export default PointDouble;