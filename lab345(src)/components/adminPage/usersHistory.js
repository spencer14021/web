import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import UsersHistoryList from "./usersHistoryList";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import UsersHistoryByDateList from "./usersHistoryByDateList";
import DeletedUsersList from "./deletedUsersList";
import {Toolbar} from "@material-ui/core";
import axios from "../../utils/axios";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 1200,
    },
}));
const rootStyle = {
    width: 1200,
}


class UsersHistory extends Component {
    // classes = useStyles();
    //  theme = useTheme();
    state = {
        selectedDate: undefined,
        value: 0,
        users: []
        // classes : useStyles(),
        // theme : useTheme()
    }

    handleChange = (event, newValue) => {
        this.setState({value: newValue});
    };

    handleChangeIndex = (index) => {
        this.setState({value: index});
    };

    handleDataChanges = date => {
        this.setState({selectedDate:date});
        let url = `/${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        console.log(url);

        axios.get(`/bydate${url}`).then(response => {
            console.log(response.data);
            this.setState({users: response.data, value: 1}, ()=> console.log(this.state.users));
        });
        console.log(this.state.value);
    }

    render() {

        return (
            <div
                // style={rootStyle}
            >
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                         variant="fullWidth"
                        // aria-label="full width tabs example"
                    >
                        <Tab label="All History" style={{wight:500}} {...a11yProps(0)} />
                        {/*<Tab label="Non Approved Users" {...a11yProps(1)} >*/}
                        <MuiPickersUtilsProvider utils={DateFnsUtils} style={{wight:500}} {...a11yProps(1)}>
                            {/*<Grid container justify="space-around">*/}
                                <KeyboardDatePicker
                                    disableToolbar
                                    disableFuture
                                    autoOk
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="choose history by date"
                                    value={this.state.selectedDate}
                                    onChange={this.handleDataChanges}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            {/*</Grid>*/}
                        </MuiPickersUtilsProvider>
                        {/*</Tab>*/}
                        <Tab label="All deleted accounts" style={{wight:400}} {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    // axis={this.state.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={this.state.value}
                    onChangeIndex={this.handleChangeIndex}
                >
                    <TabPanel value={this.state.value} index={0}
                        // dir={this.state.theme.direction}
                    >
                        <UsersHistoryList/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}
                        // dir={this.state.theme.direction}
                    >
                        <UsersHistoryByDateList users={this.state.users}/>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={2}
                        // dir={this.state.theme.direction}
                    >
                        <DeletedUsersList/>
                    </TabPanel>
                </SwipeableViews>
            </div>
        );
    }
}

export default UsersHistory;