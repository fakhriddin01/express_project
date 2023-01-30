const jwt = require('jsonwebtoken')

module.exports = async function(req, res, next){
    try {
        let token= await jwt.verify(req.session.token, process.env.SECRET_KEY)

        if(token.role != "admin"){
            res.redirect('/cars')
            return
        }
    } catch (error) {
        
        res.redirect('/login').
        return
        
    }
next()
}




// module.exports = function(req, res, next) {
//     if(req.session.logedUser){
//         if(req.session.logedUser.role != "admin"){
//             res.redirect('/cars')
//             return 
//         }
//     }
//     next()
// }


