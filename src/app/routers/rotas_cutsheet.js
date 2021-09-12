const express = require('express');
const cutsheet_controller = require('../Controllers/controller_cutsheet');
const router = express.Router();
router.post('/registar_cutsheet', cutsheet_controller.registar_cutsheet);
router.get('/listar_cutsheet', cutsheet_controller.listar_cutsheet);
router.post('/listar_cutsheetByRecoha', cutsheet_controller.listar_cutsheetByRecolha);
router.post('/listar_cutsheetByID', cutsheet_controller.listar_cutsheetByID)
module.exports = app => app.use('/cutsheet', router);


