const express = require('express');

const users_controller = require('./app/Controllers/controller_users');
const routes = express.Router();

routes.post('/registar_users',users_controller.registar_usuario);
routes.post('/login_users',users_controller.autenticacao_usuario);

module.exports=routes;