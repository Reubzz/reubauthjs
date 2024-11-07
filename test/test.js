require('dotenv').config()
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const userDB = require('./schema/users');
const authSys = require('../index')({
    dbUri: process.env.db,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    cookieFields: {
        username: true,
        _id: true,
        email: true,
        role: true
    },
    loginExpiryIn: 1000,
    uniqueLoginField: "email"
});

const port = 80;
const app = express();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(cookieParser());
app.set('view engine', 'ejs');


app.get('/', authSys.LoginCheck, (req, res) => {
    res.render('home', {
        user: res.locals
    })
})
app.get('/admin', authSys.LoginCheck, authSys.AdminOnly({fieldName: "role", adminRole: "admin", redirectUrl: "/login"}), (req, res) => {
    res.send("This is Admin only page")
})
app.get('/delete', authSys.LoginCheck, authSys.AdminOnly({ adminRole: 'admin', fieldName: 'role', redirectUrl: '/' }), (req, res) => {
    authSys.delete({ id: req.query.id, response: res, Schema: userDB })
        .then((data) => {
            res.send(`${data.userdata.username} deleted!!`)
        })
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/login.html"))
})
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, "/views/register.html"))
})
app.get('/logout', (req, res) => {
    authSys.logout({ response: res }).catch((err) => console.log(err))
})

app.post('/login', (req, res) => {
    authSys.login({
        fields: { 
            email: req.body.username, 
            password: req.body.password 
        }, 
        Schema: userDB, 
        response: res
    }).then((data) => {
        console.log(data)
        res.send(data.userdata.username + " Logged in Successfully.");
    }).catch(err => console.log(err))
})

app.post('/register', (req, res) => {
    authSys.register({ 
        fields: {
            username: req.body.username,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            createdDate: new Date()
        },
        Schema: userDB,
        response: res
    }).then((data) => { 
        res.send(data.userdata.username + " Registered and logged in Successfully.");
    }).catch((error) => console.log(error))
})

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    console.log(`App online at - http://localhost:${port}`)
})
