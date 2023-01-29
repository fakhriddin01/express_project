module.exports = function(req, res, next) {
    if(req.session.logedUser){
        if(req.session.logedUser.role != "admin"){
            res.redirect('/cars')
            return 
        }
    }
    next()
}