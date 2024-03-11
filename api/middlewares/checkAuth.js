const UserModel = require('./../models/user.model')
const jwt = require('jsonwebtoken')

const checkAuth = (req, res, next) => { // Just for login without autentication
    
    if (!req.headers.authorization) return res.status(401).send('unauthorized')

    jwt.verify( req.headers.authorization,
        process.env.JWT_SECRET,
        async (err, payload) => {
            try { 
                if (err) return res.status(401).send('Token not valid. Unauthorized')
                const user = await UserModel.findOne({
                    where: { email: payload.email }
                })

                if (!user) return res.status(401).send('No user. Unauthorized')

                res.locals.user = user 
                next()
            }catch (error){
                console.log(error)
                res.status(500).send('Error on auth')
            }
        })
} 

const checkAdmin = (req, res, next) => {
    if(res.locals.user.role!=='admin') {
       return res.status(401).send('User not authorized')
    }else{
        next()
    }
}


module.exports = {
    checkAuth,
    checkAdmin
}