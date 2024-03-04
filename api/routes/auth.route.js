const router = require ('express').Router()

const {
    signup,//comes from auth controller
    login,
    getUser
} = require ('../controllers/auth.controller')



router.post('/signup', signup)
router.post('/login', login)
router.get('/:id', getUser) // get one user

module.exports = router