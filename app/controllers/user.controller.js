const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const validUsername = (req, res) => {
  User.checkUsername(req.params.us, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res.send({
          message: `Not Found: ${req.params.us}`,
          valid: true,
        });
      } else {
        res.status(500).send({
          message: "Error query: " + req.params.us,
        });
      }
    } else {
      res.send({
        record: data,
        valid: false,
      });
    }
  });
};
const createNewUser = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
  }
  const userObject = {
    fullname: req.body.fullname,
    email: req.body.email,
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, salt),
    img: req.body.img,
  };
  User.create(userObject, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while creating",
      });
    } else {
      res.send(data);
    }
  });
};

const login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty.",
    });
  }
  const acc = {
    username: req.body.username,
    password: req.body.password,
  };
  User.loginModel(acc, (err, data) => {
    if (err) {
      if (err.kind == "not_found") {
        res
          .status(401)
          .send({ message: "Not found user: " + req.body.username });
      } else if (err.kind == "invalid_pass") {
        res.status(401).send({
          message: "Invalid password",
        });
      } else {
        res.status(500).send({
          message: "Query error: " + err,
        });
      }
    } else res.send(data);
  });
};

const getAllUsers = (req, res) => {
  User.getAllRecords((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Some error occured while getting",
      });
    } else {
      res.send(data);
    }
  });
};

const updateUserCtrl = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty",
    });
  }
  const data = {
    fullname: req.body.fullname,
    email: req.body.email,
    img: req.body.img,
  };
  User.updateUser(req.params.id, data, (err, result) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({ message: "Not found user: " + req.params.id });
      } else {
        res
          .status(500)
          .send({ message: "Error update user: " + req.params.id });
      }
    } else {
      res.send(result);
    }
  });
};

const deleteUser = (req, res) => {
  console.log(
    "parameters: " + req.params.id + " ," + req.params.p1 + " ," + req.params.p2
  );
  User.removeUser(req.params.id, (err, result) => {
    if (err) {
      if (err.kind == "not_found") {
        res.status(401).send({
          message: "Not found user: " + req.params.id,
        });
      } else {
        res.status(500).send({
          message: "Error delete user: " + req.params.id,
        });
      }
    } else {
      res.send(result);
    }
  });
};
module.exports = {
  validUsername,
  createNewUser,
  login,
  getAllUsers,
  updateUserCtrl,
  deleteUser,
};
