const router = require ('express').Router()

const {
    signup,//comes from auth controller
    login
} = require ('../controllers/auth.controller')



router.post('/signup', signup)
router.post('/login', login)

module.exports =router