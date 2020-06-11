import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from "../../utils/axios";

class DropdownTemplate extends Component {

    state = {
        publishedResourceTemplates: []
    };

    getData = () => {
        axios.get('resource-template/published').then(response => {
            let publishedResourceTemplates = response.data['content'];
            this.setState({ publishedResourceTemplates });
        })
    };

    componentDidMount() {
        this.getData();
    }

    onChange = (ob, value) => {
        if (value != null) {
            this.props.setRelatedResourceTemplateId(value.id)
        }
    };

    render() {

        return (
            <div>
                <Autocomplete
                    id="combo-box-demo"
                    options={this.state.publishedResourceTemplates}
                    getOptionLabel={option => option.name}
                    onChange={this.onChange}
                    style={{ width: 300 }}
                    renderInput={params => <TextField {...params} label="Resource Templates" variant="outlined" />}
                />
            </div>
        );
    }
}

export default DropdownTemplate;