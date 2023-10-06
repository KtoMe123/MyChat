const Router = require('express')
const router = new Router()
const mesController = require('../controller/messange_controler')


router.get('/messange', mesController.getMes)
router.post('/messange', mesController.CreateMes)


module.exports = router