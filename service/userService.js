const bcrypt = require('bcrypt')
const {User} = require('../models/models')
const tokenService = require('./tokenService')
const UserDto = require('../dtos/userDto')
const ApiError = require('../error/apiError')

class UserService {

    async signup (login, password, repeatPassword, firstName, lastName, age){
        const sameUser = await User.findOne({where: {login}})
        if(sameUser){
            throw ApiError.BadRequest(`Пользователь с таким логином ${login} уже существует`)

        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({login, password: hashPassword, firstName, lastName, age})
        
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto});

        return{
            ...tokens,
            user: userDto,
        }
        
    }

    async login(login, password){
        const user = await User.findOne({where: {login}})
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с таким логином ${login} не найден`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        return {...tokens, user: userDto}
    }

    async refresh(refreshToken){
         if(!refreshToken){
             throw ApiError.UnauthorizedError('unauthorized user1')
         }
         const userData = tokenService.validateRefreshToken(refreshToken);
         if(!userData){
             throw ApiError.UnauthorizedError('unauthorized user2')
         }
         const user = await User.findOne({where: {login: userData.login}});
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        return {...tokens, user: userDto}
    }
}

module.exports = new UserService()