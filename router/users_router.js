const express = require('express');
const usersController = require('../controller/users_controller')
let router = express.Router();

router 
    .get('/users', usersController.GET)
    .post('/users', usersController.POST)
    .put('/users/:id', usersController.PUT)
    .delete('/users/:id', usersController.DELETE)

module.exports = router;