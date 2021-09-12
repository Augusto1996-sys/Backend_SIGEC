const express = require('express');
const professor_controller = require('../Controllers/controller_professor');
const router = express.Router();
router.post('/registar_professor', professor_controller.registar_professor);
router.post('/listar_professor', professor_controller.listar_professor);
module.exports = app => app.use('/professor', router);


