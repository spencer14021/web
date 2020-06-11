import React, {Component} from 'react';
import {Box, Button, Container, FormControl, Grid, TextField} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Alert from '@material-ui/lab/Alert';
import MaterialTable from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import axios from '../../utils/axios';
import CustomPagination from "../pagination/customPagination";
import PermissionResourceTemplateRemove from './permissionResourcetemplateRemove';
import {createBrowserHistory} from 'history';

const formStyles = {
    marginBottom: 20,
};

const paginationStyle = {
    padding: 20
};

const itemsNumber = 5;

const noError = '';

const successMessage = "permission was successfully added";
const history = createBrowserHistory();

class PermissionResourceTemplateAdd extends Component {

    state = {
        id: this.props.id,
        name: "",
        permission: "",
        principal: "",
        recipient: "",
        users: [],
        groups: [],
        open: false,
        openPermissions: false,
        activePageGroup: 1,
        totalPagesGroup: 0,
        itemsCountPerPageGroup: 0,
        totalItemsCountGroup: 0,
        activePageUser: 1,
        totalPagesUser: 0,
        itemsCountPerPageUser: 0,
        totalItemsCountUser: 0,
        successMessage: "",
        errorMessage: ""
    }

    save = () => {
        axios.post("/resource-template/permission", this.state).then(response => {
            this.setState({
                successMessage: successMessage,
                errorMessage: ""
            });
        }, error => {
            this.setState({
                errorMessage: error.response.data.message,
                successMessage: ""
            });
        })
    }

    getData = () => {
        axios.get(`/resource-template/${this.state.id}`).then(
            response => {
                let data = response.data;
                this.setState({
                    name: data.name
                })
            }).catch(error => {

        })

    }

    getUsers = (pageNumber) => {
        axios.get(`/user?page=${pageNumber}&pageSize=${itemsNumber}`).then(
            response => {
                let users = response.data.content;
                let totalPages = response.data.totalPages;
                let itemsCountPerPage = response.data.numberOfElements;
                let totalItemsCount = response.data.totalElements;
                let data = response.data;

                this.setState({
                    users: users,
                    totalPagesUser: totalPages,
                    itemsCountPerPageUser: itemsCountPerPage,
                    totalItemsCountUser: totalItemsCount
                });
            }).catch(error => {

        })
    }

