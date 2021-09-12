const express = require('express');
const cutsheet_controller = require('../Controllers/controller_cutsheet');
const router = express.Router();
router.post('/registar_cutsheet', cutsheet_controller.registar_cutsheet);
router.post('/listar_cutsheet', cutsheet_controller.listar_cutsheet);
router.post('/deletar_cutsheet/:id', cutsheet_controller.deleteCutsheet);
module.exports = app => app.use('/cutsheet', router);


