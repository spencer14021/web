import React, {Component} from "react";
import Pagination from "@material-ui/lab/Pagination";

class CustomPagination extends Component {
    state = {
        activePage: this.props.activePage,
        totalPages: this.props.totalPages,
        itemsCountPerPage: this.props.itemsCountPerPage,
        totalItemsCount: this.props.totalItemsCount,
        onChange: this.props.onChange,
    };

    render() {
        return (
                <Pagination
                    hideNavigation
                    page={this.props.activePage}
                    itemsCountPerPage={this.props.itemsCountPerPage}
                    totalItemsCount={this.props.totalItemsCount}
                    count={this.props.totalPages}
                    showFirstButton={true}
                    showLastButton={true}
                    itemClass='page-item'
                    linkClass='btn btn-light'
                    onChange={this.props.onChange}
                />
        );
    }
}

export default CustomPagination;