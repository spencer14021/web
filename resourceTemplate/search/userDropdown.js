import React, {Component} from 'react';
import axios from "../../../utils/axios";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

class UserDropdown extends Component {

    state = {
        users: []
    };

    getRecordsData = () => {
        axios.get(`/users/role?role=manager`).then(response => {
            this.setState({users: response.data["content"]})
        })
    };

    componentDidMount() {
        this.getRecordsData();
    }

    onChange = (ob, value) => {
        if (value != null) {
            this.props.onChangePointReference(this.props.columnName, value.id);
        }
    };
    onInputChange = (event, value, reason) => {
        if (reason === "clear") {
            this.props.onChangePointReference(this.props.columnName, "");
        }
    };

    render() {

        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.users}
                    getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                    onChange={this.onChange}
                    onInputChange={this.onInputChange}
                    renderInput={params => <TextField {...params} label={"Select a creator"} variant="outlined"/>}
                />
            </div>
        );
    }
}

export default UserDropdown;