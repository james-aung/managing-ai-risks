const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.hostname}${req.url}`);
  }
  return next();
});


const PASSWORD = process.env.SITE_PASSWORD;
;

const passwordProtected = (req, res, next) => {
  res.set('WWW-Authenticate', 'Basic realm="Simple Site"');
  if (req.headers.authorization === `Basic ${Buffer.from(`:${PASSWORD}`).toString('base64')}`) {
    next();
  } else {
    res.status(401).send("Authentication required");
  }
}

// Toggle this as comment when we want to disable password protection
app.use(passwordProtected);


// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  // Code.....
});
