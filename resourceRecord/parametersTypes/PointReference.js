import React, {Component} from 'react';
import ResourceRecordDropdown from "../ResourceRecordDropdown";
import {FormControl} from "@material-ui/core";

class PointReference extends Component {

    render() {
        return (
            <div style={{marginTop: "30px"}}>
                <FormControl style={{width: "300px"}}>
                    <ResourceRecordDropdown
                        relatedResourceTableName={this.props.relatedResourceTableName}
                        onChangePointReference={this.props.setData}
                        columnName={this.props.columnName}/>
                </FormControl>
            </div>
        );
    }
}

export default PointReference;