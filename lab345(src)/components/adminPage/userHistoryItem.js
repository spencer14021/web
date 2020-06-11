import React, {Component} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Avatar from "@material-ui/core/Avatar";

class UserHistoryItem extends Component{
    state = {
        id: this.props.item.id,
        revtype: this.props.item.revtype,
        reset_token: this.props.item.reset_token,
        to_timestamp: this.props.item.to_timestamp,
        firstName: this.props.item.first_name,
        lastName: this.props.item.last_name,
        email: this.props.item.email,
        phone: this.props.item.phone,
        password: this.props.item.password,
        enabled: this.props.item.enabled,
        imageUrl: this.props.item.image_url,
        role: this.props.item.role,
    }
    render() {
        return (
            <TableRow>
                <TableCell align="right">  {this.state.to_timestamp.replace("T", " ").substring(0, 19)}</TableCell>
                <TableCell align="right">
                        <Avatar src={this.state.imageUrl}/>
                </TableCell>
                <TableCell align="right">{this.state.revtype}</TableCell>
                <TableCell align="right"> {this.state.firstName}</TableCell>
                <TableCell align="right">{this.state.lastName}</TableCell>
                <TableCell align="right">{this.state.email}</TableCell>
                <TableCell align="right">{this.state.phone}</TableCell>
                <TableCell align="right">{this.state.role.substring(5).toLowerCase()}</TableCell>
                <TableCell align="right"> {this.state.reset_token}</TableCell>
                <TableCell align="right"> {this.state.password}</TableCell>
            </TableRow>
        )
    }
}
export default UserHistoryItem;