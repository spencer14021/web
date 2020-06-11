import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/axios";
import Alert from "@material-ui/lab/Alert";
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import Tooltip from "@material-ui/core/Tooltip";

class PhotoUpload extends Component {

    state = {
        selectedFile: [],
        err: ''
    }

    handleClickAddPhoto = (event) => {
        const files = [];
        if (this.checkMimeType(event) && (this.checkFileSize(event))) {
            for (let i = 0; i < event.target.files.length; i++) {
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
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                this.setState({err: files[x].type +' is not a supported format'});
            }else {
                this.setState({err: ('')});
                return true;
            }
        }
    }

    checkFileSize = (event) => {
        let files = event.target.files;
        let size = 4000000;
        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                this.setState({err: 'image is too large, please pick a smaller file'});
                return false
            } else {
                this.setState({err: ('')});
                return true;
            }

        }
    }

    checkDocumentSize = (event) => {
        let files = event.target.files;
        let size = 2000000;
        for (let x = 0; x < files.length; x++) {
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
        for (let x = 0; x < files.length; x++) {
            if (types.every(type => files[x].type !== type)) {
                this.setState({err: files[x].type +' is not a supported format'});
            }else {
                this.setState({err: ('')});
                return true;
            }
        }
    }

    handleClickAddDocument = (event) => {
        const files = [];
        if (this.checkDocumentSize(event) && (this.checkMimeTypeDocument(event))) {
            for (let i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files[i]);
            }
            this.setState({
                selectedFile: files
            }, () => this.UploadDocument());
        }
    };


    UpdatePhoto = () => {
        const formData = new FormData();
        for (let i = 0; i < this.state.selectedFile.length; i++) {
            formData.append('files', this.state.selectedFile[i]);
        }
        axios.put(`/resource/${this.props.tableName}/${this.props.id}/updatePhoto`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {  this.props.getRecordsData();
        });
    }

    UploadDocument= () =>{
        const formData = new FormData();
        for (let i = 0; i < this.state.selectedFile.length; i++) {
            formData.append('files', this.state.selectedFile[i]);
        }
        axios.put(`/resource/${this.props.tableName}/${this.props.id}/document`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {this.props.getRecordsData();
        });
    }

    render() {
        return (
            <div>

                    <CssBaseline/>
                    {this.state.err && <Alert severity="error">{this.state.err}</Alert>}
                    <Tooltip title="Add photos">
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
                    <Tooltip title="Add documents">
                    <IconButton
                        color="primary"
                        component="label"
                    >
                        <AttachFileIcon/>
                        <input type='file' multiple='true'
                               style={{display: "none"}}
                               onChange={this.handleClickAddDocument}
                        />
                    </IconButton>
                    </Tooltip>


            </div>
        );
    }
}

export default PhotoUpload;