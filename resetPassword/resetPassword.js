import React, {Component} from "react";
// import TextField from "../inputField/inputField";
//import Axios from "axios";
import axios from '../../utils/axios';
import {Button, CssBaseline, FormControl, FormHelperText, Grid} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const textFieldStyles = {
    width: 300,
    minWidth: 100,
    maxWidth: 300
}
const buttomStyles = {
    marginTop: 20,
    marginBottom: 20
}

const gridStyles = {
    marginTop: 30
}

class ResetPassword extends Component {

    state = {
        password: undefined,
        confirmationPassword: undefined,
        errorMessages: {},
        showPassword: false,
        showConfPassword: false,
        errorMassage: ''
    }

    isNotValid = () => {
        return this.state.password === undefined || this.state.confirmationPassword === undefined;
    }

    validatePassword = (password) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$*%^&(_)/><?"|+=:])[A-Za-z\d~`!@#*$%^&(_)/><?"|+=:]{8,}$/;
        return re.test(password);
    }

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };
    handleClickShowConfPassword = () => {
        this.setState({showConfPassword: !this.state.showConfPassword});
    };

    onChangePassword = (event) => {
        let password = event.target.value;
        this.setState({password});
        if (!this.validatePassword(password)) {
            let errors = {
                ...this.state.errorMessages,
                ["password"]: "Password must contain at least eight characters and at least one character of "
                + " uppercase letter, lowercase letter, digit, special character"
            };
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["password"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        }
    }

    onChangeConfirmationPassword = (event) => {
        let confirmationPassword = event.target.value;
        this.setState({confirmationPassword});
        if (confirmationPassword !== this.state.password) {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: "Passwords do not match"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["confirmationPassword"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    }

    getData = () => {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const token = params.get('token');
        console.log(this.state.password);
        axios.post(`/reset_password?token=${token}`, this.state.password, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            //TODO redirect to main page
            this.props.history.push("/");
        }, error => {
            this.setState({errorMessage: error.response.data.message});
            console.log(this.state.errorMessage);

        })
    }

    render() {
        return (
            <Grid container direction='column' alignItems='center' justify='space-between'
                  style={gridStyles}>
                <CssBaseline/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                <Typography variant='h5' color='primary'>Change password</Typography>
                <FormControl>
                    <InputLabel htmlFor="Password">Password</InputLabel>
                    <Input id="Password" type={this.state.showPassword ? 'text' : 'password'}
                           placeholder="Password"
                           style={textFieldStyles}
                           onChange={this.onChangePassword}
                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton
                                       onClick={this.handleClickShowPassword}>
                                       {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                   </IconButton>
                               </InputAdornment>
                           }
                    />
                    {this.state.errorMessages["password"] !== undefined &&
                    <FormHelperText style={textFieldStyles}
                                    htmlFor="Password"
                                    error={true}>
                        {this.state.errorMessages["password"]}
                    </FormHelperText>}
                </FormControl>

                <FormControl>
                    <InputLabel htmlFor="Repeat Password">Repeat Password</InputLabel>
                    <Input type={this.state.showConfPassword ? 'text' : 'password'}
                           placeholder="Repeat Password"
                           id={"Repeat Password"}
                           style={textFieldStyles}
                           onChange={this.onChangeConfirmationPassword}
                           helperText={this.state.errorMessages["confirmationPassword"]}
                           error={this.state.errorMessages["confirmationPassword"] !== undefined}
                           endAdornment={
                               <InputAdornment position="end">
                                   <IconButton
                                       onClick={this.handleClickShowConfPassword}>
                                       {this.state.showConfPassword ? <Visibility/> : <VisibilityOff/>}
                                   </IconButton>
                               </InputAdornment>
                           }
                    />
                    {this.state.errorMessages["confirmationPassword"] !== undefined &&
                    <FormHelperText style={textFieldStyles}
                                    htmlFor="Repeat Password"
                                    error={true}>
                        {this.state.errorMessages["confirmationPassword"]}
                    </FormHelperText>}
                </FormControl>
                <Button onClick={this.getData}
                        variant="contained" color="primary" onClick={this.getData}
                        size="large"
                        style={buttomStyles} disabled={this.isNotValid()}> Submit</Button>
            </Grid>
        );
    }

}

export default ResetPassword;