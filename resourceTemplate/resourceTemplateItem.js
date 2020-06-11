import React, {Component} from 'react';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import {getUserRole} from "../../service/authService";

const cardStyle = {
    maxWidth: 300,
    minWidth: 250,
    margin: 10,

};

const linkStyle = {
    textDecoration: 'none'
};

class ResourceTemplateItem extends Component {

    state = {
        id: this.props.item.id,
        name: this.props.item.name,
        tableName: this.props.item.tableName,
        description: this.props.item.description,
        isPublished: this.props.item.isPublished,
        userId: this.props.item.userId,
        resourceParameters: this.props.item.resourceParameters
    };

    render() {
        let userLink = (getUserRole() === "ROLE_MANAGER") ?
            (<Link to={`/resource-template/view/${this.state.id}`} style={linkStyle}>
                    <Card style={cardStyle}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            ) : (
                <Link to={`/resource/${this.state.tableName}`} style={linkStyle}>
                    <Card style={cardStyle}>
                        <CardActionArea>
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {this.state.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    {this.state.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Link>
            );
        return (
            <>
                {userLink}
            </>
        );
    }
}

export default ResourceTemplateItem;