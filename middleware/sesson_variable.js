module.exports = function(req, res, next){
    res.locals.isAuth = req.session.isAuthenticated
    if(req.session.logedUser.role === 'admin'){
        res.locals.isAdmin = true
    }
    else{
        res.locals.isAdmin = false
    }
    next()
}