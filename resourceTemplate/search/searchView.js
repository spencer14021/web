import React, {Component} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/axios";
import PointStringField from "./pointStringField";
import PointReferenceField from "./pointReferenceField";
import RadioButton from "./radioButton";
import {getUserRole} from "../../../service/authService";
import Tooltip from "@material-ui/core/Tooltip";
import {Box} from "@material-ui/core";

class SearchView extends Component {
    state = {
        searchCriteria: {},
        isManager: undefined
    };

    setFilter = (name, search) => {
        let searchCriteria = {...this.state.searchCriteria};
        if (search !== "") {
            searchCriteria[name] = search;
        } else {
            delete searchCriteria[name];
        }
        this.setState({searchCriteria}, () => {
            this.props.setSearchCriteria(`/search?search=${Object.values(this.state.searchCriteria).join(',')}`)
        });
    };

    getData = () => {
        this.props.getData();
        // console.log(this.state.searchCriteria);
        // let searchUrl = `/search?search=${Object.values(this.state.searchCriteria).join(',')}`;
        // console.log(searchUrl);
        //
        // axios.get(searchUrl).then(response => {
        //     this.props.setRecordsData(response.data.content)
        // })
    };

    verifyUser = () => {
        const data = {
            criterion: "isPublished='true'"
        };

        if (getUserRole() === "ROLE_REGISTER" || getUserRole() === "ROLE_USER") {
            this.setState({
                isManager: false,
                searchCriteria: Object.values(data)
            });
        } else {
            this.setState({isManager: true});
        }
    };

    componentDidMount() {
        this.verifyUser();
    }

    render() {

        let showFullSearch = this.state.isManager ? (
                <RadioButton setFilter={this.setFilter}
                             name="Is published"
                             columnName={"isPublished"}/>
            ) :
            (
                <div></div>
            );

        return (
            <div className="filterField">
                <Box display="flex"
                     flexDirection="row"
                     flexWrap="wrap"
                     width="95%"
                >
                    <PointStringField setFilter={this.setFilter}
                                      name="Name"
                                      columnName={"name"}/>
                    <PointStringField setFilter={this.setFilter}
                                      name="Description"
                                      columnName={"description"}/>
                    <PointReferenceField setFilter={this.setFilter}
                                         name="User"
                                         columnName={"user"}
                                         setData={this.setData}/>
                    {showFullSearch}
                </Box>
                <div className={"searchIcon"}>
                    <Tooltip title="Search">
                        <IconButton aria-label="search"
                                    color="secondary"
                                    onClick={this.getData}>
                            <SearchIcon/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
        );
    }
}

export default SearchView;