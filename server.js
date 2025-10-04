//import the express module
const express = require('express');
const app = express();
const port = 3000;

// create a simple route
app.get('/', (req, res) => {
  res.send(
    `<h1>Hello World!</h1>
     <p>This is a simple Express server.</p>
        <p>Visit <a href="/about">/about</a> to learn more about this server.</p>
        <p>Visit <a href="/contact">/contact</a> to get in touch.</p>
     `
  );
});
app.get('/about', (req, res) => {
  res.send(
    `<h1>About This Server</h1>
     <p>This server is built using Node.js and Express.</p>
     <p>It serves simple HTML content for demonstration purposes.</p>
     <p>Go back to <a href="/">home</a>.</p>
     `
  );
});
72e07f6a0d73949ea058313e40bdc6f4
app.get('/contact', (req, res) => {
  res.send(
    `<h1>Contact Us</h1>
     <p>You can contact us at <a href="mailto:ezranzioki@gmail.com">mail</a></p>
     <p>Go back to <a href="/">home</a>.</p>
     `
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});