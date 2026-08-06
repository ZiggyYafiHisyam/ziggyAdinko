const express = require('express');
const UserController = require('../controller/users.js');
const router = express.Router();

// READ (GET)
router.get("/", UserController.getAllUsers);

// CREATE (POST)
router.post("/", UserController.createNewUser);

// UPDATE (PATCH)
router.patch("/:idUser", UserController.updateUser);

// DELETE (DELETE)
router.delete("/:idUser", UserController.deleteUser);

module.exports = router;