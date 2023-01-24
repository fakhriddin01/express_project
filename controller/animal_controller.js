const {read_file, write_file} = require('../fs/fs_api')

const Animals = {
    GET: (_, res)=>{
        let animals = read_file('animals.json')
        res.render('animals/animals_list', {
            title: "Animals list",
            isAnimalList: true,
            animals
        })
    },
    CREATE_ANIMAL: (_, res) => {
        res.render('animals/create_animals', {
            isAnimalCreate: true,
            title: "Create animal"
        })
    },
    UPDATE_ANIMAL: (req, res) => {
        let id = req.params.id
        let animal = read_file('animals.json').find(animal => animal.id == id)
        res.render('animals/update_animals', {
            title: "Update animal",
            animal
        })
    },
    ONE_ANIMAL: (req, res) => {
        let id = req.params.id
        let animal = read_file('animals.json').find(animal => animal.id == id)
        res.render('animals/one_animal', {
            title: "One animal",
            animal
        })
    },  
    POST: async(req, res)=>{
        let animal = req.body
        let animals = read_file('animals.json');
        animals.push({id: animals.length +1, ...animal})
        await write_file('animals.json', animals);
        res.render('cars/message', {
            message: "Animal created!!!"
        })
    },
    PUT: async(req, res)=>{
        let animal = req.body;
        let animals = read_file('animals.json');
        let findId = animals.find(f => f.id == animal.id);
        if(!findId){
            return res.send('animal id not found')
        }
        animals.forEach(f => {
            if(f.id == animal.id){
                f.name = animal.name || f.name;
                f.price = animal.price || f.price;
            }
        })
        await write_file('animals.json', animals);
        res.render('cars/message', {
            message: "Animal updated!!!"
        })
    },
    DELETE: async(req, res) =>{
        let id = req.params.id;
        let animals = read_file('animals.json');
        let findId = animals.find(f => f.id == id);
        if(!findId){
            return res.send('animal id not found')
        }
        animals.forEach((f, inx) => {
            if(f.id == id){
                animals.splice(inx, 1);
            }
        })
        await write_file('animals.json', animals);
        res.render('cars/message', {
            message: "Animal deleted!!!"
        })
    }
}

module.exports = Animals