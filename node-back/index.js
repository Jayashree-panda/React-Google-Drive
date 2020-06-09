const express = require('express')
const cors = require('cors')
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const app = express()
app.use(cors())
app.use(express.json())

app.use(express.urlencoded())

const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'tokens.json';
function authorize(req, res, credentials, callback) {

    const {client_secret, client_id, redirect_uris} = credentials.web;
    // console.log(client_id+ "j")
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(req, res, oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(req, res, oAuth2Client);
  });
}

function getAccessToken(req, res, oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    callback(req, res, authUrl);  
    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout,
    // });
    // rl.question('Enter the code from that page here: ', (code) => {
    //   rl.close();
    //   oAuth2Client.getToken(code, (err, token) => {
    //     if (err) return console.error('Error retrieving access token', err);
    //     oAuth2Client.setCredentials(token);
    //     // Store the token to disk for later program executions
    //     fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
    //       if (err) return console.error(err);
    //       console.log('Token stored to', TOKEN_PATH);
    //     });
    //     callback(oAuth2Client);
    //   });
    // });
  }
  
  function listFiles(req, res, auth) {
    console.log("AUTBSBIHS", auth)
    // send this auth to frontend in /uploadFile response as json
    const drive = google.drive({version: 'v3', auth}); 
    res.json(auth)
  }

app.post('/uploadFile',(req,res)=>{
  //console.log(req)
    // const {myFile} = JSON.parse(req.body)
    // console.log(myFile+"js")
    // console.log(JSON.stringify(req.body)+"ss")
    
    fs.readFile('credentials.json', (err, content) => {
        if (err) return console.log('Error loading client secret file:', err);
        // Authorize a client with credentials, then call the Google Drive API.
        // console.log("lo")
        // console.log(JSON.parse(content),"s")
        authorize(req, res, JSON.parse(content), listFiles);
       
      });
    // res.send(req.body);
})

app.get('/',(req,res)=>{
    res.send("hii")
})

app.get('/uploaded',(req,res)=>{
    console.log("hi")
    res.send("hey there")
})
app.listen('4000',()=>{
    console.log("app listening on port 4000")
})