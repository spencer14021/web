import React, {Component} from "react";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const BoxStyle = {
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 16
}

class ForgotPasswordMessage extends Component {
    state = {
        email: this.props.match.params.email,
    }

    render() {
        return (
            <Box m={2} style={BoxStyle}>
                <Typography variant='h5' color='primary'>Forgot your TBRM Account password?</Typography>
                <Typography variant='subtitle1' style={BoxStyle} align='center'>We'll send you instructions on how to
                    reset your password on {this.state.email}.
                </Typography>
                <Typography variant='subtitle1' align='center'>
                    If you do not receive an email from us, please check your 'spam' folder and whitelist
                    TBRM so you can receive emails from us.</Typography>
            </Box>

        );
    }
}

export default ForgotPasswordMessage;