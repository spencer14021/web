import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {getUserRole} from "../../service/authService";
import TableRow from "@material-ui/core/TableRow";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import MyDialog from "../resourceTemplate/popUp";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import {withStyles} from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import axios from "../../utils/axios";


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

class TenantItem extends Component {

    state = {
        id: this.props.item.id,
        name: this.props.item.name,
        url: this.props.item.url,
        username: this.props.item.username,
        password: this.props.item.password,
        driverClassName: this.props.item.driverClassName
    };

    setTenant = (event) => {
        let tenantName = event.target.value;
        let tenantId = 1;
        switch (tenantName) {
            case "org.postgresql.Driver":
                tenantId = 1;
                break;
            case "com.mysql.jdbc.Driver":
                tenantId = 2;
                break;
            case "oracle.jdbc.driver.OracleDriver":
                tenantId = 3;
                break;
        }
        this.setState({tenantId, tenantName}, () => {
            axios.patch(`/tenant/${this.state.id}`,
                {
                    id: this.state.roleId,
                    name: this.state.roleName
                }
            ).then(response => {
                console.log()
            })
        })

    }

    handleOpenDialogDelete = () => {
        this.setState({openDialogDelete: true})
    };

    handleCloseDialogDelete = () => {
        this.setState({openDialogDelete: false});
    };
    delete = () => {
        axios.put(`/tenant/${this.state.id}`).then(
            response => {
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

    render() {
        return (
            <TableRow>
                <StyledTableCell align="right">{this.state.name}</StyledTableCell>
                <StyledTableCell align="right">{this.state.url}</StyledTableCell>
                <StyledTableCell align="right">{this.state.username}</StyledTableCell>
                <StyledTableCell align="right">
                    <StyledTableCell align="right">
                        <FormControl>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={this.state.driverClassName}
                                onChange={this.setTenant}
                            >
                                <MenuItem value={"org.postgresql.Driver"}>Postgres</MenuItem>
                                <MenuItem value={"com.mysql.jdbc.Driver"}>MySql</MenuItem>
                                <MenuItem value={"oracle.jdbc.driver.OracleDriver"}>Oracle</MenuItem>
                            </Select>
                        </FormControl>
                    </StyledTableCell>
                    {this.state.driverClassName}</StyledTableCell>
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
                        msg="Are you sure you want to delete a tenant?"/>

                </StyledTableCell>
            </TableRow>
        );
    }
}

export default TenantItem;