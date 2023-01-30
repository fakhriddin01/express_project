const { read_file, write_file } = require('../fs/fs_api')
const jwt = require('jsonwebtoken');
const {uuid} = require('uuidv4')

const Cars = {
    GET: async(req, res) => {
        let token = await jwt.verify(req.session.token, process.env.SECRET_KEY);
        let cars = read_file('cars.json').filter(car => car.userId === token.id);
        res.render('cars/cars_list', {
            title: "Cars list",
            isCarList: true,
            cars
        })
    },
    CREATE_CARS: (_,res)=>{
        res.render('cars/create_cars', {
            title: "Create car",
            isCarCreate: true
        })
    },
    UPDATE_CARS: (req, res)=>{
        let id = req.params.id;
        let car = read_file('cars.json').find(car => car.id == id)
        res.render('cars/update_cars', {
            title: 'Update car',
            car
        })
    }, 
    ONE_CAR: (req, res) =>{
        let id = req.params.id;
        let car = read_file('cars.json').find(car => car.id == id)
        res.render('cars/one_car', {
            title: 'One car',
            car
        })
    },
    POST: async(req, res) => {
        const newCar = req.body
        let token = await jwt.verify(req.session.token, process.env.SECRET_KEY);

        let cars = read_file('cars.json')
        
        cars.push({
            id: uuid(),
            userId: token.id,
            model: newCar.model,
            price: newCar.price,
            brand: newCar.brand
        })
        await write_file('cars.json', cars)
        res.redirect('/cars')
    },
    PUT: async(req, res) => {

        const new_car = req.body

        let cars = read_file('cars.json')
        cars.forEach((car, idex) => {
            if(car.id == new_car.id){
                car.model = new_car.model || car.model
                car.price = new_car.price || car.price
                car.brand = new_car.brand || car.brand
            }
        })

       await write_file('cars.json', cars)

        res.redirect('/cars')
    },
    DELETE: async(req, res) => {
        const car_id = req.params.id
        let cars = read_file('cars.json')
        cars.forEach((car, idx) => {
            if(car.id == car_id){
               cars.splice(idx, 1)
            }
        })

       await write_file('cars.json', cars)
       res.redirect('/cars')
    }
}


module.exports = Cars