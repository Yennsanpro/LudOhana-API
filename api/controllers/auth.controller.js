const UserModel = require('../models/user.model')

const bcrypt = require('bcrypt') // Encrypted password
const jwt = require('jsonwebtoken') // created token

const signup = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        const user = await UserModel.create(req.body) 

        const token = jwt.sign( // token created
            {email: user.email},
            
            process.env.JWT_SECRET,//secret
            //{ expiresIn: '7d' } //solo se pone al terminar la aplicación
        )
      
        res.status(200).json({token: token, message: 'Account created'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error Signing up')
    }
}




module.exports = {
    signup
}
