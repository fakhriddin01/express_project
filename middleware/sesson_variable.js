const jwt = require('jsonwebtoken')

module.exports = async function(req, res, next){
    res.locals.isAuth = req.session.isAuthenticated

    try {
        let token= await jwt.verify(req.session.token, process.env.SECRET_KEY)
        if(token.role == "admin"){
            res.locals.isAdmin = true
        }
        else{
            res.locals.isAdmin = false
        }
    } catch (error) {
        
            res.redirect('/login')
            return
        
    }


    // if(req.session.token){
    //     try {
    //         let token= await jwt.verify(req.session.token, process.env.SECRET_KEY)

    //         if(token.role == "admin"){
    //             res.locals.isAdmin = true
    //         }
    //         else{
    //             res.locals.isAdmin = false
    //         }
    //     } catch (error) {
    //         res.redirect('/login')
    //     }
    // }
    // else{
    //     res.redirect('/login')
    // }
   
    next()
}