import './App.css';
import React, {Component} from "react";
import "./Banner.css";
import "./Board.css";
import "./DomandaDaInviare.css";
import "./Domanda.css";
import $ from 'jquery';
import { Peer } from "peerjs";
import { sha3_512 } from 'js-sha3';


import Tile from "./Tile";
import TileSelected from "./TileSelected";
import GlobalPlayer from "./GlobalPlayer";
import Classifica from "./Classifica";

//INSERIRE QUI IL PROPRIO IP
let ip="192.168.1.14";
//let ip="192.168.56.1";
//let ip="172.20.10.4";
//let ip="192.168.213.5";

let nickavversario

const peerCfg = {host: ip, port: 9000, path:"/peerjs"}
let conn = null;


class App extends Component {
    state = {
        tiles: [
            {id: 0, imageName: "Image/Alessandro.png", back: "Image/Alessandro.png", flip: false},
            {id: 1, imageName: "Image/Alfredo.png", back: "Image/Alfredo.png", flip: false},
            {id: 2, imageName: "Image/Anita.png", back: "Image/Anita.png", flip: false},
            {id: 3, imageName: "Image/Anna.png", back: "Image/Anna.png", flip: false},
            {id: 4, imageName: "Image/Bernardo.png", back: "Image/Bernardo.png", flip: false},
            {id: 5, imageName: "Image/Carlo.png", back: "Image/Carlo.png", flip: false},
            {id: 6, imageName: "Image/Chiara.png", back: "Image/Chiara.png", flip: false},
            {id: 7, imageName: "Image/Davide.png", back: "Image/Davide.png", flip: false},
            {id: 8, imageName: "Image/Ernesto.png", back: "Image/Ernesto.png", flip: false},
            {id: 9, imageName: "Image/Filippo.png", back: "Image/Filippo.png", flip: false},
            {id: 10, imageName: "Image/Giacomo.png", back: "Image/Giacomo.png", flip: false},
            {id: 11, imageName: "Image/Giorgio.png", back: "Image/Giorgio.png", flip: false},
            {id: 12, imageName: "Image/Giuseppe.png", back: "Image/Giuseppe.png", flip: false},
            {id: 13, imageName: "Image/Guglielmo.png", back: "Image/Guglielmo.png", flip: false},
            {id: 14, imageName: "Image/Manuele.png", back: "Image/Manuele.png", flip: false},
            {id: 15, imageName: "Image/Marco.png", back: "Image/Marco.png", flip: false},
            {id: 16, imageName: "Image/Maria.png", back: "Image/Maria.png", flip: false},
            {id: 17, imageName: "Image/Paolo.png", back: "Image/Paolo.png", flip: false},
            {id: 18, imageName: "Image/Pietro.png", back: "Image/Pietro.png", flip: false},
            {id: 19, imageName: "Image/Riccardo.png", back: "Image/Riccardo.png", flip: false},
            {id: 20, imageName: "Image/Roberto.png", back: "Image/Roberto.png", flip: false},
            {id: 21, imageName: "Image/Samuele.png", back: "Image/Samuele.png", flip: false},
            {id: 22, imageName: "Image/Susanna.png", back: "Image/Susanna.png", flip: false},
            {id: 23, imageName: "Image/Tommaso.png", back: "Image/Tommaso.png", flip: false}
        ],
        login: false,
        game: false,
        soluzione: false,
        turn: false,
        sfida: false,
        flip: false,
        peer: null,
        fine: false,
        nickname: "",
        inGame: false,
        selezionato: false,
        back: false,
        reset: [
            {id: 0, imageName: "Image/Alessandro.png", back: "Image/Alessandro.png", flip: false},
            {id: 1, imageName: "Image/Alfredo.png", back: "Image/Alfredo.png", flip: false},
            {id: 2, imageName: "Image/Anita.png", back: "Image/Anita.png", flip: false},
            {id: 3, imageName: "Image/Anna.png", back: "Image/Anna.png", flip: false},
            {id: 4, imageName: "Image/Bernardo.png", back: "Image/Bernardo.png", flip: false},
            {id: 5, imageName: "Image/Carlo.png", back: "Image/Carlo.png", flip: false},
            {id: 6, imageName: "Image/Chiara.png", back: "Image/Chiara.png", flip: false},
            {id: 7, imageName: "Image/Davide.png", back: "Image/Davide.png", flip: false},
            {id: 8, imageName: "Image/Ernesto.png", back: "Image/Ernesto.png", flip: false},
            {id: 9, imageName: "Image/Filippo.png", back: "Image/Filippo.png", flip: false},
            {id: 10, imageName: "Image/Giacomo.png", back: "Image/Giacomo.png", flip: false},
            {id: 11, imageName: "Image/Giorgio.png", back: "Image/Giorgio.png", flip: false},
            {id: 12, imageName: "Image/Giuseppe.png", back: "Image/Giuseppe.png", flip: false},
            {id: 13, imageName: "Image/Guglielmo.png", back: "Image/Guglielmo.png", flip: false},
            {id: 14, imageName: "Image/Manuele.png", back: "Image/Manuele.png", flip: false},
            {id: 15, imageName: "Image/Marco.png", back: "Image/Marco.png", flip: false},
            {id: 16, imageName: "Image/Maria.png", back: "Image/Maria.png", flip: false},
            {id: 17, imageName: "Image/Paolo.png", back: "Image/Paolo.png", flip: false},
            {id: 18, imageName: "Image/Pietro.png", back: "Image/Pietro.png", flip: false},
            {id: 19, imageName: "Image/Riccardo.png", back: "Image/Riccardo.png", flip: false},
            {id: 20, imageName: "Image/Roberto.png", back: "Image/Roberto.png", flip: false},
            {id: 21, imageName: "Image/Samuele.png", back: "Image/Samuele.png", flip: false},
            {id: 22, imageName: "Image/Susanna.png", back: "Image/Susanna.png", flip: false},
            {id: 23, imageName: "Image/Tommaso.png", back: "Image/Tommaso.png", flip: false}
        ],
        indovinato: null,
    }

