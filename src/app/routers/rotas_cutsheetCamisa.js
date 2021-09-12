const express = require('express');
const cutsheetCamisa_controller = require('../Controllers/controller_cutsheetCamisa');
const router = express.Router();
router.post('/registar_cutsheetCamisa', cutsheetCamisa_controller.registar_cutsheetCamisa);
router.get('/listar_cutsheetCamisa', cutsheetCamisa_controller.listar_cutsheetCamisa);
router.post('/deletar_cutsheetCamisa/:id', cutsheetCamisa_controller.deleteCutsheetCamisa);
module.exports = app => app.use('/cutsheetCamisa', router);


