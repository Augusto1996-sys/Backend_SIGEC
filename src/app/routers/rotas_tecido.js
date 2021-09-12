const express = require('express');
const material_controller = require('../Controllers/controller_material');
const tecido_controller = require('../Controllers/controller_tecido');
const router = express.Router();
router.post('/registar_tecido',tecido_controller.registar_tecido);
router.get('/listar_tecido',tecido_controller.listar_tecido);
router.post('/deletar_tecido/:id', material_controller.deleteMaterial);
module.exports = app => app.use('/tecido', router);



