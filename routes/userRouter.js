const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const {body} = require('express-validator')
const {User} = require('../models/models')

router.post('/signup',
    body('password').isLength({min: 4}),
    body('password').custom(value => {
        if(value.search(/\d/) === -1){
            throw new Error('Password must contain east 1 number')
        }
        if(value.search(/[a-zA-Z]/) === -1){
            throw new Error('Password must contain east 1 letter')
        }
        return true
    }),
    body('repeatPassword').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Password confirmation does not match password')
        }
        return true
    }),
    body('age').isNumeric().withMessage('Age must be a number'),
    body('age').custom(value => {
        if(value <= 0){
            throw new Error(`Age must be a number, can not be a zero`)
        }
        return true
    }),
    body('login').isLength({min: 3}).withMessage('Username must contain 3 symbols or more'),
    body('firstName').isLength({min: 3}).withMessage('First name must contain 3 symbols or more.'),
    body('lastName').isLength({min: 3}).withMessage('Last name must contain 3 symbols or more.'),

    userController.signup)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

module.exports = router