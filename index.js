const { response } = require('express');
const express = require('express');
const jsonwebtoken = require('jsonwebtoken');

const app = express();

app.get('/api', (req, res) => {
    res.json({
        message: 'Welcome to Json APIs...'
    })
})


app.post('/api/posts', verifyToken, (req, res) => {
    jsonwebtoken.verify(req.token, 'privatekey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            res.json({
                message: "Post Created ......",
                authData
            })
        }
    });


})

app.post('/api/login', (req, res) => {
    const users = {
        id: 5,
        useranme: 'zain ul abideen',
        email: 'ulabideenz40@gmail.com'
    }
    jsonwebtoken.sign({ users }, 'privatekey', { expiresIn: '56s' }, function (err, token) {
        res.json({
            token
        })
    });

});
function verifyToken(req, res, next) {
    //Get Auth header value
    const logintoken = req.headers['authorization'];
    //check if bearer is undefined
    if (typeof logintoken !== 'undefined') {
        // Split at space
        // const login=logintoken.split(' ');
        // //Get token from Array
        // const token_is=login[1];
        // //set token
        req.token = logintoken;
        next();

    } else {
        //Forbidden
        res.sendStatus(403)
    }

}
app.listen(5000, () => console.log("Server is start at port 5000...."))