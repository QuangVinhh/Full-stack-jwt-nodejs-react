import bodyParser from "body-parser";
import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./config/connectDB";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// view engine
configViewEngine(app);

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//----------|| connect to DB
connection();

// web routes
initWebRoutes(app);

app.listen(PORT, () => {
    console.log(">>> Server is running in PORT : " + PORT);
})