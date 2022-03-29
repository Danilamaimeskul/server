const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const {body} = require('express-validator')

router.post('/signup',
    body('password').isLength({min: 4}),
    body('login').isLength({min: 3}),
    body('firstName').isLength({min: 3}),
    body('lastName').isLength({min: 3}),
    userController.signup)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)

module.exports = router