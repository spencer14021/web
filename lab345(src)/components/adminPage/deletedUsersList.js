import React, {Component} from 'react';
import axios from '../../utils/axios';
import {ButtonGroup, Button, Grid} from '@material-ui/core';
import UserItem from './userItem';
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import UsersHistoryList from "./usersHistoryList";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const style = {

    display: "flex",
    flexWrap: "wrap",
}

const gridStyle = {
    marginTop: 40
}
const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff'
}
const itemsNumber = 5;

class DeletedUsersList extends Component {

    state = {
        deletedUsers: [],
        allUsers: undefined,
        selectedDate: undefined
    };

    getDeletedAccounts = () => {
        axios.get('/deleted_accounts').then(response => {
            let deletedUsers = response.data;
            this.setState({deletedUsers});
        })
    };


    componentDidMount() {
        this.getDeletedAccounts();
    }

    render() {
        return (
            <Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell align="right">Avatar</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Last name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.deletedUsers.map((item) =>
                                (<UserItem key={item}
                                           item={item}/>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        )
    }
}


export default DeletedUsersList;