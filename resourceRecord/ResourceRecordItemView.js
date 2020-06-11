import React, {Component} from 'react';
import Typography from "@material-ui/core/Typography";
import GoogleMap from "../resourceParameters/GoogleMap";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import CloseIcon from '@material-ui/icons/Close';
import ListItem from "@material-ui/core/ListItem";
import DescriptionIcon from '@material-ui/icons/Description';
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import axios from "../../utils/axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from "@material-ui/core/Grid";
import DeleteIcon from "@material-ui/icons/Delete";
import DocumentCreateDelete from "./parametersTypes/documentCreateDelete";
import PhotosCreateDelete from "./parametersTypes/PhotosCreateDelete";
import Link from "@material-ui/core/Link";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";



const dialogContentStyle = {
    display: "flex",
    'margin-top': '15px'
};

class ResourceRecordItemView extends Component {

    state = {
        id: this.props.item.id,
        tableName: this.props.tableName,
        name: this.props.item.name,
        description: this.props.item.description,
        parameters: this.props.item.parameters,
        photos: this.props.item.photos,
        document: this.props.item.document,
        headers: this.props.headers,
        data: this.props.data,
        coordinates: undefined,
        activeStep: 0
        // parameters: undefined
    };

    componentDidMount() {

    }

    deleteCertainPhoto(e, item) {
        axios.delete(`/resource/${this.props.tableName}/${this.props.item.id}/photo/${item.substring(49)}`).then(
            response => {
                this.props.getRecordsData();
            }
        );
    }

    deleteCertainDocument = (event, documentName) => {
        event.preventDefault();
        axios.delete(`/resource/${this.state.tableName}/${this.state.id}/document/${documentName.substring(49)}`).then(
            response =>{
                this.props.getRecordsData();
            }
        );
    }
    getRecordValues = () => {
        this.state.data['description'] = this.props.item['description']
        this.state.data['name'] = this.props.item['name'];
        Object.keys(this.props.item['parameters']).forEach(key => {
            if (key.endsWith('_coordinate')) {
                this.state.coordinates = this.props.item['parameters'][key];
                console.log(this.state.coordinates);
            }
            this.state.data[key] = this.props.item['parameters'][key]
        });
    };

    render() {
        this.getRecordValues();
        console.log(this.state.coordinates);
        let googleMap = (this.state.coordinates !== undefined) ?
            (<div>
                <GoogleMap coordinates={this.state.coordinates}/>
            </div>) : (
                <div>

                </div>);
        console.log(this.state.headers);
        return (

            <div>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={this.props.handleClose} aria-label="close">
                            <CloseIcon/>
                        </IconButton>
                        <Typography variant="h6">
                            {this.props.resourceTemplate.name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={this.props.handleClose}>
                        </Button>
                    </Toolbar>
                </AppBar>
                <div style={dialogContentStyle}>

                    <List>
                        {this.state.headers.map((element, index) => {
                            let e;
                            if (element.columnName.endsWith('_coordinate')) {
                                e = (<ListItem container>
                                        <ListItemText key={index} align="center" primary={element.name}
                                                      secondary={this.state.data[element.columnName].map(key => (
                                                          <div>{`lat:${key['lat']} lng:${key['lng']}`}</div>
                                                      ))}/>

                                    </ListItem>
                                );
                            } else if(!element.columnName.endsWith('photos')) {
                                e = (<ListItem container>
                                        <ListItemText key={index} align="center" primary={element.name}
                                                      secondary={this.state.data[element.columnName]}/>
                                    </ListItem>
                                );
                            }
                            return e;
                        })
                        }
                        <Grid>
                            <ExpansionPanel>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header"
                                >
                                    <Typography>Documents </Typography>
                                    <div style={{textAlign: "right"}}>
                                        <DocumentCreateDelete  getRecordsData={this.props.getRecordsData}
                                                               tableName={this.state.tableName} id={this.state.id}/>
                                    </div>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    {this.props.item.document && (
                                        this.props.item.document.substring(0, this.props.item.document.length - 1)
                                            .split(",").map((item, number) => (
                                            <Grid alignItems={"center"} justify={"center"}>
                                                <Link href={item} target={"_blank"}>
                                                    {/*    <ListItemIcon>*/}
                                                    {/*        <DescriptionIcon />*/}
                                                    {/*    </ListItemIcon>*/}
                                                    <div style={{display: "inline"}}>
                                                        <DescriptionIcon color={"primary"}/>file{number}</div>
                                                </Link>

                                                <IconButton
                                                    // color="secondary"
                                                    component="label"
                                                    onClick={(e) => this.deleteCertainDocument(e, item)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                            </Grid>
                                        )))}
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Grid>
                        <Grid item xs={1}/>
                        <div>
                            <Typography align="center">Photos <PhotosCreateDelete getRecordsData={this.props.getRecordsData}
                                tableName={this.state.tableName} id={this.state.id}/></Typography>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                justifyContent: 'space-around',
                                overflow: 'hidden'
                            }}>
                                <GridList
                                    cellHeight={160}
                                    style={{
                                        width: 600,
                                        height: 450,
                                    }}
                                    cols={3}
                                >
                                    {this.props.item.photos && (
                                        this.props.item.photos.substring(0, this.props.item.photos.length - 1)
                                            .split(",").map((item) => (
                                            <div >
                                                <div>
                                                <IconButton
                                                     color="secondary"
                                                    component="label"
                                                    onClick={(e) => this.deleteCertainPhoto(e, item)}>
                                                    <DeleteIcon/>
                                                </IconButton>
                                                </div>
                                                    <GridListTile key={item} cols={2}>
                                                    <img src={item} style={{
                                                        width: 250, height: 250
                                                    }} alt={"image"}/>
                                                </GridListTile>
                                            </div>
                                        )))}
                                </GridList>
                            </div>
                        </div>
                    </List>
                </div>

                {googleMap}</div>

        );
    }
}

export default ResourceRecordItemView;