import React, {Component} from 'react';
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

class RadioButton extends Component {

    state = {
        value: ""
    };

    onChange = (event) => {
        let value = event.target.value;
        this.setState({value}, () => {
            this.props.setFilter(this.props.columnName, this.buildFilter());
        });
    };

    buildFilter = () => {
        if (this.state.value !== "") {
            return `${this.props.columnName}='${this.state.value}'`
        }
        return ""
    };

    render() {
        return (
            <div>
                <RadioGroup name="radio" className={"radioGroup"}>
                    {this.props.name}
                    <FormControlLabel
                        checked={this.state.value === ""}
                        value=""
                        control={<Radio color="primary"/>}
                        label="All"
                        labelPlacement="end"
                        onChange={this.onChange}
                    />
                    <FormControlLabel
                        value="true"
                        control={<Radio color="primary"/>}
                        label="True"
                        labelPlacement="end"
                        onChange={this.onChange}
                    />
                    <FormControlLabel
                        value="false"
                        control={<Radio color="primary"/>}
                        label="False"
                        labelPlacement="end"
                        onChange={this.onChange}
                    />
                </RadioGroup>
            </div>
        );
    }
}

export default RadioButton;