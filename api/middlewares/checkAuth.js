const UserModel = require('./../models/user.model')
const jwt = require('jsonwebtoken')
const passport = require('passport')
const {OAuth2Strategy} =  require("passport-google-oauth");

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

/* const initialize = (req,res,next)=>{
    console.log("estoy en initialize")
    passport.initialize()
    next()
} */
/* const setGoogleAuth = (req, res , next)=>{
    console.log("estoy en set")
    passport.authenticate("auth-google", {
        scope: [
            "https://www.googleapis.com/auth/userinfo.profile",
            "https://www.googleapis.com/auth/userinfo.email",
        ],
        session: false,
    })
    next()
}
 */



/* const checkGoogleAuth = (req,res,next)=>{
    console.log("estoy en check")
    const emails = [];
    
    passport.use(
      "auth-google",
      new OAuth2Strategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "http://localhost:3000/auth/google",
        },
        function (accessToken, refreshToken, profile, done) {
          const response = emails.includes(profile.emails[0].value);
          // IF EXITS IN DATABASE
          if (response) {
            done(null, profile);
          } else {
            // SAVE IN DATABASE
            emails.push(profile.emails[0].value);
            done(null, profile);
          }
        }
      )
    )
    next()
}
 */

module.exports = {
    checkAuth,
    checkAdmin,
    //setGoogleAuth
    
    
}