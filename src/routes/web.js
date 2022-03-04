import express from "express";
import homeController from "../controller/homeController";

const router = express.Router();
const initWebRoutes = (app) => {

    // path, handle
    router.get("/", homeController.handlePageHome);
    router.get("/about", homeController.handlePageAbout);
    router.get("/user", homeController.handlePageUser);
    router.post("/users/create-user", homeController.handlePageCreateUser)

    return app.use("/", router);
}

export default initWebRoutes;