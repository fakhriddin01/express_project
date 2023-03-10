const {read_file, write_file} = require('../fs/fs_api')
const bcrypt = require('bcryptjs');
const {uuid} = require('uuidv4')
const Users = {
    GET: (_, res)=>{
        let users = read_file('users.json')
        res.send(users)
    },
    POST: async(req, res)=>{
        
        
        let user = req.body
        let users = read_file('users.json');
        let foundUser = users.find(u => u.email == user.email)
        if(foundUser){
            res.render('cars/message', {
                message: "This email already used!"
            })
            return 
        }
        let salt = await bcrypt.genSalt(10);
        let hashpsw = await bcrypt.hash(user.password, salt);
        user.password = hashpsw;
        users.push({id: uuid(), role: "user", ... user})
        await write_file('users.json', users);
        res.redirect('/login')
    },
    PUT: async(req, res)=>{
        let id = req.params.id;
        let user = req.body;
        let users = read_file('users.json');
        let findId = users.find(f => f.id == id);
        if(!findId){
            return res.send('user id not found')
        }
        users.forEach(f => {
            if(f.id == id){
                f.name = user.name || f.name;
                f.email = user.email || f.email;
            }
        })
        await write_file('users.json', users);
        res.send('user updated')
    },
    DELETE: async(req, res) =>{
        let id = req.params.id;
        let users = read_file('users.json');
        let findId = users.find(f => f.id == id);
        if(!findId){
            return res.send('user id not found')
        }
        users.forEach((f, inx) => {
            if(f.id == id){
                users.splice(inx, 1);
            }
        })
        await write_file('users.json', users);
        res.send('user deleted')
    }
}

module.exports = Users