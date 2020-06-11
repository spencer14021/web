import React, {Component} from 'react';
import UserDropdown from "./userDropdown";

class PointReferenceField extends Component {
    state = {
        value: ""
    };

    onChangeValue = (value, id) => {
        console.log(value);
        console.log(id);
        this.setState({value: id}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        let {value} = this.state;
        console.log(value);
        if (this.state.value === "" || this.state.value === undefined) {
            return ""
        }
        return `${this.props.columnName}='${value}'`
    };

    render() {
        return (
            <div className={"filterDropdown"}>
                <UserDropdown
                    onChangePointReference={this.onChangeValue}
                    columnName={this.props.columnName}
                    label={this.props.name}
                />
            </div>
        );
    }
}

export default PointReferenceField;