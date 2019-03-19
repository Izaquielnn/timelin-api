const express = require("express");
const db = require('./config/database');
const routes = require('./routes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(routes);

db.sync().then(() => {

    console.log("database connected...");
    app.listen(PORT, console.log(`Server started on port ${PORT}`));

}).catch(err => console.log('Error: ' + err));