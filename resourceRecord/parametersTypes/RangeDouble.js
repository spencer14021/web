import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";

class RangeDouble extends Component {

    state = {
        label: this.props.label
    }

    onChangeRangeDoubleFrom = (event) => {
        this.props.setData(this.props.columnName.concat('_from'), parseFloat(event.target.value))
    };

    onChangeRangeDoubleTo = (event) => {
        this.props.setData(this.props.columnName.concat('_to'), parseFloat(event.target.value))
    };

    render() {
        console.log(this.props.values)
        return (
            <div>
                <div>
                    <TextField required type="number" label={this.state.label.concat(' from')} value={this.props.valueFrom}
                               onChange={this.onChangeRangeDoubleFrom}/>
                </div>
                <div>
                    <TextField required type="number" label={this.state.label.concat(' to')} value={this.props.valueTo}
                               onChange={this.onChangeRangeDoubleTo}/>
                </div>
            </div>
        );
    }
}

export default RangeDouble;