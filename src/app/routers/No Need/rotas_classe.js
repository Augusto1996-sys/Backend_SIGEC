const express = require('express');
const classe_controller = require('../Controllers/controller_classe');
const router = express.Router();
router.post('/registar_classe', classe_controller.registar_classe);
router.post('/listar_classe', classe_controller.listar_classe);

module.exports = app => app.use('/classe', router);


