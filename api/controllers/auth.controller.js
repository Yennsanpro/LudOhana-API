const UserModel = require('../models/user.model')

const bcrypt = require('bcrypt') // Encrypted password
const jwt = require('jsonwebtoken') // created token

function generateToken(email) {
  return jwt.sign({ email: email }, process.env.JWT_SECRET)
}

async function loginWithGoogle(profile) {
  try {
    const email = profile.emails[0].value

    // Verificar si el email existe en la base de datos
    const existingUser = await UserModel.findOne({ where: { email: email } })

    if (existingUser) {
      // Si el usuario ya existe, le asignamos un token y lo pasamos al siguiente middleware
      const token = generateToken(existingUser.email)

      // response.status(200).json({ token: token, role:existingUser.role,message: "Account created" });
      return {
        token: token,
        role: existingUser.role,
        message: 'Account created',
      }
    } else {
      // Si el usuario no existe, lo creamos utilizando los datos de Google
      const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
      const newUser = await UserModel.create({
        email: email,
        password: bcrypt.hashSync(profile.id, salt),
        name: profile.name.givenName,
        lastName: profile.name.familyName,
        role: 'user',
      })

      const token = generateToken(newUser.email)
      return { token: token, role: newUser.role, message: 'Account created' }
      //response.status(200).json({ token: token, role:newUser.role,message: "Account created" });
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error logging in with Google')
  }
}

const signup = async (req, res) => {
  //function user can signup
  try {
    const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
    req.body.password = bcrypt.hashSync(req.body.password, salt)

    req.body.role = 'user'
    const user = await UserModel.create(req.body)
    const token = jwt.sign(
      // token created
      { email: user.email },

      process.env.JWT_SECRET //secret word
      //{ expiresIn: '7d' } //solo se pone al terminar la aplicación
    )

    res
      .status(200)
      .json({ token: token, role: user.role, message: 'Account created' })
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(409).send(`Email ${error.fields.email} already exists`)
    } else {
      res.status(500).send('Error Signing up')
    }
  }
}

const login = async (req, res) => {
  // function User can login

  try {
    const user = await UserModel.findOne({
      where: {
        email: req.body.email,
      },
    })

    if (!user) return res.status(500).send('Email password incorrect')
    if (!bcrypt.compareSync(req.body.password, user.password))
      return res.status(500).send('Password incorrect')

    const token = jwt.sign(
      //Token created
      { email: user.email }, //Identified user unique

      process.env.JWT_SECRET
    )
    return res.status(200).json({ token: token, role: user.role })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error login up')
  }
}
async function getUser(req, res) {
  try {
    // We used res.locals.user because user need to be logged and this action protect endpoint to receive any data
    const user = await res.locals.user
    delete user.dataValues.password
    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).send('User not found')
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

async function updateUser(req, res) {
  try {
    if (req.body.password) {
      const salt = bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT))
      req.body.password = bcrypt.hashSync(req.body.password, salt)
    }

    req.body.role = 'user'
    const [userExist] = await UserModel.update(req.body, {
      returning: true,
      where: {
        id: res.locals.user.id,
      },
    })
    if (userExist !== 0) {
      return res.status(200).json({ message: 'User updated' })
    } else {
      return res.status(404).send('User not found')
    }
  } catch (error) {
    console.log(error)
    return res.status(500).send(error.message)
  }
}

async function deleteUser(req, res) {
  try {
    const user = await UserModel.destroy({
      where: {
        id: res.locals.user.id,
      },
    })
    if (user) {
      return res.status(200).json({ message: 'User deleted' })
    } else {
      return res.status(404).send('User not found')
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  signup,
  login,
  getUser,
  updateUser,
  deleteUser,
  loginWithGoogle,
}
