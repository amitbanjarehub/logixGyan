const express = require("express");
const app = express();
const { Port } = require("./helper/config");
const db = require("./helper/db");
const bodyParser = require("body-parser");
const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const corsOptions = {
    origin: true,
    credentials: true,
};
app.use(cors(corsOptions));
app.use('/public', express.static('public'));
const Api = require("./router/route");
app.use("/api", Api);
app.listen(Port, () => console.log(`Server run on port ${Port}`));

//open image on browser
//http://0.0.0.0:8001/public/checkInselfie-1659896911111.png