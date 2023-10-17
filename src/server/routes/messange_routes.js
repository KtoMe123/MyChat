const Router = require('express')
const router = new Router()
const mesController = require('../controller/messange_controler')

router.get('/mess/:u_to', mesController.getOneMes)
router.get('/mess', mesController.getMes)
router.put('/mess', mesController.ViewMessage)
router.delete('/mess/:seen', mesController.DeleteMess)

router.post('/mess', mesController.CreateMes)


module.exports = router