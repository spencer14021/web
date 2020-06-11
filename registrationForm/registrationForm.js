import React, {Component} from "react";
import {Button, FormControl, FormHelperText, Grid, TextField} from '@material-ui/core';
import axios from "../../utils/axios";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {Link} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

// const formControlStyles = {
//     marginBottom: 20
// }
const gridStyles = {
    marginTop: 30
    // width: 300
    // minWidth: 100,
    // maxWidth: 300,
    // padding: 10
};
const textFieldStyles = {
    // height: 50,
    width: 300,
    minWidth: 100,
    maxWidth: 300
};

const buttomStyles = {
    marginTop: 20,
    marginBottom: 20
};
// const handleClickShowPassword = () => {
//     this.setState({showPassword: !this.state.showPassword});
// };

class RegistrationForm extends Component {

    state = {
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        phone: undefined,
        password: undefined,
        confirmationPassword: undefined,
        showPassword: false,
        showConfPassword: false,
        errorMessages: {}
    };

    isNotValid = () => {
        return (this.state.lastName === undefined ||
            this.state.password === undefined || this.state.firstName === undefined
            || this.state.email === undefined || this.state.confirmationPassword === undefined);
    };
    validateEmail = (email) => {
        let re = /^\s*[a-zA-Z0-9]+(([._\-])?[a-zA-Z0-9])+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}\s*$/;
        return re.test((email).toLowerCase());
    };

    validateFirstName = (firstName) => {
        let re = /^\s*(([A-Za-z]){2,})+(((-')[A-Za-z]+)*){2,}\s*$/;
        return re.test(firstName);
    };

    validateLastName = (lastName) => {
        let re = /^\s*([A-Za-z]+((-')[A-Za-z]+)*){2,}\s*$/;
        return re.test(lastName);
    };

    validatePhone = (phone) => {
        let re = /^\s*\+[0-9]{12}\s*$/;
        return re.test(phone);
    };

    validatePassword = (password) => {
        let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$*%^&(_)/><?"|+=:])[A-Za-z\d~`!@#*$%^&(_)/><?"|+=:]{8,}$/;
        return re.test(password);
    };

    onChangeFirstName = (event) => {
        let firstName = event.target.value;
        this.setState({firstName});
        if (!this.validateFirstName(firstName)) {
            let errors = {...this.state.errorMessages, ["firstName"]: "First name is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["firstName"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        }
    };

    onChangeLastName = (event) => {
        let lastName = event.target.value;
        this.setState({lastName});
        if (!this.validateLastName(lastName)) {
            let errors = {...this.state.errorMessages, ["lastName"]: "Last name is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["lastName"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };
    onChangeEmail = (event) => {
        let email = event.target.value;
        this.setState({email});

        if (!this.validateEmail(email)) {
            let errors = {...this.state.errorMessages, ["email"]: "Email is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["email"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
    };
    onChangePhone = (event) => {
        let phone = event.target.value;
        this.setState({phone});
        if (!this.validatePhone(phone)) {
            let errors = {...this.state.errorMessages, ["phone"]: "Phone number is not valid"};
            this.setState({errorMessages: errors}, () => console.log(this.state));
        } else {
            let errors = {...this.state.errorMessages, ["phone"]: undefined};
            this.setState({errorMessages: errors}, () => console.log(this.state));

        }
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
    };

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
    };

    getData = () => {
        console.log('response.data.status');
        axios.post("/registration", this.state).then(response => {
            this.props.history.push("/");
        }, error => {
            let errors = {};
            error.response.data.forEach(err => {
                errors[[err.name]] = err.message;
            });
            this.setState({errorMessages: errors}, () => console.log(this.state));
        });
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };
    handleClickShowConfPassword = () => {
        this.setState({showConfPassword: !this.state.showConfPassword});
    };

    render() {
        return (
            <Grid container spacing={-2} direction='column' alignItems='center' alignContent='center'
                  style={gridStyles}
            >
                <Typography variant='h4' color='primary' paragraph='true'>Create Account</Typography>
                <Typography variant='subtitle1' color='textPrimary'>Please fill in all fields to create an
                    account</Typography>
                <TextField type="firstName" style={textFieldStyles} label="First name" onChange={this.onChangeFirstName}
                           helperText={this.state.errorMessages["firstName"]}
                           error={this.state.errorMessages["firstName"] !== undefined}
                />
                <TextField type="lastName" label="Last name" style={textFieldStyles} onChange={this.onChangeLastName}
                           helperText={this.state.errorMessages["lastName"]}
                           error={this.state.errorMessages["lastName"] !== undefined}
                />
                <TextField type="email" label="Email" style={textFieldStyles} onChange={this.onChangeEmail}
                           helperText={this.state.errorMessages["email"]}
                           error={this.state.errorMessages["email"] !== undefined}
                />
                <TextField type="phone"
                           label="Phone"
                           style={textFieldStyles}
                           onChange={this.onChangePhone}
                           helperText={this.state.errorMessages["phone"]}
                           error={this.state.errorMessages["phone"] !== undefined}
                />
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
                <Button style={buttomStyles} variant="contained" color="primary" onClick={this.getData}
                        size="large"
                        disabled={this.isNotValid()}>Sign
                    up </Button>
                <div>
                    <Typography variant='subtitle1'>Already have an account? <Link to={"/"}>Sign in</Link></Typography>
                </div>
            </Grid>
        );
    }

}

export default RegistrationForm;