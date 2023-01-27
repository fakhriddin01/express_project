const express = require('express')
const controller = require('../controller/auth_controller')

const router = express.Router();

router
    .get('/registration', controller.REGISTRATION)
    .get('/login', controller.LOGIN)
    .post('/login_user', controller.LOGIN_USER)
    .get('/logout', controller.LOGOUT)


module.exports= router