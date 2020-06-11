import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from '../../utils/axios';
import { Button } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { verifyUser } from '../../service/authService';


const style={
    marginTop:40
}

class FullOAuthRegister extends Component {

    state = {
        phone: undefined,
        password: undefined
    }

    getRole() {
        axios.get("/user/role").then(response => {
            sessionStorage.setItem('userrole', response.data.role.name)
            this.setState({ 'userrole': response.data.role.name });
            this.verifyUser();

        }, error => {

        })
    }

    getData = () => {
        axios.post("/oauth2/fullRegister", this.state).then(response => {
            if (response !== undefined) {
                verifyUser();
            }
        }, error => {
            this.setState({ errorMessage: error.response.data.message });
        })
    }


    onChangePhone = (event) => {
        this.setState({
            phone: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    render() {

        return (
            <Container component="main" maxWidth="xs" style={style}>
                <h2>To finish registration with Google please enter such fields:</h2>
                <CssBaseline/>
                <div>
                    <TextField
                        onChange={this.onChangePhone}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="phone"
                        label="Phone"
                        name="phone"
                        autoComplete="phone"
                        autoFocus
                    />
                    <TextField
                        onChange={this.onChangePassword}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.getData}
                    >Continue register
                    </Button>

                </div>
            </Container>
        );
    }
}


export default FullOAuthRegister;