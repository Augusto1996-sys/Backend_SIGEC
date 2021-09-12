const express = require('express');
const operario_controller = require('../Controllers/controller_operario');
const router = express.Router();
router.post('/registar_operario', operario_controller.registar_operario);
router.get('/listar_operario', operario_controller.listar_operario);
router.post('/deleteoperarioByID/:id', operario_controller.deleteoperario);
router.post('/editaroperarioByID', operario_controller.updateoperario);
module.exports = app => app.use('/operario', router);


