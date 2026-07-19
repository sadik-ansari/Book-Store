const express = require('express')
const { handleCreateNewUser, handleLoginUser, handleGuestoLogin } = require('../controllers/userController')
const { authMiddleware } = require('../middleware/auth.js')
const router = express.Router()

router.post('/user', handleLoginUser)
router.post('/user/guest-user', handleGuestoLogin)
router.post('/', handleCreateNewUser)
router.post('/user/verifyToken', authMiddleware, (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
})


module.exports = router 