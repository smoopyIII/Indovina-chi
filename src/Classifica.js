import "./Classifica.css";
import React, {Component} from "react";

//INSERIRE QUI IL PROPRIO IP

//let ip="172.20.10.4";
//let ip="192.168.87.5";
//let ip="192.168.213.5";
let ip="192.168.1.14";



class Classifica extends Component {
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
        fetch('http://' + ip + ':4000/peersPoints')
            .then((response) => {
                return response.json();
            })
            .then((data) => {

                this.setState({ players: data });
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        const { players } = this.state;

        return (
            <div className="classificaBoard">
                <label className="classificaTitle">TOP 3</label>
                <table>
                    <thead>
                    <tr className="classifica">
                        <th>Username</th>
                        <th>Partite vinte</th>
                        <th>Partite giocate</th>
                    </tr>
                    </thead>
                    <tbody>
                    {players.map(player => (
                        <tr key={player.Username}>
                            <td>{player.Username}</td>
                            <td>{player.PartiteVinte}</td>
                            <td>{player.PartiteGiocate}</td>

                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Classifica;

