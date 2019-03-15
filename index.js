const express = require("express");
const db = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(routes);

db.sync({ force: true }).then(() => {

    console.log("database connected...");
    app.listen(PORT, console.log(`Server started on port ${PORT}`));

}).catch(err => console.log('Error: ' + err));