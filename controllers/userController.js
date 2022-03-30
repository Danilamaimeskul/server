const {User} = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userService = require('../service/userService')
const {validationResult} = require('express-validator')
const ApiError = require('../error/apiError')


class UserController {
 
    async signup(req, res, next) {
        try{
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {login, password, repeatPassword, firstName, lastName, age} = req.body
            const userData = await userService.signup(login, password, repeatPassword, firstName, lastName, age)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch(e){
            next(e)
        }
    }
    async login(req, res, next) {
        try{
            const {login, password} = req.body
            const userData = await userService.login(login, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch(e){
            next(e)
        }
    }
    async logout(req, res, next) {
        try{
            const {refreshToken} = req.headers.cookie;
            res.clearCookie('refreshToken')
            return res.json(refreshToken)
        }catch(e){
            next(e)
        }
    }
    async refresh (req, res, next) {
        try{
            const refreshToken = req.headers.cookie.split('=')[1];
            console.log(refreshToken)
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        }catch(e){
            next(e)
        }
    }

   
}

module.exports = new UserController()