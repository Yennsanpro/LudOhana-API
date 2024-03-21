const router = require('express').Router()
const passport = require('../middlewares/oAuth'); // Corrige la ruta de importación

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
router.get('/auth/google', passport.authenticate('auth-google', { scope: ['profile', 'email'] }));
router.get('/login/google',(req,res)=>res.send(req.user))
router.get('/auth/google/callback', passport.authenticate('auth-google', {
    failureRedirect: '/login', // Redirige aquí en caso de error
  }), (req, res) => {
    // Maneja el éxito de la autenticación
    res.redirect('/login/google'); // Redirige a la ruta de éxito de autenticación
  });
router.get('/:id', checkAuth, getUser)
router.put('/:id', checkAuth, updateUser) 
router.delete('/:id', checkAuth, deleteUser) 

module.exports = router