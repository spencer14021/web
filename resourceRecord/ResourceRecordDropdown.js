import React, {Component} from 'react';
import axios from "../../utils/axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class ResourceRecordDropdown extends Component {

    state = {
        records: [],
        relatedResourceTableName: this.props.relatedResourceTableName,
        label: this.props.label || "Related Resource Records"
    };

    getRecordsData = () => {
        axios.get(`/resource/${this.state.relatedResourceTableName}`).then(response => {
            this.setState({records: response.data['content']})
        })
    };

    componentDidMount() {
        this.getRecordsData();
    }

    onChange = (ob, value) => {
        if (value != null) {
            this.props.onChangePointReference(this.props.columnName.concat("_ref_name"), value.name, value.id);
        }
    };

    onInputChange = (event, value, reason) => {
        if (reason === "clear") {
            this.props.onChangePointReference(this.props.columnName.concat("_ref_name"), "");
        }
    };

    render() {
        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.records}
                    getOptionLabel={option => option.name}
                    onChange={this.onChange}
                    onInputChange={this.onInputChange}
                    renderInput={params => <TextField {...params} label={this.state.label} variant="outlined"/>}
                />
            </div>
        );
    }
}

export default ResourceRecordDropdown;