import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "../../utils/axios";
import UserItem from "./userItem";
import CustomPagination from "../pagination/customPagination";
import {Grid} from "@material-ui/core";

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


const  style={
    marginTop:40
}

const itemsNumber=5;

const paginationStyle = {
    padding: 20
};

class AllDisableAccounts extends Component {
    state = {
        users: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
    };

    componentDidMount() {
        this.getAllDisableUser(this.state.activePage);
    }


    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber});
        this.getAllAccounts(pageNumber);
    };

    goBack = () => {
        this.props.history.goBack();
    };

    getAllDisableUser= (pageNumber) => {
        axios.get(`/admin/users?status=false&page=${pageNumber}&pageSize=${itemsNumber}`).then(response => {
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



    render() {

        return (
            <Grid style={style}>
                <TableContainer component={Paper} style={style}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="right">Avatar</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">First Name</StyledTableCell>
                                <StyledTableCell align="right">Last Name</StyledTableCell>
                                <StyledTableCell align="right">Phone</StyledTableCell>
                                <StyledTableCell align="right">Role</StyledTableCell>
                                <StyledTableCell align="right">Drop Role</StyledTableCell>
                                <StyledTableCell align="right">Enable/disable user</StyledTableCell>
                                <StyledTableCell align="right">Change role</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map((item) => (

                                <UserItem key={item}
                                          item={item}/>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

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
        );
    }
}

export default AllDisableAccounts;


