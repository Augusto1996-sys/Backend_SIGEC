const express = require('express');
const rolo_controller = require('../Controllers/controller_rolos');
const router = express.Router();
router.post('/registar_rolo', rolo_controller.registar_rolo);
router.post('/listar_rolo', rolo_controller.listar_rolo);
router.post('/actualizar_rolo', rolo_controller.update_rolo);
module.exports = app => app.use('/rolo', router);


