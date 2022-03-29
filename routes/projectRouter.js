const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/authMiddleware')
const projectController = require('../controllers/projectController')

router.get('/', authMiddleware, projectController.getAll)

module.exports = router