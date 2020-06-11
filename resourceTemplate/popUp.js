import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class MyDialog extends Component {
    render() {
        return (<>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.msg}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.delete} color="primary" autoFocus>
                            Agree
                        </Button>
                        <Button autoFocus onClick={this.props.handleClose} color="primary">
                            Disagree
                        </Button>
                    </DialogActions>
                </Dialog></>
        )
    }
}