const router = require("express").Router()
const UserController = require('./controller')
router.post('/user', UserController.createTeam)
router.get('/user', UserController.getTeam)
router.get('/user/:name', UserController.getNameTeam)
router.delete('/user', UserController.deleteTeam)

module.exports = router