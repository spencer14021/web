import React, { Component } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Box, Container } from '@material-ui/core';

class GuestPage extends Component{
    
    render(){
        return(
            <Container maxWidth="sm">
                    <Box mx={7}>
                        <Box mt={7}>
                            <Alert severity="info">
                                <AlertTitle>Please wait</AlertTitle>
                            Your data in processing. Admin must verify you
                            </Alert>
                        </Box>
                    </Box>
                </Container>
        );
    }
}

export default GuestPage;