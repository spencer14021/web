import React, {Component} from 'react';
import FilterPointStringField from "./filterPointStringField";
import SearchIcon from '@material-ui/icons/Search';
import FilterPointNumberField from "./filterPointNumberField";
import FilterPointReferenceField from "./filterPointReferenceField";
import FilterRangeNumberField from "./filterRangeNumberField";
import IconButton from "@material-ui/core/IconButton";
import axios from "../../../utils/axios";
import {Box} from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip";

class FilterView extends Component {
    state = {
        filters: {},
    };

    setFilter = (name, filterStr) => {
        let filters = { ...this.state.filters };
        if (filterStr !== "") {
            filters[name] = filterStr;
        } else {
            delete filters[name];
        }
        this.setState({filters}, ()=>{
            this.props.setFilters(`filter=${Object.values(this.state.filters).join(',')}`)
        });
    };

    getData = () => {
        this.props.getData();
    };

    render() {
        let parameters = this.props.resourceTemplate["resourceParameters"] || [];

        return (
            <div className="filterField">
                <Box display="flex"
                     flexDirection="row"
                     flexWrap="wrap"
                     width="95%"
                >
                    <FilterPointStringField setFilter={this.setFilter}
                                            name="Name"
                                            columnName={"name"}/>
                    <FilterPointStringField setFilter={this.setFilter}
                                            name="Description"
                                            columnName={"description"}/>
                    {parameters.map((element, index) => {

                        switch (element["parameterType"]) {
                            case "POINT_REFERENCE":
                                return <FilterPointReferenceField key={index}
                                                                  setFilter={this.setFilter}
                                                                  name={element["name"]}
                                                                  columnName={element["columnName"]}
                                                                  relatedResourceTableName={element["relatedResourceTemplateTableName"]}
                                                                  setData={this.setData}/>;
                            case "POINT_STRING":
                                return <FilterPointStringField key={index}
                                                               setFilter={this.setFilter}
                                                               name={element["name"]}
                                                               columnName={element["columnName"]}/>;
                            case "POINT_DOUBLE":
                                return <FilterPointNumberField key={index}
                                                               setFilter={this.setFilter}
                                                               name={element["name"]}
                                                               columnName={element["columnName"]}/>;
                            case "POINT_INT":
                                return <FilterPointNumberField key={index}
                                                               setFilter={this.setFilter}
                                                               name={element["name"]}
                                                               columnName={element["columnName"]}/>;
                            case "RANGE_DOUBLE":
                                return <FilterRangeNumberField key={index}
                                                               setFilter={this.setFilter}
                                                               name={element["name"]}
                                                               columnName={element["columnName"]}/>;
                            case "RANGE_INT":
                                return <FilterRangeNumberField key={index}
                                                               setFilter={this.setFilter}
                                                               name={element["name"]}
                                                               columnName={element["columnName"]}/>;
                            default:
                                return undefined;
                        }
                    })}
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

export default FilterView;