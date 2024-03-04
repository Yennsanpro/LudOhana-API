const UserModel = require('../models/user.model')

const bcrypt = require('bcrypt') // Encrypted password
const jwt = require('jsonwebtoken') // created token

const signup = async (req, res) => { //function user can signup
    try {
        const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
        req.body.password = bcrypt.hashSync(req.body.password, salt)

        const user = await UserModel.create(req.body) 

        const token = jwt.sign( // token created
            {email: user.email},
            
            process.env.JWT_SECRET,//secret word
            //{ expiresIn: '7d' } //solo se pone al terminar la aplicación
        )
      
        res.status(200).json({token: token, message: 'Account created'})
    } catch (error) {
        console.log(error)
        res.status(500).send('Error Signing up')
    }
} 

const login = async (req,res) => { // User can login

    try {
        const user = await UserModel.findOne({
            where: {
                email: req.body.email
            }
        })

        if (!user) return res.status(500).send('Email password incorrect')
        if(!bcrypt.compareSync(req.body.password, user.password))
        return res.status(500).send('Email password incorrect')

        const token = jwt.sign( //Token created
            {email: user.email}, //Identified user unique
            
            process.env.JWT_SECRET,
            //{ expiresIn: '7d' } 

        )
        return res.status(200).json({token:token})
    }catch (error){
        console.log(error)
        res.satatus(500).send('Error login.up')
    }
 }




module.exports = {
    signup,
    login
}
