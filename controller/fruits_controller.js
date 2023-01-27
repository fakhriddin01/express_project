const {read_file, write_file} = require('../fs/fs_api')
const {uuid} =require('uuidv4')

const Fruits = {
    GET: (req, res)=>{
        let fruits = read_file('fruits.json').filter(fruit => fruit.userId==req.session.logedUser.id)
        res.render('fruits/fruits_list', {
            title: "fruit_list",
            isFruitsList: true,
            fruits
        })
    },
    CREATE_FRUIT:(_, res)=>{
        res.render('fruits/create_fruits', {
            title: "Create fruit",
            isFruitCreate: true
        })
    },
    UPDATE_FRUIT:(req, res)=>{
        let id = req.params.id;
        let fruit = read_file('fruits.json').find(fruit => fruit.id == id);
        res.render('fruits/update_fruits', {
            title: "Update fruit",
            fruit
        })
    },
    ONE_FRUIT:(req, res)=>{
        let id = req.params.id;
        let fruit = read_file('fruits.json').find(fruit => fruit.id == id);
        res.render('fruits/one_fruit', {
            title: "One fruit",
            fruit
        })
    },
    POST: async(req, res)=>{
        let fruit = req.body
        let fruits = read_file('fruits.json');
        fruits.push({id: uuid(), userId: req.session.logedUser.id, ...fruit})
        await write_file('fruits.json', fruits);
        res.redirect('/fruits')
    },
    PUT: async(req, res)=>{
        let fruit = req.body;
        let fruits = read_file('fruits.json');
        let findId = fruits.find(f => f.id == fruit.id);
        if(!findId){
            return res.send('fruit id not found')
        }
        fruits.forEach(f => {
            if(f.id == fruit.id){
                f.name = fruit.name || f.name;
                f.price = fruit.price || f.price;
            }
        })
        await write_file('fruits.json', fruits);
        res.redirect('/fruits')
    },
    DELETE: async(req, res) =>{
        let id = req.params.id;
        let fruits = read_file('fruits.json');
        let findId = fruits.find(f => f.id == id);
        if(!findId){
            return res.send('fruit id not found')
        }
        fruits.forEach((f, inx) => {
            if(f.id == id){
                fruits.splice(inx, 1);
            }
        })
        await write_file('fruits.json', fruits);
        res.redirect('/fruits')
    }
}

module.exports = Fruits