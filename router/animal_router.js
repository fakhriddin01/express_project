const express = require('express');
const animalController = require('../controller/animal_controller')
const isLogged = require('../middleware/isLogged')

let router = express.Router();

router 
    .get('/animals', isLogged, animalController.GET)
    .get('/animals/create_animals', isLogged, animalController.CREATE_ANIMAL)
    .get('/update_animal/:id', isLogged, animalController.UPDATE_ANIMAL)
    .get('/about_animal/:id', isLogged, animalController.ONE_ANIMAL)
    .post('/animals', isLogged, animalController.POST)
    .post('/update_animal_by_id', isLogged, animalController.PUT)
    .get('/animals/:id', isLogged, animalController.DELETE)

module.exports = router;