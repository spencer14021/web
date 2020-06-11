import axios from "../../../utils/axios";
import React, {Component} from 'react';
import IconButton from "@material-ui/core/IconButton";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import DeleteIcon from "@material-ui/icons/Delete";
import MyDialog from "../../resourceTemplate/popUp";
import Alert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

class PhotosCreateDelete extends Component {

    state = {
        selectedFile: [],
        openDialogDelete: false,
        err: ''
    }

    handleOpenDialogDelete = () => {
        this.setState({openDialogDelete: true})
    };

    handleCloseDialogDelete = () => {
        this.setState({openDialogDelete: false});
    };

    handleClickAddPhoto = (event) => {
        var files = [];
        if (this.checkMimeType(event) && (this.checkFileSize(event))) {
            for (var i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files[i]);
            }
            this.setState({
                selectedFile: files
            }, () => this.UpdatePhoto());
        }
    };

    checkMimeType = (event) => {
        let files = event.target.files;
        const types = ['image/png', 'image/jpeg', 'image/gif'];
        for (var x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                this.setState({err: files[x].type+' is not a supported format'});
            } else {
                this.setState({err: ('')});
                return true;
            }
        }
    }

    checkFileSize = (event) => {
        let files = event.target.files;
        let size = 4000000;
        for (var x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                this.setState({err: 'image is too large, please pick a smaller file'});
                return false
            } else {
                this.setState({err: ('')});
                return true;
            }

        }
    }

    deleteAllPhotos = () => {
        axios.delete(`/resource/${this.props.tableName}/${this.props.id}/deletePhoto`, {}).then(r => {
            this.props.getRecordsData()});
        this.setState({
            openDialogDelete: false
        });
    }

    UpdatePhoto = () => {
        const formData = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            formData.append('files', this.state.selectedFile[i]);
        }
        axios.put(`/resource/${this.props.tableName}/${this.props.id}/updatePhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
            this.props.getRecordsData()
        });
    }

    render() {
        return (
            <div>
                {this.state.err && <Alert severity="error">{this.state.err}</Alert>}
                <Tooltip title={"Add"}>
                    <IconButton
                        color="primary"
                        component="label"
                    >
                        <AddAPhotoIcon/>
                        <input type='file' multiple='true'
                               style={{display: "none"}}
                               onChange={this.handleClickAddPhoto}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete all">
                    <IconButton
                        color="primary"
                        component="label"
                        onClick={this.handleOpenDialogDelete}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                <MyDialog
                    delete={this.deleteAllPhotos}
                    open={this.state.openDialogDelete}
                    handleClose={this.handleCloseDialogDelete}
                    title="Delete all photos"
                    msg="Are you sure you want to delete all photos?"/>
            </div>
        )
    }
}

export default PhotosCreateDelete;