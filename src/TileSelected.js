import React, {Component} from "react";
import "./Tile.css";

class TileSelected extends Component {
    render() {
        return (
            <div className="tile">
                <img src={this.props.imageName}/>
            </div>
        );
    }
}

export default TileSelected;