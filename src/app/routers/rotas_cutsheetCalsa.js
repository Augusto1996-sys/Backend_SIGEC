const express = require('express');
const cutsheet_controller = require('../Controllers/controller_cutsheetCalsa');
const router = express.Router();
router.post('/registar_cutsheetCalsa', cutsheet_controller.registar_cutsheetCalsa);
router.get('/listar_cutsheetCalsa', cutsheet_controller.listar_cutsheetCalsa);
router.post('/deletar_cutsheetCalsa/:id', cutsheet_controller.deleteCutsheetCalsa);
module.exports = app => app.use('/cutsheetCalsa', router);