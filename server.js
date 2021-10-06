import express from 'express';
const app = express();
import cors from 'cors';  
import passport from 'passport';
import session from 'express-session';
import fetch from "node-fetch";
import Auth from './passport-setup.js';
import { createClient } from '@typeform/api-client'
import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
const DEFAULT_FORM_ID = process.env.DEFAULT_FORM_ID;

Auth()

app.use(cors())

app.use(session({
    secret: 'top_secret',
    resave: true,
    saveUninitialized: true,
}))

// Auth middleware that checks if the user is logged in
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

// Initializes passport and passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Example protected and unprotected routes
app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome!`))
app.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})

app.get('/login', passport.authenticate('oauth2', {
    failureRedirect: '/login',
    successReturnToOrRedirect: '/'
}));

app.get('/callback', passport.authenticate('oauth2', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.get('/responses', isLoggedIn, function(req, res){
    fetch(`https://api.typeform.com/forms/${DEFAULT_FORM_ID}/responses`,{
        headers: {
            Authorization: `Bearer ${req.user.access_token}`,
        }
    })
    .then(response => response.json())
    .then(data =>res.end(JSON.stringify(data)))
})

//TODO
//delete through TypeformAPI
//overwrite to spreadsheet
//app-script not working: cant locate current row by response_token
app.get('/responses/delete/:id', isLoggedIn, async (req, res) => {
    const tf_response_token = req.params.id

    try {
      /*  Error! 
      isAxiosError: true,
      data: {
      code: 'INSUFFICIENT_PERMISSIONS',
      description: 'not enough permissions to complete the action''
      */
        await axios.all([
            axios.delete(`https://api.typeform.com/forms/${DEFAULT_FORM_ID}/responses?included_response_ids=${tf_response_token}`,{
                headers: {
                    Authorization: `Bearer ${req.user.access_token}`,
                }
            }),
            axios.get(GOOGLE_SCRIPT_URL + `?action=delete&table=sheet1&id=${tf_response_token}`)
          ]).then(axios.spread((response1, response2) => {
            console.log(response1.data.url);
            console.log(response2.data.url);
          }))
    }
    catch (err) {
        console.log(err)
    }
})

// Create a server to listen at port 5000
var server = app.listen(5000, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})