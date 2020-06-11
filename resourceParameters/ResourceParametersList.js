import React, {Component} from 'react';
import ResourceParameterItem from "./ResourceParameterItem";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

class ResourceParametersList extends Component {

    render() {
        return (
            <div>
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">Name</TableCell>
                                <TableCell align="right">ParameterType</TableCell>
                                <TableCell align="right">Related Template</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.resourceParameters.map((item) =>
                                (<ResourceParameterItem key={item.id}
                                                        item={item}
                                                        resTempId={this.props.resTempId}
                                                        getData={this.props.getData}/>)
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        );
    }
}

export default ResourceParametersList;