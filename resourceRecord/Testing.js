import React, {Component} from "react";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import axios from "../../utils/axios";
import {Box, CssBaseline} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Grid from "@material-ui/core/Grid";
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';

class Testing extends Component {
    state = {
        selectedFile: [],
        err: ''
    }

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
                // eslint-disable-next-line no-template-curly-in-string
                this.setState({err: (' is not a supported format')});
            }else {
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
                // eslint-disable-next-line no-template-curly-in-string
                this.setState({err: (' is not a supported format')});
            }else {
                this.setState({err: ('')});
                return true;
            }
        }
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


    UpdatePhoto = () => {
        const formData = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            formData.append('files', this.state.selectedFile[i]);
        }
        axios.put("/resource-template/resource/o/3/updatePhoto", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
        });
    }

    UploadDocument= () =>{
        const formData = new FormData();
        for (var i = 0; i < this.state.selectedFile.length; i++) {
            formData.append('files', this.state.selectedFile[i]);
        }
        axios.put("/resource-template/resource/o/3/document", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(r => {
        });
    }

    render() {
        return (
            // eslint-disable-next-line react/jsx-no-undef
            <Grid xl={12}>
                <CssBaseline/>
                {this.state.err && <Alert severity="error">{this.state.err}</Alert>}
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
                <IconButton
                    color="primary"
                    component="label"
                >
                    <InsertDriveFileIcon/>
                    <input type='file' multiple='true'
                           style={{display: "none"}}
                           onChange={this.handleClickAddDocument}
                           />
                </IconButton>
            </Grid>
        )
    }
}

export default Testing;