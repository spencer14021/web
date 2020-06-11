import React, { Component } from "react";
import TextField from "../inputField/inputField";


class SearchResourceTemplate extends Component {

    state = {
        searchText: undefined
    }

    onChangeSearchText = (event) => {
        this.setState({
            searchText: event.target.value
        })
    }

    

    render() {
        return (
        <div>
            <div>{this.state.searchText}</div>
            <TextField type="text" label="search" onChange={this.onChangeSearchText}/>
        </div>
        );
    }

}

export default SearchResourceTemplate;