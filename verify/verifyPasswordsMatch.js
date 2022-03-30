const check = require('express-validator/check')

exports.verifyPasswordsMatch = (req, res, next) => {
    const {repeatPassword} = req.body

    return check('password')
      .isLength({ min: 4 })
      .withMessage('password must be at least 4 characters')
      .equals(repeatPassword)
}