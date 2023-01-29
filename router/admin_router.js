const express = require('express');
const adminController = require('../controller/admin_controller')
const isLogged = require('../middleware/isLogged')
const isLoggedAdmin = require('../middleware/isLoggedAdmin')

let router = express.Router();

router 
    .get('/admin_panel', isLogged, isLoggedAdmin, adminController.ADMIN_PANEL)
    .get('/update_user/:id', isLogged, isLoggedAdmin, adminController.UPDATE_USER)
    .post('/update_user_by_id', isLogged, isLoggedAdmin, adminController.PUT)
    .get('/delete_user/:id', isLogged, isLoggedAdmin, adminController.DELETE)
    .get('/about_user/:id', isLogged, isLoggedAdmin, adminController.USER_INFO)

module.exports = router;