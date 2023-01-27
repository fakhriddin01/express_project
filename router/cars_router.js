const express = require('express')
const CarsController = require('../controller/cars_controller')
const isLogged = require('../middleware/isLogged')

let router = express.Router()

router
   .get('/cars', isLogged, CarsController.GET)
   .get('/cars/create_cars', isLogged, CarsController.CREATE_CARS)
   .get('/update_car/:id', isLogged, CarsController.UPDATE_CARS)
   .get('/about_car/:id', isLogged, CarsController.ONE_CAR)
   .post('/cars',  isLogged, CarsController.POST)
   .post('/update_car_by_id', isLogged, CarsController.PUT)
   .get('/cars/:id', isLogged, CarsController.DELETE)


module.exports = router