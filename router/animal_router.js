const express = require('express');
const animalController = require('../controller/animal_controller')
let router = express.Router();

router 
    .get('/animals', animalController.GET)
    .get('/animals/create_animals', animalController.CREATE_ANIMAL)
    .get('/update_animal/:id', animalController.UPDATE_ANIMAL)
    .get('/about_animal/:id', animalController.ONE_ANIMAL)
    .post('/animals', animalController.POST)
    .post('/update_animal_by_id', animalController.PUT)
    .get('/animals/:id', animalController.DELETE)

module.exports = router;