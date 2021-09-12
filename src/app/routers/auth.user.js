const express = require('express');
const users_controller = require('../Controllers/controller_users');
const authMiddlewhere = require('../midlewares/auth');
const router = express.Router();
//router.use(authMiddlewhere);
router.post('/create', users_controller.registar_usuario);
router.post('/login_users', users_controller.autenticacao_usuario);
router.post('/forgotPassword_users', users_controller.esqueci_Senha);
router.post('/resetPassword_users', users_controller.recuperar_senha);
router.get('/listar_users', users_controller.listar_usuario);
router.get('/listUsuarioByID/:id', users_controller.listUsuarioByID);
router.post('/deleteUsuarioByID/:id', users_controller.deleteUsuario);
router.post('/editarUsuarioByID/', users_controller.updateUsuario);
router.get('/checkToken', users_controller.checkToken);
router.post('/updateUsuario', users_controller.updateUsuario);
router.get('/destroyToken', users_controller.destroyToken);

module.exports = app => app.use('/user', router);


