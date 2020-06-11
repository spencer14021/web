import React, {Component} from 'react';
import FilterPointNumberField from "./filterPointNumberField";

class FilterRangeNumberField extends Component {

    render() {
        return (
            <div className={"filterCells"}>
                <div style={{marginRight: "5px"}}>
                    {this.props.name}
                </div>
                <FilterPointNumberField setFilter={this.props.setFilter}
                                        name="from"
                                        columnName={`${this.props.columnName}_from`}/>

                <FilterPointNumberField setFilter={this.props.setFilter}
                                        name="to"
                                        columnName={`${this.props.columnName}_to`}/>
            </div>
        );
    }
}

export default FilterRangeNumberField;