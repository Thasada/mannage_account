module.exports = (app) => {
  const authJwt = require("../middlewares/auth.jwt");
  const user_controller = require("../controllers/user.controller");
  var router = require("express").Router();
  router.get("/:us", user_controller.validUsername);
  router.post("/signup", user_controller.createNewUser);
  router.post("/login", user_controller.login);
  router.get("/", authJwt, user_controller.getAllUsers);
  router.put("/:id", authJwt, user_controller.updateUserCtrl);
  router.delete("/:id", authJwt, user_controller.deleteUser);
  app.use("/api/auth", router);
};
