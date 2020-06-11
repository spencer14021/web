import React, {Component} from 'react';

import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Avatar from "@material-ui/core/Avatar";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import axios from "../../utils/axios";
import MyDialog from "../resourceTemplate/popUp";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import UserHistoryItem from "../adminPage/userHistoryItem";
import DialogActions from "@material-ui/core/DialogActions";


const linkStyle = {
    textDecoration: 'none'
}

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

class UserItem extends Component {

    state = {
        id: this.props.item.id,
        revtype:this.props.item.revtype,
        reset_token:this.props.item.reset_token,
        to_timestamp: this.props.item.to_timestamp,
        firstName: this.props.item.firstName,
        lastName: this.props.item.lastName,
        email: this.props.item.email,
        phone: this.props.item.phone,
        password: this.props.item.password,
        enabled: this.props.item.enabled,
        imageUrl: this.props.item.image_url,
        role: this.props.item.role,
        userHistory: [],
        open: false
    }


    handleClickOpen = () => {
        this.setState({open: true}, ()=>this.getHistoryData());
    }

    handleClose = () => {
        this.setState({open: false});
    }
    getHistoryData = () => {
        axios.get(`/user/${this.state.id}`).then(response => {
            this.setState({userHistory: response.data});
            console.log(this.state.userHistory)
        })
    }

    handleOpenDialogDelete = () => {
        this.setState({openDialogDelete: true})
    };

    handleCloseDialogDelete = () => {
        this.setState({openDialogDelete: false});
    };
    delete = () => {
        axios.put(`/admin/user/${this.state.id}`).then(
            response => {
                this.props.getAllAccounts();
            }).catch(error => {
            this.setState({
                errorMessage: error.response.data.message,
                openDialogDelete: false
            });
            console.log(error.response.data.message);
        })
        this.setState({
            openDialogDelete: false
        });

    }


    handleChange = (event) => {
        this.setState({enabled: event.target.checked},()=>{
            axios.put(`/admin/user/${this.state.id}`).then()
        })
    }

    setRole = (event) => {
        let roleName = event.target.value;
        let roleId = 1;
        switch (roleName) {
            case "ROLE_ADMIN":
                roleId = 1;
                break;
            case "ROLE_REGISTER":
                roleId = 2;
                break;
            case "ROLE_MANAGER":
                roleId = 3;
                break;
            case "ROLE_USER":
                roleId = 4;
                break;
            case "ROLE_GUEST":
                roleId = 5;
                break;

        }
        this.setState({roleId, roleName}, () => {
            axios.patch(`/admin/user/${this.state.id}`,
                {
                    id: this.state.roleId,
                    name: this.state.roleName
                }
            ).then(response => {
                this.props.getAllAccounts()
                console.log(this.state.userHistory)
            })
        })

    }


    render() {
        return (

            <TableRow>
                <StyledTableCell scope="row">
                    <div onClick={this.handleClickOpen} style={{cursor: "pointer"}}>
                        <Avatar src={this.state.imageUrl}/>
                    </div>
                </StyledTableCell>
                <Dialog
                    fullWidth={'true'}
                    maxWidth={'xl'}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="max-width-dialog-title">
                    <DialogTitle id="max-width-dialog-title">{this.state.firstName} {this.state.lastName} </DialogTitle>
                    <DialogContent>
                        <TableContainer component={Paper}
                                        style={{weight: 600}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell align="right">Avatar</TableCell>
                                        <TableCell align="right"/>
                                        <TableCell align="right">Name</TableCell>
                                        <TableCell align="right">Last name</TableCell>
                                        <TableCell align="right">Email</TableCell>
                                        <TableCell align="right">Phone</TableCell>
                                        <TableCell align="right">Role</TableCell>
                                        <TableCell align="right"/>
                                        <TableCell align="right"/>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.userHistory.map((item) =>
                                        (<UserHistoryItem key={item}
                                                          item={item}/>)
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>

                <StyledTableCell align="right">{this.state.email}</StyledTableCell>
                <StyledTableCell align="right">{this.state.firstName}</StyledTableCell>
                <StyledTableCell align="right">{this.state.lastName}</StyledTableCell>
                <StyledTableCell align="right">{this.state.phone}</StyledTableCell>
                <StyledTableCell align="right">{this.props.item.role.name}</StyledTableCell>
                <StyledTableCell align="right">
                        <Button
                             size="small"
                             style={{
                                 align: "right"
                             }}
                            startIcon={<DeleteIcon/>}
                            onClick={this.handleOpenDialogDelete}
                        >
                        </Button>
                        <MyDialog
                            delete={this.delete}
                            open={this.state.openDialogDelete}
                            handleClose={this.handleCloseDialogDelete}
                            title="Delete account"
                            msg="Are you sure you want to drop role?"/>

                </StyledTableCell>
                <StyledTableCell align="right">
                    <FormControlLabel
                        control={
                            <Switch checked={this.state.enabled} onChange={this.handleChange} value="enabled"/>
                        }
                        label="Enable"
                    />
                </StyledTableCell>
                <StyledTableCell align="right">
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.props.item.role.name}
                            onChange={this.setRole}
                        >
                            <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
                            <MenuItem value={"ROLE_REGISTER"}>Register</MenuItem>
                            <MenuItem value={"ROLE_MANAGER"}>Manager</MenuItem>
                            <MenuItem value={"ROLE_USER"}>User</MenuItem>
                            <MenuItem value={"ROLE_GUEST"}>Guest</MenuItem>
                        </Select>
                    </FormControl>
                </StyledTableCell>

            </TableRow>
        )
}
}

export default UserItem;