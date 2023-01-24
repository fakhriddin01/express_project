const express = require('express')
const CarsController = require('../controller/cars_controller')


let router = express.Router()

router
   .get('/cars', CarsController.GET)
   .get('/cars/create_cars', CarsController.CREATE_CARS)
   .get('/update_car/:id', CarsController.UPDATE_CARS)
   .get('/about_car/:id', CarsController.ONE_CAR)
   .post('/cars', CarsController.POST)
   .post('/update_car_by_id', CarsController.PUT)
   .get('/cars/:id', CarsController.DELETE)


module.exports = router