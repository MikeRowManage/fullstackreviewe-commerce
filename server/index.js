require('dotenv').config()
const express = require('express'),
    massive = require('massive'),
    session = require('express-session'),
    authCtrl = require('./controllers/authController'), 
    checkUser = require('./middleware/checkUser'),
    {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env

    const app = express()

    app.use(express.json())

    app.use(session({
        resave: false,
        saveUninitialized: true, //make a session if there wasn't one
        rejectUnauthorized: false, //you can create authorized cookies but we have not covered it.
        cookie: {maxAge: 1000 * 60 * 60 * 24 * 7},
        secret: SESSION_SECRET
    }))

    massive({
        connectionString: CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false
        }
    }).then(db => {
        app.set('db', db)
        console.log('|---DATABASE CONNECTED---|')
        app.listen(SERVER_PORT, () => console.log(`|---Server running on ${SERVER_PORT}---|`))
    })

    app.post('/api/login', checkUser, authCtrl.login)
    app.post('/api/register', authCtrl.register)
    app.post('/api/logout', authCtrl.logout)
    app.get('/api/check', checkUser)

    // app.get('/api/products')

    // app.post('/api/carts')
    // app.get('/api/carts')

