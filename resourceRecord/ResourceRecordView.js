import React, {Component} from 'react';
import axios from "../../utils/axios";
import ResourceRecordList from "./ResourceRecordList";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ResourceRecordCreate from "./ResourceRecordCreate";
import CustomPagination from "../pagination/customPagination";
import {getUserRole} from "../../service/authService";
import FilterView from "./filters/filterView";
import Hidden from "@material-ui/core/Hidden";

const itemsNumber = 5;

const paginationStyle = {
    padding: 20
};

class ResourceRecordView extends Component {

    state = {
        records: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        resourceTemplate: "",
        tableName: this.props.match.params.tableName,
        openDialog: false,
        filters: "",
        oldFilter: "Foo"
    };
    setFilters = (filters) => {
        this.setState({filters});
    };

    getRecordsData = (pageNumber) => {
        let activePage = this.state.activePage;
        if (this.state.oldFilter !== this.state.filters) {
            activePage = 1;
        }
        let url = `/resource/${this.state.tableName}?page=${activePage}&pageSize=${itemsNumber}`;
        if (this.state.filters.length > 8) {
            url = `/${this.state.tableName}/filter?page=${activePage}&pageSize=${itemsNumber}&${this.state.filters}`;
        }
        axios.get(url).then(response => {
            let records = response.data.content;
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                records: records,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount,
                activePage: activePage,
                oldFilter: this.state.filters
            });
        })
    };

    setRecordsData = (records, totalPages, itemsCountPerPage, totalItemsCount) => {
        this.setState({records, totalPages, itemsCountPerPage, totalItemsCount});
        this.forceUpdate();
    };

    getResourceTemplateData = () => {
        axios.get(`/resource-template/table/${this.state.tableName}`).then(response => {
            this.setState({resourceTemplate: response.data})
        })
    };

    handleClose = () => {
        this.setState({openDialog: false})
    };

    handleOpen = () => {
        this.setState({openDialog: true})
    };

    handlePageChange = (event, pageNumber) => {
        this.setState({activePage: pageNumber}, () => this.getRecordsData());
    };

    verifyUser = () => {
        return getUserRole() === "ROLE_REGISTER";
    };

    componentDidMount() {
        this.getResourceTemplateData();
        this.getRecordsData(this.state.activePage);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>{this.state.resourceTemplate.name}</h1>
                    <h3>{this.state.resourceTemplate.description}</h3>
                </div>
                <Hidden mdUp={!this.verifyUser()}>
                    <Button style={{ marginBottom: 40 }}
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircleIcon/>}
                        onClick={this.handleOpen}>
                        Add record
                    </Button>
                </Hidden>
                <Grid container spacing={3}>
                    <Grid item xs={1}/>
                    <Grid item xs={10}>
                        <FilterView label="Filter"
                                    resourceTemplate={this.state.resourceTemplate}
                                    setRecordsData={this.setRecordsData}
                                    setFilters={this.setFilters}
                                    getData={this.getRecordsData}/>
                        {this.state.resourceTemplate &&
                        <ResourceRecordList
                            tableName={this.state.tableName}
                            records={this.state.records}
                            resourceTemplate={this.state.resourceTemplate}
                            getRecordsData={this.getRecordsData}
                        />}
                    </Grid>
                    <Grid item xs={3}/>
                    <Grid item xs={3}/>
                </Grid>
                <Grid container
                      style={paginationStyle}
                      justify="center">
                    <CustomPagination
                        activepage={this.state.activePage}
                        totalPages={this.state.totalPages}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        onChange={this.handlePageChange}
                    />
                </Grid>
                <Dialog fullWidth={true}
                        onClose={this.handleClose}
                        aria-labelledby="simple-dialog-title"
                        open={this.state.openDialog}>
                    <DialogTitle id="simple-dialog-title">Create new {this.state.resourceTemplate.name}</DialogTitle>

                    <ResourceRecordCreate handleClose={this.handleClose}
                                          tableName={this.state.tableName}
                                          resourceTemplate={this.state.resourceTemplate}
                                          getRecordsData={() => this.getRecordsData(this.state.activePage)}
                    />

                </Dialog>
            </div>
        );
    }
}

export default ResourceRecordView;