import axios from "../../../utils/axios";
import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteIcon from "@material-ui/icons/Delete";
import MyDialog from "../../resourceTemplate/popUp";
import Alert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";

class DocumentCreateDelete extends Component {

    state = {

        selectedFile: [],
        openDialogDelete: false,
        err: ''
    }

    deleteAllDocuments = () => {
        axios.delete(`/resource/${this.props.tableName}/${this.props.id}/deleteDocument`,
            {}).then(r =>
            this.props.getRecordsData());
        this.setState({
            openDialogDelete: false
        });
    }
    handleOpenDialogDelete = () => {
        this.setState({openDialogDelete: true})
    };

    handleCloseDialogDelete = () => {
        this.setState({openDialogDelete: false});
    };
    UploadDocument = () => {
        const formData = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            formData.append('files', this.state.selectedFile[i]);
        }
        axios.put(`/resource/${this.props.tableName}/${this.props.id}/document`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => { this.props.getRecordsData();
        });
    }
    handleClickAddDocument = (event) => {
        var files = [];
        if (this.checkDocumentSize(event) && (this.checkMimeTypeDocument(event))) {
            for (var i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files[i]);
            }
            this.setState({
                selectedFile: files
            }, () => this.UploadDocument());
        }
    };
    checkDocumentSize = (event) => {
        let files = event.target.files;
        let size = 2000000;
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                this.setState({err: 'document is too large, please pick a smaller file'});
                return false
            } else {
                this.setState({err: ('')});
                return true;
            }

        }
    }

    checkMimeTypeDocument = (event) => {
        let files = event.target.files;
        const types = ['application/pdf', 'application/rtf', 'text/plain'];
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                this.setState({err: files[x].type + ' is not a supported format'});
            } else {
                this.setState({err: ('')});
                return true;
            }
        }
    }

    render() {
        return (
            <Grid>
                {this.state.err && <Alert severity="error">{this.state.err}</Alert>}
                <Tooltip title={"Add"}>
                    <IconButton
                        color="secondary"
                        component="label"
                    >
                        <InsertDriveFileIcon fontSize="small" color="action"/>
                        <input type='file' multiple='true'
                               style={{display: "none"}}
                               onChange={this.handleClickAddDocument}
                        />
                    </IconButton >
                </Tooltip>
                <Tooltip title="Delete all">
                    <IconButton
                        color="secondary"
                        component="label"
                        onClick={this.handleOpenDialogDelete}
                    >
                        <DeleteIcon fontSize="small" color="action"/>
                    </IconButton>
                </Tooltip>
                <MyDialog
                    delete={this.deleteAllDocuments}
                    open={this.state.openDialogDelete}
                    handleClose={this.handleCloseDialogDelete}
                    title="Delete all documents"
                    msg="Are you sure you want to delete all documents?"/>
            </Grid>
        )
    }
}

export default DocumentCreateDelete;