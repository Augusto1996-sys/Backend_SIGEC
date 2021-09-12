const express = require('express');
const intertela_controller = require('../Controllers/controller_intertela');
const material_controller = require('../Controllers/controller_material');
const router = express.Router();
router.post('/registar_intertela', intertela_controller.registar_intertela);
router.post('/listar_intertela', intertela_controller.listar_intertela);
router.post('/deletar_intertela/:id', material_controller.deleteMaterial);
module.exports = app => app.use('/intertela', router);


