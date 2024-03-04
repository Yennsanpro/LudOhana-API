const router = require('express').Router()

const {
    signup,//comes from auth controller
    login,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/auth.controller')



router.post('/signup', signup)
router.post('/login', login)
router.get('/:id', getUser) // get one user
router.put('/:id', updateUser) 
router.delete('/:id', deleteUser) 

module.exports = router