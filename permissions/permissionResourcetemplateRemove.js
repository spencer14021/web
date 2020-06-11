import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Alert from '@material-ui/lab/Alert';
import axios from '../../utils/axios';
import CustomPagination from "../pagination/customPagination";

const formStyles = {
    marginBottom: 20,
    minWidth: 100
};

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
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

const paginationStyle = {
    padding: 20
};

const itemsNumber = 5;

const successMessage = "permission was successfully deleted";

class PermissionResourceTemplateRemove extends Component {

    state = {
        id: this.props.id,
        name: undefined,
        permission: "",
        principal: "",
        recipient: "",
        permissions: [],
        open: false,
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        successMessage: '',
        errorMessage: ''
    }

    delete = () => {
        axios.delete("/resource-template/permission", { data: this.state }).then(response => {
            this.setState({
                successMessage: successMessage,
                errorMessage: ""
            });
            this.getPermissions(this.state.activePage);
            console.log(this.getPermissions(this.state.activePage));
        }, error => {
            this.setState({
                errorMessage: error.response.data.message,
                successMessage: ""
            });
        });
    };

    getData = () => {
        axios.get(`/resource-template/${this.state.id}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name
                })
            }).catch(error => {

            })

    };

    getPermissions = (pageNumber) => {
        axios.get(`/resource-template/permission/${this.state.id}?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let permissions = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                permissions: permissions,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount
            });
        })
    };


    onChangeRecipient = (event) => {
        let recipient = event.target.value;
        this.setState({ recipient });
    }

    handleChangePermission = permission => event => {
        this.setState({
            [permission]: event.target.value,
        });
    };

    handleChangePrincipal = principal => event => {
        this.setState({
            [principal]: event.target.value,
        });
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            errorMessage: "",
            successMessage: ""
        });
    };

    choose = (data) => {
        this.setState({
            recipient: data.principal,
            permission: data.permission.toLowerCase()
        });
        this.handleClickOpen();
    };

    isValid = () => {
        return this.state.recipient !== ""
            && this.state.permission !== "" && this.state.principal !== "";
    };

    goBack = () => {
        this.props.history.goBack();
    };

    componentDidMount = () => {
        this.getData();
        this.getPermissions(this.state.activePage);
    };

    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state != nextState) {
    //         return true;
    //     }
    //     return false;
    // }

    handlePageChange = (event, pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.getPermissions(pageNumber);
    };

    render() {
        return (
            <div>
                <Grid>
                    <Grid item xs>
                        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Delete Permission</DialogTitle>
                            <DialogContent dividers={true}>
                                <DialogContentText>
                                    To delete permission to {this.state.name}, please enter recipient, choose permission
                                    and principal.
                                </DialogContentText>
                                <Box mx="auto">
                                    <Box mt={3}
                                        display="flex"
                                        flexDirection="column">
                                        {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                                        {this.state.successMessage &&
                                            <Alert severity="success">{this.state.successMessage}</Alert>}
                                        <FormControl style={formStyles}>
                                            <TextField type="text" label="recipient" value={this.state.recipient}
                                                onChange={this.onChangeRecipient} />
                                        </FormControl>
                                        <FormControl style={formStyles}>
                                            <InputLabel htmlFor="permission">Permission</InputLabel>
                                            <Select
                                                value={this.state.permission}
                                                native
                                                onChange={this.handleChangePermission('permission')}
                                                inputProps={{
                                                    name: 'permission',
                                                    id: 'permission',
                                                }}
                                            >
                                                <option value="" />
                                                <option value="read">READ</option>
                                                <option value="write">WRITE</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl style={formStyles}>
                                            <InputLabel htmlFor="principal">Principal</InputLabel>
                                            <Select
                                                native
                                                onChange={this.handleChangePrincipal('principal')}
                                                inputProps={{
                                                    name: 'principal',
                                                    id: 'principal',
                                                }}
                                            >
                                                <option value="" />
                                                <option value="true">User</option>
                                                <option value="false">Group</option>
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained"
                                            color="secondary"
                                            size="large"
                                            disabled={!this.isValid()}
                                            onClick={this.delete}
                                        >Delete Permission</Button>
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Grid>
                    <Grid item xs={12}>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>Choose</StyledTableCell>
                                        <StyledTableCell>User/Group</StyledTableCell>
                                        <StyledTableCell>Permission</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.permissions.map(item => (
                                        <StyledTableRow key={item.principal + item.permission}>
                                            <StyledTableCell><AddIcon
                                                onClick={() => this.choose(item)} /></StyledTableCell>
                                            <StyledTableCell component="th" scope="row">
                                                {item.principal}
                                            </StyledTableCell>
                                            <StyledTableCell>{item.permission}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Grid container
                                style={paginationStyle}
                                justify="center">
                                <CustomPagination
                                    activepage={this.state.activePage}
                                    totalPages={this.state.totalPages}
                                    itemsCountPerPage={this.state.itemsCountPerPage}
                                    totalItemsCount={this.state.totalItemsCount}
                                    onChange={this.handlePageChange}
                                />
                            </Grid>
                        </TableContainer>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PermissionResourceTemplateRemove;