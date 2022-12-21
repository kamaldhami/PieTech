//#region <Library Imports>
const express = require('express');
//#endregion

const app = express();
const path = require("path");
//#region <Project Imports>
require('../database/mongodb');
const originConfig = require("../config/cors");
const apiRouter = require('../routes/api.route');
const errorCallBack = require('../config/error-callback');
//#endregion

//#region <Security>
app.use((req, res, next) => {
    res.setHeader('X-Powered-By', 'PHP');
    next();
});
//#endregion

//#region <Body parser and formdata>
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '1mb' }));
//#endregion

//app.use(express.static(path.join(__dirname, '../', 'public')));
app.use(express.static(path.join('public')));
app.use(apiRouter);
//#region <Error Handling>

app.use(errorCallBack());

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION! Shutting down...", err.name, err.message);
    process.exit(1);
});
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION! Shutting down...", err.name, err.message);
    process.exit(1);
});

//#endregion

module.exports = app;