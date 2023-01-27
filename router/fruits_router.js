const express = require('express');
const fruitsController = require('../controller/fruits_controller')
const isLogged = require('../middleware/isLogged')

let router = express.Router();


router 
    .get('/fruits', isLogged, fruitsController.GET)
    .get('/fruits/create_fruits', isLogged, fruitsController.CREATE_FRUIT)
    .get('/update_fruits/:id', isLogged, fruitsController.UPDATE_FRUIT)
    .get('/one_fruit/:id', isLogged, fruitsController.ONE_FRUIT)
    .post('/fruits', isLogged, fruitsController.POST)
    .post('/update_fruit_by_id', isLogged, fruitsController.PUT)
    .get('/fruits/:id', isLogged, fruitsController.DELETE)

module.exports = router;