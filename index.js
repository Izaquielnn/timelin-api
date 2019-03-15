const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;


const db = require('./config/database');

db.authenticate()
    .then(() => {
        console.log('Database connected...');
        app.listen(PORT, console.log(`Server started on port ${PORT}`));
    })
    .catch(err => console.log('Error: ' + err));

