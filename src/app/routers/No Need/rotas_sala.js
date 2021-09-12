const express = require('express');
const sala_controller = require('../Controllers/controller_sala');
const router = express.Router();
router.post('/registar_sala', sala_controller.registar_sala);
router.post('/listar_sala', sala_controller.listar_sala);

module.exports = app => app.use('/sala', router);


