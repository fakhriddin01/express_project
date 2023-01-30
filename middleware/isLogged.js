
const jwt = require('jsonwebtoken')

module.exports = async function(req, res, next){
    try {
       await jwt.verify(req.session.token, process.env.SECRET_KEY)
       
    } catch (error) {
       
        res.redirect('/login')
        return
    }
next()
}