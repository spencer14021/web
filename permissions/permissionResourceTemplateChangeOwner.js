import React, { Component } from 'react';
import { TextField, Button, Grid, Box, FormControl, Container } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MaterialTable from 'material-table';
import Alert from '@material-ui/lab/Alert';
import { getUserRole } from '../../service/authService';
import axios from '../../utils/axios';
import CustomPagination from "../pagination/customPagination";

const formStyles = {
    marginBottom: 30
};

const itemsNumber = 5;

const paginationStyle = {
    padding: 20
};

const columns = [
    { title: 'Email', field: 'email' },
    { title: 'First Name', field: 'firstName' },
    { title: 'Last Name', field: 'lastName' },
    { title: 'Role', field: 'role.name' }
];

const successMessage = "owner was successfully changed";

class PermissionResourceTemplateChangeOwner extends Component {

    state = {
        id: this.props.id,
        name: undefined,
        recipient: "",
        data: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        successMessage: "",
        errorMessage: ''
    };

    changeOwner = () => {
        axios.post("/resource-template/permission/owner", this.state).then(response => {
            this.setState({
                successMessage: successMessage,
                errorMessage: ""
            });
        }, error => {
            this.setState({
                errorMessage: error.response.data.message,
                successMessage: ""
            });
        });
        console.log(this.state);
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

    getUsers = (pageNumber) => {
        axios.get(`/user?page=${pageNumber}&pageSize=${itemsNumber}`).then(
            response => {
                let data = response.data.content;
                let totalPages = response.data.totalPages;
                let itemsCountPerPage = response.data.numberOfElements;
                let totalItemsCount = response.data.totalElements;
                this.setState({
                    data: data,
                    totalPages: totalPages,
                    itemsCountPerPage: itemsCountPerPage,
                    totalItemsCount: totalItemsCount
                });
            }).catch(error => {

            })

    };


    onChangeRecipient = (event) => {
        let recipient = event.target.value;
        this.setState({ recipient });
    };

    isValid = () => {
        return this.state.recipient !== "";
    };


    componentDidMount = () => {
        this.getData();
        this.getUsers(this.state.activePage);
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({ activePage: pageNumber });
        this.getUsers(pageNumber);
    };


    render() {
        return (
            <Grid container
                direction="row"
                justify="center"
                alignItems="center">
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                    </Grid>
                    <Grid item xs={8}>
                        <h1>Change Owner to {this.state.name}</h1>
                    </Grid>
                    <Grid item xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    <Container maxWidth="md">
                            <MaterialTable
                                title="Users"
                                columns={columns}
                                data={this.state.data}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Choose',
                                        onClick: (event, data) => {
                                            this.setState({
                                                recipient: data.email
                                            });
                                        }
                                    }
                                ]}
                                editable={{
                                    onRow: (newData, oldData) =>
                                        new Promise(resolve => {
                                            setTimeout(() => {
                                                resolve();
                                                if (oldData) {
                                                    this.setState(prevState => {
                                                        const data = [...prevState.data];
                                                        data[data.indexOf(oldData)] = newData;
                                                        return { ...prevState, data };
                                                    });
                                                }
                                            }, 600);
                                        }),
                                }}
                                options={{
                                    actionsColumnIndex: -1,
                                    paging: false,
                                    search: false
                                }}
                            />
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
                        </Container>
                    </Grid>
                    <Grid item xs={4}>
                        <Box mx={7}>
                            <Box mt={5}
                                display="flex"
                                flexDirection="column">
                                {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                                {this.state.successMessage &&
                                    <Alert severity="success">{this.state.successMessage}</Alert>}
                                <FormControl style={formStyles}>
                                    <TextField type="text" label="recipient" value={this.state.recipient}
                                        onChange={this.onChangeRecipient} />
                                </FormControl>
                                <Button variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={!this.isValid()}
                                    onClick={this.changeOwner}
                                >Change Owner</Button>
                            </Box>
                        </Box>
                    </Grid>

                </Grid>
            </Grid>
        );
    }
}

export default PermissionResourceTemplateChangeOwner;