import React, {Component} from 'react';
import axios from '../../utils/axios';
import ResourceTemplateItem from './resourceTemplateItem';
import {Button, Grid} from '@material-ui/core';
import {getUserRole} from '../../service/authService';
import CustomPagination from "../pagination/customPagination";
import SearchView from "./search/searchView";

const style = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
};

const gridStyle = {
    marginTop: 40
};
const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff',
    marginTop: 40
};

const itemsNumber = 9;

const paginationStyle = {
    padding: 20
};

class ResourceTemplateList extends Component {

    state = {
        resourceTemplates: [],
        activePage: 1,
        totalPages: 0,
        itemsCountPerPage: 0,
        totalItemsCount: 0,
        searchCriteria: "",
        oldSearchCriteria: "Foo"
    };

    setSearchCriteria = (searchCriteria) => {
        this.setState({searchCriteria});
    };

    setRecordsData = (resourceTemplates, totalPages, itemsCountPerPage, totalItemsCount) => {
        this.setState({resourceTemplates, totalPages, itemsCountPerPage, totalItemsCount});
    };

    getData = (pageNumber) => {
        let activePage = this.state.activePage;
        if (this.state.oldSearchCriteria !== this.state.searchCriteria) {
            activePage = 1;
        }
        let url = `resource-template?page=${activePage}&pageSize=${itemsNumber}`;
        if (this.state.searchCriteria.length > 8) {
            url = `${this.state.searchCriteria}&page=${activePage}&pageSize=${itemsNumber}`;
        }
        axios.get(url).then(response => {
            let resourceTemplates = response.data.content;
            let message = resourceTemplates.length === 0 ? "There is no resource templates to display" : "";
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                resourceTemplates: resourceTemplates,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount,
                activePage: activePage,
                oldSearchCriteria: this.state.searchCriteria,
                message: message
            });

        })
    };

    getAllPublishedTemplates = (pageNumber) => {
        let activePage = this.state.activePage;
        if (this.state.oldSearchCriteria !== this.state.searchCriteria) {
            activePage = 1;
        }
        let url = `resource-template/published?page=${activePage}&pageSize=${itemsNumber}`;
        if (this.state.searchCriteria.length > 8) {
            url = `${this.state.searchCriteria}&page=${activePage}&pageSize=${itemsNumber}`;
        }
        axios.get(url).then(response => {
            let resourceTemplates = response.data.content;
            let message = resourceTemplates.length === 0 ? "There is no resource templates to display" : "";
            let totalPages = response.data.totalPages;
            let itemsCountPerPage = response.data.numberOfElements;
            let totalItemsCount = response.data.totalElements;
            this.setState({
                resourceTemplates: resourceTemplates,
                totalPages: totalPages,
                itemsCountPerPage: itemsCountPerPage,
                totalItemsCount: totalItemsCount,
                activePage: activePage,
                oldSearchCriteria: this.state.searchCriteria,
                message: message
            });
        })
    };

    componentDidMount() {
        if (getUserRole() === "ROLE_MANAGER") {
            this.getData(this.state.activePage);
        } else {
            this.getAllPublishedTemplates(this.state.activePage);
        }
    }

    handlePageChange = (event, pageNumber) => {
        if (getUserRole() === "ROLE_MANAGER") {
            this.setState({activePage: pageNumber}, () => this.getData());
        } else {
            this.setState({activePage: pageNumber}, () => this.getAllPublishedTemplates());
        }
    };

    getSearch = (pageNumber) => {
        if (getUserRole() === "ROLE_MANAGER") {
            this.getData(pageNumber);
        } else {
            this.getAllPublishedTemplates(pageNumber);
        }
    };

    goToCreateResource = () => {
        this.props.history.push("/resource-template/create");
    };

    render() {

        let showTemplateListOrErrorMessage = (this.state.resourceTemplates.length !== 0) ?
            (
                <div style={style}>
                    {this.state.resourceTemplates.map((item) =>
                        (<ResourceTemplateItem key={item.id}
                                               item={item}/>)
                    )}
                </div>
            ) : (<p className={"messageAboutEmptyTable"}>{this.state.message}</p>);

        let userLinks = (getUserRole() === "ROLE_MANAGER") ?
            (
                <Button
                    variant="contained"
                    style={buttonStyle}
                    onClick={this.goToCreateResource}>Create template</Button>
            ) : (
                <div/>
            );

        return (
            <div>
                {userLinks}
                <Grid container spacing={1} style={gridStyle}>
                    <Grid item xs/>
                    <Grid item xs={10}>
                        <SearchView label="Search"
                                    resourceTemplate={this.state.resourceTemplate}
                                    setRecordsData={this.setRecordsData}
                                    setSearchCriteria={this.setSearchCriteria}
                                    getData={this.getSearch}/>
                        <div style={style}>
                            {showTemplateListOrErrorMessage}
                        </div>
                    </Grid>
                    <Grid item xs/>
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
                </Grid>
            </div>
        );
    }
}

export default ResourceTemplateList;