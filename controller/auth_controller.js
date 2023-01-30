const { read_file, write_file } = require('../fs/fs_api')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const Auth = {
    REGISTRATION: (req, res) => {
        res.render('auth/registration', {
            title: "Registration",
            isRegistration: true
        })
    },
    LOGIN: (req, res) => {
        res.render('auth/login', {
            title: "Login",
            isLogin: true
        })
    },
    LOGIN_USER: (req, res) => {
        let user = req.body;
        let users = read_file('users.json');
        let foundUser = users.find(u => u.email == user.email);

        if(!foundUser){
            res.render('auth/login', {
                msg: 'User not exist!',
            })
            return 
        }
        let token = jwt.sign({ id: foundUser.id, role: foundUser.role}, process.env.SECRET_KEY, {
            expiresIn: '30s'
        })
        
        req.session.isAuthenticated = true
        req.session.token = token;
        res.redirect('/cars')
    },
    LOGOUT: (req, res) =>{
        req.session.destroy(() => {
            res.redirect('/login')
         })
    }
}


module.exports = Auth