import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';

// HASH PASSWORD
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    return bcrypt.hashSync(userPassword, salt);
}

// CREATE NEW USER
const createNewUser = async (username, password, email) => {

    let hashPassword = hashUserPassword(password);

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodejs',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('INSERT INTO users (username, password, email) VALUES (?,?,?)', [username, hashPassword, email]);
    } catch (err) {
        console.log(">>> Check Error Create User :", err)
    }
}

// READ USER LIST
const getUserList = async () => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodejs',
        Promise: bluebird
    });

    let users = [];

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (err) {
        console.log(">>> Check Error Read User :", err)
    }
}

//----------DELETE USER
const deleteUser = async (id) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodejs',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
    } catch (err) {
        console.log(">>> Check Error Delete User :", err)
    }
}

//----------GET USER
const getUserUpdate = async (id) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodejs',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
        return rows;
    } catch (err) {
        console.log(">>> Check Error Get Update User :", err)
    }
}

//----------UPDATE USER
const updateUser = async (id, username, email) => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'nodejs',
        Promise: bluebird
    });

    try {
        const [rows, fields] = await connection.execute('UPDATE users SET username=?, email=? WHERE id=?', [username, email, id]);
        return rows;
    } catch (err) {
        console.log(">>> Check Error Update User :", err)
    }
}

// CALL MODULE
module.exports = {
    createNewUser,
    getUserList,
    deleteUser,
    getUserUpdate,
    updateUser
}