const router = require ('express').Router()

const {
    signup,//comes from auth controller
   
} = require ('../controllers/auth.controller')



router.post('/signup', signup)
//router.post('/login', login)
module.exports =router