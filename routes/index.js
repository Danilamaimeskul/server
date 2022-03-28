const Router = require('express')
const router = new Router()

const projectRouter = require('./projectRouter')
const userRouter = require('./userRouter')

router.use('/project', projectRouter)
router.use('/user', userRouter)

module.exports = router