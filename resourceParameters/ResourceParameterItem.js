import React, {Component} from 'react';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "../../utils/axios";
import UpdateParameter from "./UpdateParameter";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

class ResourceParameterItem extends Component {

    state = {
        id: this.props.item.id,
        columnName: this.props.item.columnName,
        name: this.props.item.name,
        parameterType: this.props.item.parameterType,
        pattern: this.props.item.pattern,
        resourceRelation: this.props.item.relatedResourceTemplateName,
        isNotEdit: true,
        errorMessage: '',
        open: false
    };

    UNSAFE_componentWillReceiveProps(nextProps) {
        let newData = {}
        if (this.props.item.name !== nextProps.item.name) {
            newData.name = nextProps.item.name
        }
        if (this.props.item.parameterType !== nextProps.item.parameterType) {
            newData.parameterType = nextProps.item.parameterType
        }
        if (this.props.item.pattern !== nextProps.item.pattern) {
            newData.pattern = nextProps.item.pattern
        }
        if (this.props.item.resourceRelation !== nextProps.item.relatedResourceTemplateName) {
            newData.resourceRelation = nextProps.item.relatedResourceTemplateName
        }
        this.setState({...newData})
    }

    delete = () => {
        axios.delete(`/resource-template/${this.props.resTempId}/resource-parameter/${this.state.id}`).then(
            response => {
                this.props.getData();
            }).catch(error => {
            this.setState({
                open: true
            })
            this.setState({errorMessage: error.response.data.message});
        })

    }
    onChangeEdit = () => {
        this.setState({isNotEdit: !this.state.isNotEdit})
    };

    handleClose = () => {
        this.setState({open: false});
    }


    render() {
        let element = this.state.isNotEdit ? (<><TableCell align="right">{this.state.name}</TableCell>
            <TableCell align="right">{this.state.parameterType}</TableCell>
            <TableCell align="right">{this.state.resourceRelation}</TableCell>
            <Tooltip title="Edit">
                <IconButton aria-label="edit" color="secondary" onClick={this.onChangeEdit}>
                    <EditIcon/>
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton aria-label="delete" color="primary" onClick={this.delete}>
                    <DeleteIcon/>
                </IconButton>
            </Tooltip></>) : (<UpdateParameter getData={this.props.getData}
                                               resTempId={this.props.resTempId}
                                               cancelClick={this.onChangeEdit}
                                               id={this.state.id}
                                               name={this.state.name}
                                               parameterType={this.state.parameterType}
        />);

        return (
            <>
                <Snackbar open={this.state.open} autoHideDuration={1500} onClose={this.handleClose}
                          anchorOrigin={{horizontal: 'center', vertical: 'top'}}>
                    <Alert onClose={this.handleClose} severity="error">
                        {this.state.errorMessage}
                    </Alert>
                </Snackbar>
                <TableRow>
                    {element}

                </TableRow>
            </>
        );
    }
}

export default ResourceParameterItem;