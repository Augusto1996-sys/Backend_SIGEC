const express = require('express');
const pessoacontroller = require('../Controllers/controller_funcionario');
const router = express.Router();
router.post('/registar_pessoa', pessoacontroller.registar_funcionario);

module.exports = app => app.use('/pessoa', router);


