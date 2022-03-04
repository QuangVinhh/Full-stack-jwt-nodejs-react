// get the client
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejs'
});

// PAGE HOME
const handlePageHome = (req, res) => {
    return res.render("home.ejs");
}

// PAGE ABOUT
const handlePageAbout = (req, res) => {
    return res.render("about.ejs");
}

// PAGE USER
const handlePageUser = (req, res) => {
    return res.render("user.ejs");
}

// CREATE USER
const handlePageCreateUser = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    console.log(">>> SUBMIT : ", req.body);

    connection.query(
        'INSERT INTO users (username, password, email) VALUES (?,?,?)', [username, password, email],
        function (err, result) {
            if (err) { console.log(err) }
        }
    );

    return res.send("SUCCESSFULL TO CREATE NEW USER");
}

// CALL MODULE
module.exports = {
    handlePageHome,
    handlePageAbout,
    handlePageUser,
    handlePageCreateUser
}