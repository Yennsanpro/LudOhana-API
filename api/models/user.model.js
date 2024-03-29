const { DataTypes } = require('sequelize')
const sequelize = require('../../db')

const IMAGE_EXTENSIONS = ['png', 'jpeg', 'jpg', 'webdp']

function hasValidImageExtension(path) { //function created for validate image
    const lowerCasePath = path.toLowerCase();
    return IMAGE_EXTENSIONS(path).some((extension) => lowerCasePath.endsWith(`${ extension }`))
}

const UserModel = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 155] //minimum and maximum validation
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 155] //minimum and maximum validation
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user',
        validate: {
            isIn: [[undefined, 'user', 'admin']] //define the admin roll
        }
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,

    },
    image: {
        type: DataTypes.STRING,
        validate: { //on the top has the function to make this validate
            endsWithValidImageExtension(value) {
                if (!hasValidImageExtension(value)) {
                    throw new Error('Img should have these extensions: ' + `${[...IMAGE_EXTENSIONS]}`);
                }
            }
        }
    },
})


module.exports = UserModel