const {read_file, write_file} = require('../fs/fs_api')
const {uuid} = require('uuidv4')

const Admin = {
    ADMIN_PANEL: (req, res)=>{
        let users = read_file('users.json').filter(user => user.id != req.session.logedUser.id);
        res.render('admin_panel/admin_panel', {
            title: "Admin panel",
            isAdminPanel: true,
            users
        })
    },
    UPDATE_USER: (req, res) => {
        let id = req.params.id
        let user = read_file('users.json').find(user => user.id == id)
        res.render('admin_panel/update_users', {
            title: "Update user",
            user
        })
    },
    PUT: async(req, res)=>{
        let user = req.body;
        let users = read_file('users.json');
        let findId = users.find(u => u.id == user.id);
        if(!findId){
            return res.send('user id not found')
        }
        users.forEach(u => {
            if(u.id == user.id){
                u.username = user.username || u.username;
                u.email = user.email || u.email;
                u.role = user.role || u.role;
            }
        })
        await write_file('users.json', users);
        res.redirect('/admin_panel')
    },
    DELETE: async(req, res) =>{
        let id = req.params.id;
        let users = read_file('users.json');
        let findId = users.find(u => u.id == id);
        let animals = read_file('animals.json');
        let cars = read_file('cars.json')
        let fruits =read_file('fruits.json')
        if(!findId){
            return res.send('user id not found')
        }
        users.forEach((u, inx) => {
            if(u.id == id){
                users.splice(inx, 1);
            }
        })
        await write_file('users.json', users);
       
        for(let i=0; i<animals.length; i++){
            if(animals[i].userId == id){
                animals.splice(i, 1);
                i--;
                animals.length--;
            }
        }
        await write_file('animals.json', animals);

        for(let i=0; i<cars.length; i++){
            if(cars[i].userId == id){
                cars.splice(i, 1);
                i--;
                cars.length--;
            }
        }
        await write_file('cars.json', cars);

        for(let i=0; i<fruits.length; i++){
            if(fruits[i].userId == id){
                fruits.splice(i, 1);
                i--;
                fruits.length--;
            }
        }
        await write_file('fruits.json', fruits);
        res.redirect('/admin_panel')
    },
    USER_INFO: (req, res) => {
        let id = req.params.id
        let user = read_file('users.json').find(user => user.id == id)
        let cars = read_file('cars.json').filter(car => car.userId == id);
        let fruits = read_file('fruits.json').filter(fruit => fruit.userId == id);
        let animals = read_file('animals.json').filter(animal => animal.userId == id);
        res.render('admin_panel/one_user', {
            title: "User info",
            user,
            cars,
            animals,
            fruits
        })
    }
}

module.exports = Admin