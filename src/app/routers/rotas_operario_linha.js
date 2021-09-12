const express = require('express');
const alocar_operario_controller = require('../Controllers/controller_alocar_operario');
const router = express.Router();
router.post('/registar_alocar_operario', alocar_operario_controller.registar_alocar_operario);
router.get('/listar_alocar_operario', alocar_operario_controller.listar_alocar_operario);
router.post('/deletealocar_operarioByID/:id', alocar_operario_controller.delete_alocar_operario);
router.post('/editaralocar_operarioByID', alocar_operario_controller.update_alocar_operario);
module.exports = app => app.use('/alocar_operario', router);


