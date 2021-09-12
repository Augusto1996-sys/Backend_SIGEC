const express = require('express');
const material_controller = require('../Controllers/controller_material');
const router = express.Router();
router.post('/registar_material', material_controller.registar_material);
router.post('/listar_material', material_controller.listar_material);
router.post('/deletar_material/:id', material_controller.deleteMaterial);
module.exports = app => app.use('/material', router);

