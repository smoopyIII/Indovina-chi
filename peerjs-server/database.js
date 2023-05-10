
const express = require('express');
var cors = require('cors');
const app = express();
const mysql = require('mysql');
const port = 4000;
const dbConnParam = {host: 'localhost', user: 'root', database: 'IndovinaChi'};

app.use(express.json());
app.use(cors({

//INSERIRE QUI IL PROPRIO IP


    origin: 'http://192.168.1.14:3000'
    //origin: 'http://192.168.56.1:3000'
    //origin: 'http://172.20.10.4:3000'
    //origin:   'http://192.168.213.5:3000'

}));


app.get('/peersPoints', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);

    const queryStr = 'SELECT Username, PartiteGiocate, PartiteVinte FROM Peer ORDER BY PartiteVinte DESC LIMIT 3';
    dbConn.query(queryStr, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500); // internal server error
            res.end();
            return;
        }
        res.status(200).json(rows);
    });
    dbConn.end();
});

app.get('/playerStatus/:Username', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);
    const queryStr = 'SELECT * FROM Peer WHERE Username = ?';

    dbConn.query(queryStr, [req.params.Username], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500); // internal server error
            res.end();
            return;
        }
        res.status(200).json(rows[0]);
    });
    dbConn.end();
});

app.get('/points/:Username', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);
    const queryStr = 'SELECT * FROM Peer WHERE Username = ?';

    dbConn.query(queryStr, [req.params.Username], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500); // internal server error
            res.end();
            return;
        }
        res.status(200).json(rows[0]);
    });
    dbConn.end();
});

app.get('/playersStatus', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);

    const queryStr = 'SELECT Username, Status FROM Peer';
    dbConn.query(queryStr, (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500); // internal server error
            res.end();
            return;
        }
        res.status(200).json(rows);
    });
    dbConn.end();
});




app.get('/peer/:Username', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);
    const queryStr = 'SELECT * FROM Peer WHERE Username = ?';

    dbConn.query(queryStr, [req.params.Username], (err, rows, fields) => {
        if (err) {
            console.log(err);
            res.sendStatus(500); // internal server error
            res.end();
            return;
        }
        if (rows.length == 0)
            res.sendStatus(404); // not found
        else
            res.status(200).json(rows[0]);
    });
    dbConn.end();
});

app.post('/newPeer', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);
    const queryStr = 'INSERT INTO Peer VALUES (?,?,?,?,?)';

    dbConn.query(queryStr, [req.body.Username, req.body.PassWord, req.body.PartiteVinte, req.body.PartiteGiocate,0 ], (err, result) => {
        if (err) {
            console.log(err.code);
            res.sendStatus(err.code === 'ER_DUP_ENTRY' ? 400 : 500); // bad request (duplicate key) OR internal server error
            res.end();
            return;
        }
        if (result.affectedRows == 1) {
            res.status(201); // resource created
            res.location('/peer/' + req.body.Username);
            res.send();
        }
        else
            res.sendStatus(500);
    });
    dbConn.end();
});

app.post('/updatePeer', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);
    const queryStr = 'UPDATE Peer SET PartiteVinte = ?, PartiteGiocate = ? WHERE Username = ?';

    dbConn.query(queryStr, [req.body.PartiteVinte, req.body.PartiteGiocate, req.body.Username ], (err, result) => {

        if (err) {
            console.log(err.code);
            res.sendStatus(err.code === 'ER_DUP_ENTRY' ? 400 : 500); //internal server error
            res.end();
            return;
        }
        if (result.affectedRows == 1) {
            res.status(201); // resource updated
            res.location('/peer/' + req.body.Username);
            res.send();
        }
        else
            res.sendStatus(500);
    });
    dbConn.end();
});


app.post('/updateStatusPeer', (req, res) => {
    const dbConn = mysql.createConnection(dbConnParam);
    const queryStr = 'UPDATE Peer SET Status = ? WHERE Username = ?';

    dbConn.query(queryStr, [req.body.Status , req.body.Username], (err, result) => {

        if (err) {
            console.log(err.code);
            res.sendStatus(err.code === 'ER_DUP_ENTRY' ? 400 : 500); //internal server error
            res.end();
            return;
        }
        if (result.affectedRows == 1) {
            res.status(201); // resource updated
            res.location('/peer/' + req.body.Username);
            res.send();
        }
        else
            res.sendStatus(500);
    });
    dbConn.end();
});


app.listen(port, () => console.log(`Listening on port ${port}`))


//UPDATE peer SET Partitevinte = 0, PartiteGiocate = 0, status= 0;

