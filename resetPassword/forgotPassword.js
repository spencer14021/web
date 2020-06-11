import React, {Component} from "react";
import TextField from "../inputField/inputField";
import axios from '../../utils/axios';
import {Box, Button, CssBaseline} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import EmailIcon from '@material-ui/icons/Email';
import Typography from "@material-ui/core/Typography";

const buttomStyles = {
    marginTop: 20,
    marginBottom: 20
}
const BoxStyle = {
    paddingLeft: 16,
    paddingRight: 16
}

const textFieldStyles = {
    width: 100,
    minWidth: 100,
    maxWidth: 100

}

class ForgotPassword extends Component {

    state = {
        email: undefined,
        errorMessage: ''
    }

    validateEmail = () => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(this.state.email).toLowerCase());
    }

    getData = () => {
        axios.get(`/forgot_password?email=${this.state.email}`).then(response => {
            //TODO redirect to massege "check your email smth like this"
            // this.props.history.push('/forgot_password/${this.state.email}');
            this.props.history.push(`/forgot_password/${this.state.email}`);
        }, error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(this.state.errorMessage);
        })
    }

    onChangeEmail = (event) => {
        let email = event.target.value;
        if (email.trim().length === 0) {
            email = undefined;
        }
        this.setState({email});
    }


    render() {
        return (
            <Box m={2} style={BoxStyle}>
                {this.logout && <Alert severity="success">Email has been sent</Alert>}
                <CssBaseline/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}

                <Typography variant='h5' color='primary'>Forgot your TBRM Account password?</Typography>
                <TextField style={textFieldStyles} type="text" label="Enter your email"
                           value={this.state.email} onChange={this.onChangeEmail}/>
                <Button style={buttomStyles} variant="contained" color="primary"
                        size="large"
                        onClick={this.getData} disabled={!this.validateEmail()}><EmailIcon/> Send email</Button>
            </Box>

        );
    }

}

export default ForgotPassword;