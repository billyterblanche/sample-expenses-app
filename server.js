const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const path = require('path');

const routesApi = require('./src/server/routes/index');

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/api", routesApi);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch unauthorised errors
app.use((err, req, res) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({ message: `${err.name}: ${err.message}` });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});