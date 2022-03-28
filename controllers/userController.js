const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/apiError')


generateJWT = (login) => {
    return jwt.sign({login}, process.env.JWT_KEY)
}
class UserController {
    async signup(req, res){
        const {login, password, firstName, lastName, age} = req.body
        // Валидацию сделать нада 
        const sameUser = await User.findOne({where: {login}})
        if(sameUser){
            //Ашипка, такой юзер уже был придуман
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, password: hashPassword, firstName, lastName, age})
        const token = generateJWT(login)
        return res.json({token})
    }

    async login(req, res, next){
        const {login, password} = req.body
        const user = await User.findOne({where: {login}})
        if(!user){
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJWT(login)
        return res.json({token})
    }

    async check(req, res){
        const token = generateJWT(req.user.login)
        return res.json(token)
    }
}

module.exports = new UserController()