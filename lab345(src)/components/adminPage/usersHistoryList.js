import React, {Component} from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "../../utils/axios";
import Table from "@material-ui/core/Table";
import UserItem from "./userItem";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";


class UsersHistoryList extends Component {
    state = {
        user: [],
        selectedDate: undefined
    };

    getAllHistory = () => {
        axios.get(`/all_history`).then(response => {
            let allUsers = response.data;
            this.setState({user: allUsers});
        })
    }

    componentDidMount(){
        this.getAllHistory();
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
                                <TableCell align="right">Type</TableCell>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">Last name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.user.map((item) =>
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

export default UsersHistoryList;