import userService from '../service/userService';

// PAGE HOME
const handlePageHome = (req, res) => {
    return res.render("home.ejs");
}

// PAGE ABOUT
const handlePageAbout = (req, res) => {
    return res.render("about.ejs");
}

// PAGE USER
const handlePageUser = async (req, res) => {

    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}

//----------CREATE USER
const handlePageCreateUser = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;

    userService.createNewUser(username, password, email);
    return res.redirect("/user");
}

//----------DELETE USER
const handlePageDeleteUser = async (req, res) => {

    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}

//----------GET USER
const handlePageGetUser = async (req, res) => {

    let id = req.params.id;
    let user = await userService.getUserUpdate(id);
    let userData = {};

    if (user && user.length > 0) {
        userData = user[0];
    }

    return res.render("update-user.ejs", { userData });
}

//----------UPDATE USER
const handlePageUpdateUser = async (req, res) => {

    let id = req.body.id;
    let username = req.body.username;
    let email = req.body.email;

    await userService.updateUser(id, username, email);
    return res.redirect("/user");
}

// CALL MODULE
module.exports = {
    handlePageHome,
    handlePageAbout,
    handlePageUser,
    handlePageCreateUser,
    handlePageDeleteUser,
    handlePageGetUser,
    handlePageUpdateUser
}