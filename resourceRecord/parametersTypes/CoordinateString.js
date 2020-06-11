import React, {Component} from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import GoogleMap from "../../resourceParameters/GoogleMap";

const buttonStyle = {
    marginBottom: 50
}
const mapStyle = {
    marginLeft: 20
}
const isNumber = /^-?\d+\.?\d*$/;

class CoordinateString extends Component {


    constructor(props) {
        super(props);
        this.state = {
            coordinates: undefined,
            list: [{lat: undefined, lng: undefined}]
        }
        if (props.value && props.value.length > 0)
            this.state.list = props.value


    }

    onChangeLat = (event) => {
        let {list} = this.state;
        let {id, value} = event.target;
        list[id].lat = value;
        this.setState(list, () => {
            this.props.setData(this.props.columnName, this.buildCoordinates())
        });
    };
    onChangeLng = (event) => {
        let {list} = this.state;
        let {id, value} = event.target;
        list[id].lng = value;
        this.setState(list, () => {
            this.props.setData(this.props.columnName, this.buildCoordinates())
        });
    };

    buildCoordinates = () => {
        let str = [];
        this.state.list.forEach(element => {
            if (isNumber.test(element.lat) && isNumber.test(element.lng)) {
                str.push(`${element.lat},${element.lng}`)
            }
        })
        return str.join(";")
    }

    onClickAddCoordinate = () => {
        this.setState({list: [...this.state.list, {lat: undefined, lng: undefined}]})
    };
    getValidCoordinates = () => {
        let list = this.state.list.filter(element => isNumber.test(element.lat) && isNumber.test(element.lng));
        return list
    }

    render() {


        let {list} = this.state;
        return (
            <div style={{display: "flex"}}>
                <div>
                    <h4>Coordinates</h4>
                    {list.map((element, index) =>
                        (<div key={index}>

                            <TextField id={index}
                                       required
                                       type="text"
                                       label='Lat'
                                       onChange={this.onChangeLat}
                                       value={element.lat}
                                       error={!isNumber.test(element.lat)}/>

                            <TextField id={index}
                                       required
                                       type="text"
                                       label='Lng'
                                       onChange={this.onChangeLng}
                                       value={element.lng}
                                       error={!isNumber.test(element.lng)}/>
                        </div>)
                    )}
                    <Button style={buttonStyle}
                            onClick={this.onClickAddCoordinate}
                            autoFocus color="primary">
                        Add Coordinate
                    </Button>

                </div>
                <div style={mapStyle}>
                <GoogleMap coordinates={this.getValidCoordinates()}/>
                </div>
            </div>
        );
    }
}

export default CoordinateString;