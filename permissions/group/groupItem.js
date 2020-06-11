import React, {Component} from "react";
import axios from "../../../utils/axios";
import MaterialTable from "material-table";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {Button, Hidden} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";
import CustomPagination from "../../pagination/customPagination";
import PopupState, {bindMenu, bindTrigger} from "material-ui-popup-state";
import Menu from "@material-ui/core/Menu";
import {Link} from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";

const columns = [
    {title: "First name", field: 'firstName', editable: 'never'},
    {title: "Last name", field: 'lastName', editable: 'never'},
    {title: "Email", field: 'email'}
];

const paginationStyle = {
    padding: 20
};

const linkStyle = {
    textDecoration: 'none'
};

const itemsNumber = 5;

const noError = '';

class GroupItem extends Component {
    state = {
        resTempId: this.props.match.params.id,
        name: this.props.match.params.name,
        id: 0,
        description: "",
        oldName: "",
        oldDescription: "",
        users: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        errorMessage: "",
    };

    getData = () => {
        axios.get(`group/${this.state.name}`).then(response => {
            let data = response.data;
            this.setState({
                id: data.id,
                name: data.name,
                description: data.description,
                oldName: data.name,
                oldDescription: data.description,
            });
            this.getMembers(this.state.activePage);
        })
    };

    getMembers = (pageNumber) => {
        axios.get(`group/member?groupId=${this.state.id}&page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
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
            console.log(response.data);
        })
    };


    goToUpdateData = () => {
        this.props.history.push(`/group/edit/${this.state.resTempId}/${this.state.name}`);
    };

    goBack = () => {
        this.props.history.push(`/resource-template/permission/${this.state.resTempId}`);
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber});
        this.getMembers(pageNumber)
    };

    handleDeleteItem = () => {
        return this.state.totalItemsCount % 5 === 0;
    };

    componentDidMount() {
        this.getData();
    };

    render() {
        return (
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={2}>
                        <Box mt={3}>
                            <Button
                                variant="contained"
                                startIcon={<ArrowBackIosIcon/>}
                                onClick={this.goBack}
                            >Go Back</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <h1>{this.state.name}</h1>
                    </Grid>
                    <Grid item xs={3}>
                        <Box mt={4}>
                            <p>{this.state.description}</p>
                        </Box>
                    </Grid>
                    <Grid item xs={1}>
                        <Box mt={3}>
                            <Button variant="contained"
                                    color="primary"
                                    startIcon={<EditIcon/>}
                                    onClick={this.goToUpdateData}
                            >Edit</Button>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        <Box mt={3}>
                            <Box>
                                <PopupState variant="popover" popupId="demo-popup-menu">
                                    {popupState => (
                                        <React.Fragment>
                                            <Button variant="contained"
                                                    color="primary" {...bindTrigger(popupState)}>
                                                Permissions
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                <Link
                                                    to={`/group/permission/${this.state.id}`}
                                                    style={linkStyle}>
                                                    <MenuItem onClick={popupState.close}>Add/Update
                                                        Permission</MenuItem>
                                                </Link>
                                                <Link
                                                    to={`/group/permission/owner/${this.state.name}`}
                                                    style={linkStyle}>
                                                    <MenuItem onClick={popupState.close}>Change Owner</MenuItem>
                                                </Link>
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={2}/>
                    <Grid item xs={8}>
                        {this.state.errorMessage && <Alert severity="error">{this.state.errorMessage}</Alert>}
                        <MaterialTable
                            title="Members"
                            columns={columns}
                            data={this.state.users}
                            editable={{
                                onRowAdd: newData => {
                                    axios.post("group/member", {
                                        email: newData.email,
                                        groupName: this.state.name
                                    }).then(response => {
                                    }, error => {
                                        this.setState({errorMessage: error.response.data.message})
                                    });
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getMembers(this.state.activePage);
                                            resolve();
                                        }, 600);
                                    })
                                },
                                onRowDelete: oldData => {
                                    axios.delete("group/member", {
                                        data: {
                                            email: oldData.email,
                                            groupName: this.state.name
                                        }
                                    }).then(
                                        response => {
                                            this.setState({errorMessage: noError});
                                            if (this.handleDeleteItem()) {
                                                let newActivePage = (this.state.activePage - 1);
                                                let totalItemsCount = (this.state.totalItemsCount - 1);
                                                this.setState({
                                                    activePage: newActivePage,
                                                    totalItemsCount: totalItemsCount
                                                })
                                            }
                                        },
                                        error => {
                                            this.setState({errorMessage: error.response.data.message});
                                        }
                                    );
                                    return new Promise(resolve => {
                                        setTimeout(() => {
                                            this.getMembers(this.state.activePage);
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
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default GroupItem