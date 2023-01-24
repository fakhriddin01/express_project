const express = require('express');
const fruitsController = require('../controller/fruits_controller')
let router = express.Router();

router 
    .get('/fruits', fruitsController.GET)
    .get('/fruits/create_fruits', fruitsController.CREATE_FRUIT)
    .get('/update_fruits/:id', fruitsController.UPDATE_FRUIT)
    .get('/one_fruit/:id', fruitsController.ONE_FRUIT)
    .post('/fruits', fruitsController.POST)
    .post('/update_fruit_by_id', fruitsController.PUT)
    .get('/fruits/:id', fruitsController.DELETE)

module.exports = router;