import "./Tile.css";
import React, {Component} from "react";


class Tile extends Component {
    render() {
        return (
            <div className="tile">
                <img src={this.props.imageName} onClick={() => this.props.onSelect(this.props) }/>
            </div>
        );
    }
}

export default Tile;
