import React, {Component} from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Alert from "@material-ui/lab/Alert";
import axios from "../../../utils/axios";
import MaterialTable from "material-table";
import CustomPagination from "../../pagination/customPagination";


const columns = [
    {title: "Email", field: 'principal'}
];

const paginationStyle = {
    padding: 20
};

const itemsNumber = 5;

const noError = '';

class AddPermission extends Component {
    state = {
        id: this.props.match.params.id,
        recipient: "",
        users: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        errorMessage: "",
    };

    getData = (pageNumber) => {
        axios.get(`/group/permission/${this.state.id}?page=${pageNumber}&pageSize=${itemsNumber}`).then(
            response => {
                let users = response.data.content;
                let totalPages = response.data.totalPages;
                let itemsCountPerPage = response.data.numberOfElements;
                let totalItemsCount = response.data.totalElements;
                this.setState({
                    users: users,
                    totalPages: totalPages,
                    itemsCountPerPage: itemsCountPerPage,
                    totalItemsCount: totalItemsCount
                });
            },
            error => {
                this.setState({errorMessage: error.response.data.message});
            })
    };

    componentDidMount() {
        this.getData(this.state.activePage);
    }

    goBack = () => {
        this.props.history.goBack();
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber});
        this.getData(pageNumber);
    };

    handleDeleteItem = () => {
        return this.state.totalItemsCount % 5 === 0;
    };

    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={3}>
                    <Box mx="auto">
                        <Box mt={1}>
                            <Button
                                variant="contained"
                                startIcon={<ArrowBackIosIcon/>}
                                onClick={this.goBack}
                            >Go Back</Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <h1>Permissions</h1>
                    <Box mt={1}>
                        {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                        <MaterialTable
                            title="Users"
                            columns={columns}
                            data={this.state.users}
                            editable={{
                                onRowAdd: newData => {
                                    axios.post(`/group/permission`, {
                                        id: this.state.id,
                                        recipient: newData.principal
                                    }).then(
                                        response => {
                                            this.setState({errorMessage: noError})
                                        },
                                        error => {
                                            this.setState({errorMessage: error.response.data.message});
                                        })
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getData(this.state.activePage);
                                            resolve();
                                        }, 600);
                                    })
                                },
                                onRowDelete: oldData => {
                                    axios.delete("group/permission", {
                                        data: {
                                            id: this.state.id,
                                            recipient: oldData.principal
                                        }
                                    }).then(
                                        response => {
                                            this.setState({
                                                errorMessage: noError,
                                                totalItemsCount: (this.state.totalItemsCount - 1)
                                            });
                                            if (this.handleDeleteItem()) {
                                                let newActivePage = (this.state.activePage - 1);
                                                this.setState({activePage: newActivePage})
                                            }
                                        },
                                        error => {
                                            this.setState({errorMessage: error.response.data.message});
                                        }
                                    );
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getData(this.state.activePage);
                                            resolve();
                                        }, 600);
                                    })
                                }
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
                    </Box>
                </Grid>
            </Grid>
        );
    }
}

export default AddPermission;