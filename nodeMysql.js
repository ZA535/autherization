const express = require('express');
const mySql = require('mysql');

const app = express();

const db = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '20196513',
    database: 'zaindata'
})
db.connect((err, result) => {
    if (err) {
        throw err
    } else {
        console.log("connected")
    }
})

// Create database 
app.get('/createDatabase', (req, res) => {
    let sql = "create database zaindata";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Database Created")
    });

});
// Create Tables

app.get('/createTable', (req, res) => {
    let sql = "create table nodemysql (id int NOT NULL ,firstname VARCHAR(30),lastname VARCHAR(30),email VARCHAR(50),PRIMARY KEY (id))";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Table Created..")
    });

});

// post value for post 1
app.get('/insertvalue', (req, res) => {
    let sql = "insert into nodemysql(id,firstname,lastname,email)values(1,'zain','ul abideen','ulabideenz40@gmail.com')";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Data insert into table..")
    });

});

// INsert value for post 2
app.get('/insertvalue2', (req, res) => {
    let sql = "insert into nodemysql(id,firstname,lastname,email)values(2,'osama','zubair','osama786@gmail.com')";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Data is post at second phase..")
    });

});
//get Data from database 
app.get('/getdata', (req, res) => {
    let sql = "select * from nodemysql";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Data feteched..")
    });

});

//get Data from database  at selected position
app.get('/getdata/:id', (req, res) => {
    let sql = `select * from nodemysql where id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Data feteched at selected position..")
    });

});
//update data 
app.get('/update', (req, res) => {
    let sql = "update nodemysql set lastname='Gujjar' ";
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Data  Updated..")
    });

});

//Delete data 
app.get('/delete/:id', (req, res) => {
    let sql = `DELETE FROM nodemysql WHERE id=${req.params.id}; `;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result);
        res.send("Data  delete successfully..")
    });

});

app.listen(5050, () => console.log("Server is start at port :: 5050"))
