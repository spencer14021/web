import React, {Component} from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class DropdownParameterType extends Component {

    render() {
        return (
            <>
                <Select value={this.props.parameterType} onChange={this.props.onChangeParameterType}>
                    {this.props.list.map(element => <MenuItem key={element} value={element}>{element}</MenuItem>)}
                </Select>
            </>
        );
    }
}

export default DropdownParameterType;