
const Router = require('express')
const router = new Router()
const userController = require('../controller/user_controller')

router.put('/users', userController.addCon)
router.post('/users', userController.CreateUser)
router.put('/user', userController.updateUser)
router.get('/user', userController.getUsers)
router.get('/users', userController.getMainUsers)
router.get('/users/:mail', userController.getOneMainUser)
router.get('/user/:name', userController.getOneUser)
router.delete('/users', userController.DeleteUser)




module.exports = router