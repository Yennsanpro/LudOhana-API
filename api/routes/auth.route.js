const router = require('express').Router()

const {checkAuth} = require('../middlewares/checkAuth.js')

const {
    signup,
    login,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/auth.controller')



router.post('/signup', signup)
router.post('/login', login)
router.get('', checkAuth, getUser)
router.put('', checkAuth, updateUser) 
router.delete('', checkAuth, deleteUser) 

module.exports = router