    getGroups = (pageNumber) => {
        axios.get(`group?page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
            let groups = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                groups: groups,
                totalPagesGroup: totalPages,
                itemsCountPerPageGroup: itemsCountPerPage,
                totalItemsCountGroup: totalItemsCount
            });
        });
    };


    onChangeRecipient = (event) => {
        let recipient = event.target.value;
        this.setState({recipient});
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
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({
            open: false,
            errorMessage: "",
            successMessage: ""
        });
    };
    handleClickOpenPermissions = () => {
        this.setState({openPermissions: true});
    };

    handleClosePermissions = () => {
        this.setState({openPermissions: false});
    };

    isValid = () => {
        return this.state.recipient !== ""
            && this.state.permission !== "" && this.state.principal !== "";
    };


    goBack = () => {
        this.props.history.push(`/resource-template/view/${this.state.id}`);
    };

    goToEditGroup(name) {
        this.props.history.push(`/group/view/${this.state.id}/${name}`);
    }

    handlePageChangeGroup = (event, pageNumber) => {
        this.setState({activePageGroup: pageNumber});
        this.getGroups(pageNumber)
    };

    handlePageChangeUser = (event, pageNumber) => {
        this.setState({activePageUser: pageNumber});
        this.getUsers(pageNumber)
    };

    handleDeleteItem = () => {
        return this.state.totalItemsCountGroup % 5 === 0;
    };

    PaperComponent(props) {
        return (
            <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
                <Paper {...props} />
            </Draggable>
        );
    }

    componentDidMount = () => {
        this.getData();
        this.getUsers(this.state.activePageUser);
        this.getGroups(this.state.activePageGroup);
    };


    render() {
        const userColumns = [
            {title: 'Email', field: 'email'},
            {title: 'First Name', field: 'firstName'},
            {title: 'Last Name', field: 'lastName'},
            {title: 'Role', field: 'role.name'}
        ];
        const groupColumns = [
            {title: 'Name', field: 'name'},
            {title: 'Description', field: 'description'},
        ];
        return (
            <div>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center" spacing={1}>
                    <Grid item xs={2}>
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
                    <Grid item xs={8}>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleClickOpenPermissions}
                        >View/Delete Permissions to {this.state.name}</Button>
                        <Dialog open={this.state.openPermissions} onClose={this.handleClosePermissions}
                                PaperComponent={this.PaperComponent}
                                aria-labelledby="draggable-dialog-title"
                        >
                            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">Permissions</DialogTitle>
                            <DialogContentText>
                                To delete permission click on +
                            </DialogContentText>
                            <DialogContent dividers={true}>
                                <PermissionResourceTemplateRemove id={this.props.id}/>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClosePermissions} color="primary">
                                    Cancel
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Permission</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    To add permission to {this.state.name}, please enter recipient, choose permission
                                    and principal.
                                </DialogContentText>
                                <Box mx={1}>
                                    <Box mt={3}
                                         display="flex"
                                         flexDirection="column">
                                        {this.state.errorMessage &&
                                        <Alert severity="error">{this.state.errorMessage}</Alert>}
                                        {this.state.successMessage &&
                                        <Alert severity="success">{this.state.successMessage}</Alert>}
                                        <FormControl style={formStyles}>
                                            <TextField type="text" label="recipient" value={this.state.recipient}
                                                       onChange={this.onChangeRecipient}/>
                                        </FormControl>
                                        <FormControl style={formStyles}>
                                            <InputLabel htmlFor="permission">Permission</InputLabel>
                                            <Select
                                                native
                                                onChange={this.handleChangePermission('permission')}
                                                inputProps={{
                                                    name: 'permission',
                                                    id: 'permission',
                                                }}
                                            >
                                                <option value=""/>
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
                                                <option value=""/>
                                                <option value="true">User</option>
                                                <option value="false">Group</option>
                                            </Select>
                                        </FormControl>
                                        <Button variant="contained"
                                                color="primary"
                                                size="large"
                                                disabled={!this.isValid()}
                                                onClick={this.save}
                                        >Add Permission</Button>
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
                    <Grid item xs={2}/>
                </Grid>
                <Grid container
                      direction="row"
                      justify="center"
                      alignItems="center" spacing={1}>
                    <Grid item xs={7}>
                        <Container maxWidth="md">
                            <MaterialTable
                                title="Users"
                                columns={userColumns}
                                data={this.state.users}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Choose',
                                        onClick: (event, data) => {
                                            this.setState({
                                                recipient: data.email
                                            });
                                            this.handleClickOpen();
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
                                                        return {...prevState, data};
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
                                    activepage={this.state.activePageUser}
                                    totalPages={this.state.totalPagesUser}
                                    itemsCountPerPage={this.state.itemsCountPerPageUser}
                                    totalItemsCount={this.state.totalItemsCountUser}
                                    onChange={this.handlePageChangeUser}
                                />
                            </Grid>
                        </Container>
                    </Grid>
                    <Grid item xs={5}>
                        <Container maxWidth="md">
                            <MaterialTable
                                title="Groups"
                                columns={groupColumns}
                                data={this.state.groups}
                                actions={[
                                    {
                                        icon: 'add',
                                        tooltip: 'Choose',
                                        onClick: (event, data) => {
                                            this.setState({
                                                recipient: data.name
                                            });
                                            this.handleClickOpen();
                                        }
                                    },
                                    {
                                        icon: 'visibility',
                                        tooltip: 'View Group',
                                        onClick: (event, data) => {
                                            this.goToEditGroup(data.name);
                                        }
                                    }
                                ]}
                                editable={{
                                    onRowAdd: newData => {
                                        axios.post("group", newData).then(response => {
                                            this.setState({errorMessage: noError});
                                            this.getGroups(this.state.activePageGroup);
                                        }, error => {
                                            this.setState({errorMessage: error.response.data.message});
                                        });
                                        return new Promise(resolve => {
                                            setTimeout(() => {
                                                this.getGroups(this.state.activePageGroup);
                                                resolve();
                                            }, 600);
                                        })
                                    },
                                    onRowDelete: oldData => {
                                        axios.delete(`group/${oldData.name}`).then(
                                            response => {
                                                this.setState({
                                                    errorMessage: noError,
                                                    totalItemsCountGroup: (this.state.totalItemsCountGroup - 1)
                                                });
                                                if (this.handleDeleteItem()) {
                                                    let newActivePage = (this.state.activePageGroup - 1);
                                                    this.setState({activePageGroup: newActivePage})
                                                }
                                            },
                                            error => {
                                                this.setState({errorMessage: error.response.data.message});
                                            }
                                        );
                                        return new Promise(resolve => {
                                            setTimeout(() => {
                                                this.getGroups(this.state.activePageGroup);
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
                                    activepage={this.state.activePageGroup}
                                    totalPages={this.state.totalPagesGroup}
                                    itemsCountPerPage={this.state.itemsCountPerPageGroup}
                                    totalItemsCount={this.state.totalItemsCountGroup}
                                    onChange={this.handlePageChangeGroup}
                                />
                            </Grid>

                        </Container>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PermissionResourceTemplateAdd;