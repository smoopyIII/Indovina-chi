import "./GlobalPlayer.css";
import React, {Component} from "react";

//INSERIRE QUI IL PROPRIO IP

//let ip="172.20.10.4";
//let ip="192.168.87.5";
//let ip="192.168.56.1";
//let ip="192.168.213.5";

let ip="192.168.1.14";

class GlobalPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            players: []
        };
    }

    componentDidMount() {
        // Esegue il controllo iniziale dello stato dei player
        this.loadPlayers();

        // Esegue il controllo periodico dello stato dei player ogni 5 secondi
        this.interval = setInterval(() => {
            this.loadPlayers();
        }, 1000);
    }

    componentWillUnmount() {
        // Termina l'esecuzione del controllo periodico prima di smontare il componente
        clearInterval(this.interval);
    }

    loadPlayers() {
        fetch('http://' + ip + ':4000/playersStatus/')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ players: data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    getPlayerStatusColor(status) {
        switch(status) {
            case 0:
                return 'red';
            case 1:
                return 'green';
            case 2:
                return '#FFD800';
            default:
                return 'gray';
        }
    }

    render() {
        const { players } = this.state;

        return (
            <div className="globalPlayerBoard">
                <label className="globalPlayerTitle">PLAYER ONLINE</label>
                <table>
                    <thead>
                    <tr className="globalPlayerOnline">
                        <th>Player</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map(player => (
                        <tr key={player.Username}>
                            <td>{player.Username}</td>
                            <td style={{ color: this.getPlayerStatusColor(player.Status) }}>{player.Status === 0 ? 'Offline' : player.Status === 1 ? 'Online' : player.Status === 2 ? 'In Game' : 'Unknown'}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GlobalPlayer;
