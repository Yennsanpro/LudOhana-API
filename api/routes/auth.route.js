const router = require('express').Router()
const {checkAuth} = require('../middlewares/checkAuth.js')

const {
    signup,//comes from auth controller
    login,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/auth.controller')



router.post('/signup', signup)
router.post('/login', login)
router.get("/google", (req, res) => res.send(req.user));
router.get('/:id', checkAuth, getUser)
router.put('/:id', checkAuth, updateUser) 
router.delete('/:id', checkAuth, deleteUser) 

module.exports = router