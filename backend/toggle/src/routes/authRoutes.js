const express = require('express')
const { addUser, getUser, removeUser } = require('../controller/authController')
const router = express.Router()

router.post('/signin', getUser)
router.post('/signup', addUser)
router.get('/logout', removeUser)


module.exports = router