const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Middleware to restrict access to specific users
function requireSpecificUser(req, res, next) {
  // Replace with the usernames you want to allow
  const allowedUsernames = ['JamesAung', 'janbrauner', 'SoerenMind'];
  const username = req.headers['x-replit-user-name'];

  if (username && allowedUsernames.includes(username)) {
    next();
  } else {
    res.status(403).send('Forbidden');
  }
}


// Comment out the following line to disable authentication and remember to turn off Replit Auth
app.use(requireSpecificUser);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Render Html File
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