    stateSelected = {
        selectedTiles: [{id: 100, imageName: "Image/BackCardGame.png"}],
        resetTiles: [{id: 100, imageName: "Image/BackCardGame.png"}],
        selectedTile: null,
    }

    handleLogin = () => {

        let username = $('#nickname').val();
        let password = $('#password').val();
        let updateStatus;

        if((username !== "")||(password!=="")) {

            //CONTROLLO CREDENZIALI
            fetch('http://' + ip + ':4000/peer/' + username)
                .then((response) => {
                    if (response.status === 404) { // not found
                        alert("Nessun utente trovato, registrati!!!");
                        return null;
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.PassWord === sha3_512(password)) {
                        this.state.peer = this.initPeer(username);
                        this.setState({nickname: username});

                        updateStatus = {Status: 1, Username: username};
                        fetch('http://' + ip + ':4000/updateStatusPeer', {
                            method: 'POST',
                            body: JSON.stringify(updateStatus),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                            .catch((err) => {
                                console.log(err.message);
                            });
                    } else
                    {
                        alert("Password errata");
                    }
                })
                .catch((err) => {
                    console.log(err.message);
                });

        }
        else
            alert("Inserire le credenziali");
    }



    handleRegistrazione = () => {
        let username = $('#nickname').val();
        let password = $('#password').val();
        let newPeer;

        if(username!=="" && password!==""){
            newPeer = {Username: username, PassWord: sha3_512(password), PartiteVinte: 0, PartiteGiocate: 0};
            fetch('http://'+ip+':4000/newPeer', {
                method: 'POST',
                body: JSON.stringify(newPeer),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => {
                    if (response.status === 201) // resource created (with unused location field)
                        alert("Registrazione avvenuta con successo");
                    else
                        alert("Registrazione fallita");
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }else{
            alert("Inserisci tutti i campi!");
        }


    }

    initPeer(id) {
        const peer = new Peer(id, peerCfg);

        // GESTIONE EVENTI PEER
        peer.on('open', () => {
            console.log(`Peer ${id} is open`);
            this.setState({login: true});
        });

        peer.on('error', (err) => {
            console.log(`Peer ${id} error: ${err}`);
            if (err.type === 'unavailable-id') {
                alert(`L'ID "${id}" è già in uso. Scegli un nuovo ID`);
            }
        });

        peer.on('disconnected', () => {

            let updateStatus;
            updateStatus = {Status: 0, Username: this.state.nickname};

            fetch('http://' + ip + ':4000/updateStatusPeer', {
                method: 'POST',
                body: JSON.stringify(updateStatus),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .catch((err) => {
                    console.log(err.message);
                });
        });

        peer.on('connection', (conn) => {
            console.log(`Peer ${id} received connection from ${conn.peer}`);
            nickavversario= conn.peer;
            conn.on('open', () => {
                console.log(`Peer ${id} connected to ${conn.peer}`);
                this.handleConnection(conn);
            });

            conn.on('close', () => {

                let updateStatus;
                updateStatus = {Status: 1, Username: this.state.nickname};

                fetch('http://' + ip + ':4000/updateStatusPeer', {
                    method: 'POST',
                    body: JSON.stringify(updateStatus),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .catch((err) => {
                        console.log(err.message);
                    });
                console.log(`Peer ${id} connection closed`);
            });
            this.setState({sfida: true});
        });
        //GESTIONE CHIUSURA PAGINA
        window.addEventListener('beforeunload', function(event) {
            if (conn && conn.open) {
                conn.send("CLOSE");
            }

            peer.disconnect();

        });


        return peer;
    }

    //GESTIONE CLICK SUL PERSONAGGIO
    handleClick = tileId => {
        //GESTIONE CLICK SU TILES
        const selectedTile = this.state.tiles.find(tile => tile.id === tileId.id);
        if(selectedTile.id !== 100) {
            if (selectedTile.flip === false) {
                selectedTile.imageName ="Image/BackCardGame.png";
                selectedTile.flip = true;
                this.setState(selectedTile);
            }
            else
            {
                selectedTile.imageName = selectedTile.back;
                selectedTile.flip = false;
                this.setState(selectedTile);
            }
        }
    }

    //GESTIONE MESSAGGI
    handleConnection = (connection) => {
        //GESTIONE CONNESSIONE E RICEZIONE MESSAGGI
        conn = connection;
        conn.on('data', (data) => {
            if (data.charAt(0) === "?") {
                data = data.slice(1);
                document.getElementById("DomandaAvversario").value = data;
                document.getElementById("si").style.display="inline";
                document.getElementById("no").style.display="inline";
            }
            if (data.charAt(0) === "#") {
                data = data.slice(1);
                document.getElementById("DomandaAvversario").value = data;
                document.getElementById("si").style.display="none";
                document.getElementById("no").style.display="none";
            }
            if (data.charAt(0) === "!") {

                this.state.fine = true;
                this.setState({fine: true});
                this.state.soluzione = true;
                this.setState({soluzione: true});
                data = data.slice(1);

                //CONTROLLO VITTORIA O SCONFITTA E AGGIORNAMENTO CLASSIFICA
                if (data === this.stateSelected.selectedTiles[0].imageName) {

                    conn.send("Hai perso!");

                    this.state.indovinato=true;
                    this.setState({indovinato:true});

                    setTimeout(() => {
                        conn.close();

                        this.handleReset();
                    }, 3000);
                }
                else {
                    conn.send("Hai vinto!");
                    let updatePeer;
                    let PG = 0;
                    let PV = 0;

                    fetch('http://' + ip + ':4000/points/' + this.state.nickname) // GET request to peerService
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            PG = data.PartiteGiocate;
                            PV = data.PartiteVinte;

                            PV = PV + 1;

                            updatePeer = {PartiteVinte: PV, PartiteGiocate: PG, Username: this.state.nickname};

                            fetch('http://' + ip + ':4000/updatePeer', {
                                method: 'POST',
                                body: JSON.stringify(updatePeer),
                                headers: {
                                    'Content-type': 'application/json; charset=UTF-8',
                                },
                            })
                        })
                        .catch((err) => {
                            console.log(err.message);
                        });


                    this.state.indovinato=false;
                    this.setState({indovinato:false});
                    setTimeout(() => {
                        conn.close();
                        this.handleReset();
                    }, 3000);

                }
                let updateStatus;
                updateStatus = {Status: 1, Username: this.state.nickname};

                fetch('http://' + ip + ':4000/updateStatusPeer', {
                    method: 'POST',
                    body: JSON.stringify(updateStatus),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .catch((err) => {
                        console.log(err.message);
                    });

            }
            if (data === "Hai vinto!") {

                let updateStatus;
                updateStatus = {Status: 1, Username: this.state.nickname};

                fetch('http://' + ip + ':4000/updateStatusPeer', {
                    method: 'POST',
                    body: JSON.stringify(updateStatus),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .catch((err) => {
                        console.log(err.message);
                    });

                document.getElementById("Fine").value = "Hai perso!";
                setTimeout(() => {
                    conn.close();
                    this.handleReset();
                }, 3000);
            }
            if (data === "Hai perso!") {

                let updatePeer;
                let PG = 0;
                let PV = 0;

                fetch('http://' + ip + ':4000/points/' + this.state.nickname) // GET request to peerService
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        PG = data.PartiteGiocate;
                        PV = data.PartiteVinte;

                        PV = PV + 1;

                        updatePeer = {PartiteVinte: PV, PartiteGiocate: PG, Username: this.state.nickname};

                        fetch('http://' + ip + ':4000/updatePeer', {
                            method: 'POST',
                            body: JSON.stringify(updatePeer),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

                let updateStatus;
                updateStatus = {Status: 1, Username: this.state.nickname};

                fetch('http://' + ip + ':4000/updateStatusPeer', {
                    method: 'POST',
                    body: JSON.stringify(updateStatus),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .catch((err) => {
                        console.log(err.message);
                    });

                document.getElementById("Fine").value = "Hai vinto!";
                setTimeout(() => {
                    conn.close();

                    this.handleReset();
                }, 3000);

            }

            if (data === "ACCETTATO") {
                this.setState({game: true});
                this.setState({turn: false});
                this.setState({sfida: false});
                this.setState({inGame: true});
                let updateStatus;
                updateStatus = {Status: 2, Username: this.state.nickname};

                fetch('http://' + ip + ':4000/updateStatusPeer', {
                    method: 'POST',
                    body: JSON.stringify(updateStatus),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .catch((err) => {
                        console.log(err.message);
                    });

                let updatePeer;
                let PG = 0;
                let PV = 0;

                fetch('http://' + ip + ':4000/points/' + this.state.nickname) // GET request to peerService
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        PG = data.PartiteGiocate;
                        PV = data.PartiteVinte;

                        PG = PG + 1;

                        updatePeer = {PartiteVinte: PV, PartiteGiocate: PG, Username: this.state.nickname};

                        fetch('http://' + ip + ':4000/updatePeer', {
                            method: 'POST',
                            body: JSON.stringify(updatePeer),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

            }
            if (data === "SELEZIONATO") {
                this.setState({selezionato: true});
            }
            if (data === "CLOSE") {

                let updatePeer;
                let PG = 0;
                let PV = 0;

                fetch('http://' + ip + ':4000/points/' + this.state.nickname) // GET request to peerService
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        PG = data.PartiteGiocate;
                        PV = data.PartiteVinte;

                        PV = PV + 1;

                        updatePeer = {PartiteVinte: PV, PartiteGiocate: PG, Username: this.state.nickname};

                        fetch('http://' + ip + ':4000/updatePeer', {
                            method: 'POST',
                            body: JSON.stringify(updatePeer),
                            headers: {
                                'Content-type': 'application/json; charset=UTF-8',
                            },
                        })
                    })
                    .catch((err) => {
                        console.log(err.message);
                    });

                let updateStatus;
                updateStatus = {Status: 1, Username: this.state.nickname};

                fetch('http://' + ip + ':4000/updateStatusPeer', {
                    method: 'POST',
                    body: JSON.stringify(updateStatus),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .catch((err) => {
                        console.log(err.message);
                    });

                this.handleReset();

            }
            if(data==="RIFIUTATO"){
                let nick = document.getElementById("nickDaSfidare");
                nick.style.display = "inline";
                nick.value = "";
                let buttonSfida = document.getElementById("bottoneSfida");
                buttonSfida.style.display = "inline";
                let inAttesa = document.getElementById("inAttesa");
                inAttesa.style.display = "none";
                alert("L'avversario ha rifiutato l'invito");
                this.handleReset();
            }

            if(data === "OCCUPATO") {
                alert("Il giocatore sta già giocando");
            }

            if(data==="ANNULLATO"){
                this.handleReset();
            }

        });
    }

    //GESTIONE SFIDA
    handleSfida = (idToConnect) => {
        const {peer} = this.state;

        idToConnect = document.getElementById("nickDaSfidare").value;

        if (idToConnect === this.state.nickname) {
            alert("Non puoi sfidarti da solo!");
        }
        else if (idToConnect === "")
        {
            alert("Inserisci un nickname da sfidare");
        }
        else
        {
            let nick = document.getElementById("nickDaSfidare");
            let status;

            fetch('http://' + ip + ':4000/playerStatus/' + nick.value)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    status = data.Status;
                    this.state.back=true;
                    if(status===1)
                    {
                        nick.style.display = "none";
                        let buttonSfida = document.getElementById("bottoneSfida");
                        buttonSfida.style.display = "none";
                        let inAttesa = document.getElementById("inAttesa");
                        inAttesa.style.display = "inline";

                        const conn = peer.connect(idToConnect);
                        conn.on('open', () => {
                            this.handleConnection(conn);
                        });
                    }
                    if(status===2)
                    {
                        alert ("Il giocatore è occupato");
                    }
                    if(status===0)
                    {
                        alert ("Il giocatore non è online");
                    }
                })
                .catch(error => {
                    console.log(error);
                });

        }
    }
    handleAccept = () => {
        let updateStatus;

        conn.send("ACCETTATO");
        this.setState({game: true});
        this.setState({turn: true});
        this.setState({sfida: false});
        this.setState({inGame: true});

        updateStatus = {Status: 2, Username: this.state.nickname};

        fetch('http://' + ip + ':4000/updateStatusPeer', {
            method: 'POST',
            body: JSON.stringify(updateStatus),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .catch((err) => {
                console.log(err.message);
            });

        let updatePeer;
        let PG = 0;
        let PV = 0;

        fetch('http://' + ip + ':4000/points/' + this.state.nickname) // GET request to peerService
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                PG = data.PartiteGiocate;
                PV = data.PartiteVinte;

                PG = PG + 1;
                PV = PV + 0;

                updatePeer = {PartiteVinte: PV, PartiteGiocate: PG, Username: this.state.nickname};

                fetch('http://' + ip + ':4000/updatePeer', {
                    method: 'POST',
                    body: JSON.stringify(updatePeer),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
            })
            .catch((err) => {
                console.log(err.message);
            });


    }

    handleRefuse = () => {
        conn.send("RIFIUTATO");
        this.handleReset();
    }

    handleReset = () => {
        this.state.game = false;
        this.state.fine = false;
        this.state.soluzione = false;
        this.state.isClicked = false;
        this.state.sfida=false;
        this.state.back= false;

        this.stateSelected.selectedTiles=this.stateSelected.resetTiles;
        this.stateSelected.selectedTile= null;
        this.stateSelected.selectedTiles = [{id: 100, imageName: "Image/BackCardGame.png"}];

        this.state.tiles=this.state.reset;
        this.setState([{tiles: this.state.reset}]);

        let updateStatus;
        updateStatus = {Status: 1, Username: this.state.nickname};

        fetch('http://' + ip + ':4000/updateStatusPeer', {
            method: 'POST',
            body: JSON.stringify(updateStatus),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }

    handleIndietro = () => {
        let nick = document.getElementById("nickDaSfidare");
        nick.style.display = "inline";
        nick.value = "";
        let buttonSfida = document.getElementById("bottoneSfida");
        buttonSfida.style.display = "inline";
        let inAttesa = document.getElementById("inAttesa");
        inAttesa.style.display = "none";
        conn.send("ANNULLATO");
    }

    handleLogout = () =>{
        if(this.state.back===false){
            let updateStatus;
            updateStatus = {Status: 0, Username: this.state.nickname};
            fetch('http://' + ip + ':4000/updateStatusPeer', {
                method: 'POST',
                body: JSON.stringify(updateStatus),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .catch((err) => {
                    console.log(err.message);
                });
            window.location.reload();
        } else {
            this.handleIndietro();
            this.state.back = false;
        }

    }

    handleSelect = tileId => {

        if(!this.state.isClicked) {
            const selectedTile = this.state.tiles.find(tile => tile.imageName === tileId.imageName);
            const newSelectedTiles = [selectedTile];

            newSelectedTiles.id = 100;
            newSelectedTiles.imageName = selectedTile.imageName;

            conn.send("SELEZIONATO");

            this.stateSelected.selectedTiles.pop();
            this.stateSelected.selectedTiles.push(newSelectedTiles);
            this.setState({selectedTiles: newSelectedTiles, isClicked: true });
            this.stateSelected.selectedTile=true;
        }
    }

    handleInvia = () => {
        if (this.state.selezionato === true) {
            const messaggio = document.getElementById("domanda").value;
            if (messaggio !== "") {
                if (conn && conn.open) {
                    conn.send("?" + messaggio);
                    this.setState({turn: false});
                } else {
                    console.log('Connessione non stabilita.');
                }
            }
        }
        else
        {
            alert("L'avversario non ha ancora selezionato un personaggio");
        }

    }
    handleSoluzione = () => {
        if (this.state.selezionato === true) {
            if (this.state.soluzione === true) {
                this.state.soluzione = false;
                this.setState({soluzione: false})
            } else {
                this.state.soluzione = true;
                this.setState({soluzione: true})
            }
        }
        else
        {
            alert("L'avversario non ha ancora selezionato un personaggio");
        }
    }

    handlePersonaggioSoluzione = tileId => {
        this.state.fine = true;
        this.setState({fine: true});

        const selectedTile = this.state.tiles.find(tile => tile.id === tileId.id);
        if(selectedTile.flip === false)
        {
            if (conn && conn.open) {
                conn.send("!" + selectedTile.imageName);
            }
            else
            {
                console.log('Connessione non stabilita.');
            }
        }
        else
        {
            alert("Seleziona un personaggio non capovolto");
        }
    }

    handleSi = () => {
        conn.send("#Si");
        this.setState({turn: true});
    }
    handleNo = () => {
        conn.send("#No");
        this.setState({turn: true});
    }

    render() {
        return (

            <div>


                <div className="titolo" > <a className="ombra">  GUESS WHO? </a> </div>
                <div className="prova">
                    {   //PAGINA DI REGISTRAZIONE E LOGIN -->
                        !this.state.login && this.stateSelected.selectedTile === null &&(
                        <div>
                            <div className="bannerInizio">
                                <div className="tileSelected">
                                    {this.stateSelected.selectedTiles.map(tile => <TileSelected key={tile.id} imageName={tile.imageName}/>)}
                                </div>

                                <div className="loginMenu">
                                    <div className="divLogin">
                                        <input className="inputUP" type="text" placeholder="Username" id="nickname" name="nickname"/>
                                        <input className="inputUP" type="password" placeholder="Password" id="password" name="password"/>
                                    </div>
                                    <div className="sfida_login">
                                        <button type="submit" className="buttonLogin" onClick={this.handleRegistrazione} > Registrati  </button>
                                        <button type="submit" className="buttonLogin" onClick={this.handleLogin} >Accedi </button>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }

                    {//PAGINA CON CLASSIFICA - GIOCATORI ONLINE - SFIDA -->
                        this.state.login && !this.state.game  && this.stateSelected.selectedTile === null && !this.state.sfida && (

                        <div className="banner">
                            <div id="attesa" className="attesa">
                                <div className="globalContainer">
                                    <div className="sfida_logout">
                                        <input className="inputNick" placeholder="Inserisci il nickname che vuoi sfidare" type="text" id="nickDaSfidare" name="nickDaSfidare"/> <br/>
                                        <input className="input2" placeholder="In attesa che l'altro giocatore accetti" type="text" name="inAttesa" id="inAttesa"/>
                                        <div className="buttonMenu">
                                            <button className="buttonLogin" type="submit" id="bottoneSfida" onClick={this.handleSfida}>Sfida</button>
                                            <button className="buttonLogin" type="submit" id="bottoneLogout" onClick={this.handleLogout}>Logout</button>
                                        </div>
                                        <Classifica/>
                                    </div>
                                    <div className="globalMenuAttesa">
                                        <GlobalPlayer/>
                                    </div>
                                </div>
                            </div>

                        </div>
                    )}
                    {//PAGINA IN CUI DECIDO SE ACCETTARE O RIFIUTARE UNA RICHIESTA -->
                    this.state.sfida && (
                        <div className="bannerInizio">
                            <div className="tileSelected">
                                {this.stateSelected.selectedTiles.map(tile => <TileSelected key={tile.id} imageName={"Image/BackCardGame.png"}/>)}
                            </div>

                            <div>

                                <input className="sfida" placeholder={`${nickavversario} vuole giocare con te!`} readOnly="readonly" type="text" id="nickDaSfidare" name="nickDaSfidare"/> <br/>

                                <div className="contenitore">
                                    <button className="button_sfida" type="submit" onClick={this.handleAccept}>Accetta</button>
                                    <button className="button_sfida" type="submit" onClick={this.handleRefuse}>Rifiuta</button>
                                </div>

                            </div>
                        </div>
                    )}
                    {//PAGINA DOVE SCELGO IL GIOCATORE SEGRETO DELL'AVVERSARIO -->
                        this.stateSelected.selectedTile !== null && this.state.soluzione && this.state.game && !this.state.fine && (

                        <div className="bannerAfter">
                            <div className="tileSelected">
                                {this.stateSelected.selectedTiles.map(tile => <TileSelected key={tile.id} imageName={tile.imageName}/>)}
                            </div>

                            <div>
                                {this.state.turn && (
                                    <div className={"contenitore_domanda"}>
                                        <div>
                                            <input className="BoxAccusa" placeholder="Fai la tua accusa" readOnly="reavveadonly" type="text" id="domanda" name="domanda"/> <br/>
                                            <button className="buttonIndietro" onClick={this.handleSoluzione}>Indietro</button>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                    {//PAGINA VITTORIA -->
                        this.stateSelected.selectedTile !== null && this.state.fine&& !this.state.indovinato &&(
                        <div className="bannerAfter">
                            <div className="tileSelected" >
                                {this.stateSelected.selectedTiles.map(tile => <TileSelected key={tile.id} imageName={tile.imageName}/>)}
                            </div>

                            <div>
                                <input className="boxFine" value="Hai vinto!" readOnly="readonly"  type="text" id="Fine" name="Fine"/> <br/>
                            </div>
                        </div>
                    )}


                    {//PAGINA SCONFITTA -->
                        this.stateSelected.selectedTile !== null && this.state.fine&& this.state.indovinato &&(
                        <div className="bannerAfter">
                            <div className="tileSelected" >
                                {this.stateSelected.selectedTiles.map(tile => <TileSelected key={tile.id} imageName={tile.imageName}/>)}
                            </div>

                            <div>
                                <input className="boxFine" readOnly="readonly" value="Hai perso!" type="text" id="Fine" name="Fine"/> <br/>
                            </div>
                        </div>
                    )}


                    {//PAGINA DI SCELTA PROPRIO PERSONAGGIO -->
                        this.state.game && this.stateSelected.selectedTile === null && !this.state.soluzione &&  !this.state.fine &&(
                        <div className="bannerGame">
                            <div className="tileSelected">
                                {this.stateSelected.selectedTiles.map(tile => <TileSelected key={tile.id} imageName={tile.imageName}/>)}
                            </div>
                            <div className="SceltaPersonaggio">
                                Seleziona il tuo personaggio
                            </div>
                        </div>
                    )}
                    {//PAGINA DI GIOCO -->
                        this.state.game && this.stateSelected.selectedTile !== null && !this.state.soluzione &&  !this.state.fine &&(
                        <div className="bannerAfter">
                            <div className="tileSelected">
                                {this.stateSelected.selectedTiles.map(tile => <TileSelected key={tile.id} imageName={tile.imageName}/>)}
                            </div>

                            <div className={"contenitore_domanda"}>
                                {this.state.turn && (
                                    <div>
                                        <input className="domandabox" placeholder="Inserisci la tua domanda" type="text" id="domanda" name="domanda"/> <br/>
                                        <div>
                                            <button className="buttonInvia" onClick={this.handleInvia}>Invia</button>
                                            <button className="buttonSoluzione" onClick={this.handleSoluzione}>Soluzione</button>
                                        </div>
                                    </div>
                                )}
                                {!this.state.turn && (
                                    <div>
                                        <input className="domandabox" placeholder="In attesa dell'avversario..." readOnly="readonly" type="text" id="DomandaAvversario" name="DomandaAvversario"/> <br/>
                                        <button className="buttonSiNo" id={"si"} onClick={this.handleSi} >Si</button>
                                        <button className="buttonSiNo" id={"no"} onClick={this.handleNo} >No</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {//GESTIONE DELLE PAGINE VISUALIZZATE  -->
                    this.stateSelected.selectedTile === null && !this.state.soluzione && this.state.game && (
                    <div className="board">
                        {this.state.tiles.map(tile => <Tile key={tile.id} id={tile.id} imageName={tile.imageName} onSelect={this.handleSelect}/>)}
                    </div>
                )}
                {this.stateSelected.selectedTile !== null && !this.state.soluzione && this.state.game &&(
                    <div className="board">
                        {this.state.tiles.map(tile => <Tile key={tile.id} id={tile.id} imageName={tile.imageName} onSelect={this.handleClick}/>)}
                    </div>
                )}
                {this.stateSelected.selectedTile !== null && this.state.soluzione && this.state.game &&(
                    <div className="board">
                        {this.state.tiles.map(tile => <Tile key={tile.id} id={tile.id} imageName={tile.imageName} onSelect={this.handlePersonaggioSoluzione}/>)}
                    </div>
                )}
            </div>
        );
    }
}
export default App;