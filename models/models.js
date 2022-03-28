const sequelize = require('../db')
const {DataTypes} = require(
    'sequelize'
)

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    firstName: {type: DataTypes.STRING},
    lastName: {type: DataTypes.STRING},
    age: {type: DataTypes.INTEGER}
})

const Project = sequelize.define('project', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    imageSrc: {type: DataTypes.STRING},
    href: {type: DataTypes.STRING},
})

module.exports= {
    User,
    Project
}