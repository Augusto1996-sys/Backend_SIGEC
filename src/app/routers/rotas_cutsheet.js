const express = require('express');
const requisicao_controller = require('../Controllers/controller_requisicao');
const router = express.Router();
router.post('/registar_requisicao', requisicao_controller.registar_requisicao);
router.post('/listar_requisicao', requisicao_controller.listar_requisicao);
router.post('/deletar_requisicao/:id', requisicao_controller.deleterequisicao);
module.exports = app => app.use('/requisicao', router);


