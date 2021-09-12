const express = require('express');
const material_controller = require('../Controllers/controller_material1');
const router = express.Router();
router.post('/registar_material1', material_controller.registar_material1);
router.get('/listar_material1', material_controller.listar_material1);
router.post('/actualizar_material', material_controller.update_material1);
module.exports = app => app.use('/material1', router);


