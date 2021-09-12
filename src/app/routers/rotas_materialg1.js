const express = require('express');
const materialg1_controller = require('../Controllers/controller_materialg1');
const router = express.Router();
router.post('/registar_materialg1', materialg1_controller.registar_rolo);
router.get('/listar_materialg1', materialg1_controller.listar_rolo);
module.exports = app => app.use('/materialg1', router);


