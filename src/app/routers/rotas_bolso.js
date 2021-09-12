const express = require('express');
const bolso_controller = require('../Controllers/controller_bolso');
const material_controller = require('../Controllers/controller_material');
const router = express.Router();
router.post('/registar_bolso', bolso_controller.registar_bolso);
router.post('/listar_bolso', bolso_controller.listar_bolso);
router.post('/deletar_bolso/:id', material_controller.deleteMaterial);
module.exports = app => app.use('/bolso', router);


