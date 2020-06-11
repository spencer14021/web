import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import axios from '../../utils/axios';
import {Box, Button} from "@material-ui/core";
import LocalSessionStorageService from "../../services/LocalStorageService";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";


const style={
    marginTop:40
}
const formControl= {
    marginTop: 15,
    minWidth: 395,
    marginBottom: 20
}

class AddTenant extends Component {

    state = {
        name: undefined,
        url: undefined,
        username: undefined,
        password: undefined,
        driverClassName: undefined
    }

    getData = () => {
        axios.post("/tenant", this.state).then(response => {
            if (response !== undefined) {
                window.location.href = "/";
            }
        }, error => {
            this.setState({ errorMessage: error.response.data.message });
            console.log(error.response.data.message);
        })
    }


    onChangeName = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    onChangeUrl = (event) => {
        this.setState({
            url: event.target.value
        })
    }

    onChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    onChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };


    render() {

        return (
            <Container component="main" maxWidth="xs" style={style}>
                <h2>To create new Tenant please fill such field:</h2>
                <CssBaseline/>
                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                <div>
                    <TextField
                        onChange={this.onChangeName}
                        variant="outlined"
                        margin="normal"
                        //required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                    />
                    <TextField
                        onChange={this.onChangeUrl}
                        variant="outlined"
                        margin="normal"
                        //required
                        fullWidth
                        name="url"
                        label="Url"
                        type="url"
                        id="url"
                        autoComplete="current-url"
                    />
                    <TextField
                        onChange={this.onChangeUsername}
                        variant="outlined"
                        margin="normal"
                        //required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        onChange={this.onChangePassword}
                        variant="outlined"
                        margin="normal"
                        //required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />

                    <Grid>
                        <FormControl variant="outlined" style={formControl}>
                            <InputLabel ref="" htmlFor="outlined-age-native-simple">
                                Driver Class Name
                            </InputLabel>
                            <Select
                                native
                                value={this.state.tenant}
                                onChange={this.handleChange('driver_class')}
                                labelWidth={110}
                                inputProps={{
                                    name: 'driver_class',
                                    id: 'outlined-age-native-simple',
                                }}
                            >
                                <option value="" />
                                <option value={10}>Postgres</option>
                                <option value={20}>MySQL</option>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.getData}
                    >Save
                    </Button>

                </div>
            </Container>
        );
    }
}


export default AddTenant;