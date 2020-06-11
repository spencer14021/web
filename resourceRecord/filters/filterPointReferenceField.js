import React, {Component} from 'react';
import ResourceRecordDropdown from "../ResourceRecordDropdown";

class FilterPointReferenceField extends Component {
    state = {
        value: "",
        operation: "=",
        refName: undefined
    };

    onChangeValue = (key, value, id) => {
        this.setState({value: id, refName: key.substring(0, key.length - 5)}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        let {value, operation} = this.state;
        if (this.state.value === "" || this.state.value === undefined) {
            return ""
        }
        return `${this.state.refName}${operation}'${value}'`
    };

    render() {
        return (
            <>
                <div className={"filterDropdown"}>
                    <ResourceRecordDropdown
                        relatedResourceTableName={this.props.relatedResourceTableName}
                        onChangePointReference={this.onChangeValue}
                        columnName={this.props.columnName}
                        label={this.props.name}/>
                </div>
            </>
        );
    }
}

export default FilterPointReferenceField;