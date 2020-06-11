import React, {Component} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Box, Button, FormControl, Grid, TextField} from "@material-ui/core";
import axios from "../../utils/axios";
import TenantItem from "./tenantItem";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Alert from "@material-ui/lab/Alert";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import DialogActions from "@material-ui/core/DialogActions";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const formStyles = {
    marginBottom: 20,
};

const itemsNumber=5;

const style={
    marginTop:40
}
const stylebutton={
    marginTop:20
}
const formControl= {
    marginTop: 15,
    minWidth: 395,
    marginBottom: 20
}

class TenantList extends Component {
    state = {
        tenants: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        open: false
    };

    getData = (pageNumber) => {
        axios.get(`/tenant?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let tenants = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                tenants: tenants,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
            console.log(response.data);
        })
    };

    handleClickOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

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
            <div>
                <h1 style={style}>All Tenants</h1>
                <Grid container>
                <Grid item xs={9}></Grid>
                    <Grid item xs={3}>
            <Button
                variant="contained"
                color="primary"
                style={stylebutton}
                onClick={this.handleClickOpen}>Create Tenant</Button>
                </Grid>
                </Grid>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title" align="center">Create tenant</DialogTitle>
                    <DialogContent>
                        <DialogContentText align="center">
                            To create new Tenant please fill such field:
                        </DialogContentText>
                        <Box mx={1}>
                            <Box mt={3}
                                 display="flex"
                                 flexDirection="column">
                                {this.state.errorMessage &&
                                <Alert severity="error">{this.state.errorMessage}</Alert>}
                                {this.state.successMessage &&
                                <Alert severity="success">{this.state.successMessage}</Alert>}

                                <Container component="main" maxWidth="xs">
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

                            </Box>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>



                <Grid container>
                    <Grid item xs={2}></Grid>
                <Grid item xs={8}>
            <TableContainer component={Paper} style={style}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">URL</StyledTableCell>
                            <StyledTableCell align="right">Username</StyledTableCell>
                            <StyledTableCell align="right">Driver Class Name</StyledTableCell>
                            <StyledTableCell align="right">Delete tenant</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.tenants.map((item) =>
                             (<TenantItem key={item}
                                                   item={item}/>)
                         )}
                    </TableBody>
                </Table>
            </TableContainer>
                </Grid>
                </Grid>
            </div>
        );
    }
}

export default TenantList;