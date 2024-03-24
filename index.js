require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const api = express()
const path = require('path')
const sequelize = require('./db')
const passport = require("passport")
const routerAuth = require("./api/routes/auth.route")
const { OAuth2Strategy} = require("passport-google-oauth") ;



const dbSync = require('./db/sync')
const { addRelations } = require('./db/relationships')
api.use(morgan('dev'))
api.use(express.json())
api.disable('x-powered-by');
api.use('/api', require('./api/routes/index.route'))
api.use(express.static(path.resolve('api/public')))


api.use(passport.initialize());

 api.use(
  "/auth",
  passport.authenticate("auth-google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
  }),
  routerAuth
); 



const emails = ["bqcount@gmail.com"];

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
);
const dbCheck = async() => {
    try {
        await sequelize.authenticate()
        addRelations()
        await dbSync()
        console.log('connected to DB')
    }catch (error){
        throw new Error(error)
    }
}

api.listen(process.env.PORT, async (err) => {
    if (err) throw new Error ('Cannot start API')
    await dbCheck()
    console.log('*'.repeat(50))
    console.log(`API Running on port ${process.env.PORT}`)
    console.log('*'.repeat(50))
})

