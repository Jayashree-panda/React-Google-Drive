const express = require('express')
const cors = require('cors')
const fs = require('fs');
const readline = require('readline');
const { google } = require('googleapis');

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded())

const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'tokens.json';
function authorize(credentials, callback) {

  const { client_secret, client_id, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
    client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  callback(authUrl);
}

app.post('/uploadFile', (req, res) => {

  fs.readFile('credentials.json', (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), (auth) => {
      const drive = google.drive({ version: 'v3', auth });
      res.json(auth)
    });
  });
})

app.get('/', (req, res) => {
  res.send("hii")
})

app.get('/uploaded', (req, res) => {
  console.log("hi")
  res.send("hey there")
})
app.listen('4000', () => {
  console.log("app listening on port 4000")
})