import React, {Component} from 'react';
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import ResourceRecordItem from "./ResourceRecordItem";

class ResourceRecordList extends Component {
    state = {
        headers: [],
        data: this.props.records,
        relatedResourceTableName: ''
    };

    componentDidMount() {
        let relatedResourceTableName = '';
        let headers = [
            {name: "Name", columnName: "name"},
            {name: "Description", columnName: "description",},
            {name: "Photo", columnName: "photos",}];
        this.props.resourceTemplate.resourceParameters.forEach(element => {
            if (element.parameterType === "RANGE_DOUBLE" || element.parameterType === "RANGE_INT") {
                headers.push({name: element.name + "_from", columnName: element.columnName + "_from"});
                headers.push({name: element.name + "_to", columnName: element.columnName + "_to"})
            } else if (element.parameterType === "COORDINATES_STRING") {
                headers.push({name: element.name + " Coordinates", columnName: element.columnName + "_coordinate"})
            } else if (element.parameterType === "POINT_REFERENCE") {
                relatedResourceTableName = element['relatedResourceTemplateTableName'];
                headers.push({
                    name: element.name,
                    columnName: element.columnName + "_ref_name",
                });
            } else {
                headers.push({name: element.name, columnName: element.columnName})
            }
        });

        this.setState({
            headers: headers,
            relatedResourceTableName: relatedResourceTableName,
        });
    }

    render() {
        return (
            <>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {this.state.headers.map(element => <TableCell key={element.name}
                                                                              align="right">{element.name}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.records.map((item) =>
                                (<ResourceRecordItem key={item.id}
                                                     item={item}
                                                     tableName={this.props.tableName}
                                                     relatedResourceTableName={this.state.relatedResourceTableName}
                                                     headers={this.state.headers}
                                                     getRecordsData={this.props.getRecordsData}
                                                     resourceTemplate={this.props.resourceTemplate}/>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
        );
    }
}

export default ResourceRecordList;