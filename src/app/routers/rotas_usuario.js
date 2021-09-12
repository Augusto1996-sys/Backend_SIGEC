const express = require('express');
const usuario_controller = require('../Controllers/controller_usuario');
const authMiddlewhere = require('../midlewares/auth');
const router = express.Router();
//router.use(authMiddlewhere);
router.post('/create', usuario_controller.registar_usuario);
router.post('/login_users', usuario_controller.autenticacao_usuario);
router.post('/forgotPassword_users', usuario_controller.esqueci_Senha);
router.post('/resetPassword_users', usuario_controller.recuperar_senha);
router.get('/listar_usuario', usuario_controller.listar_usuario);
router.get('/listusuarioByID/:id', usuario_controller.listusuarioByID);
router.post('/deleteusuarioByID/:id', usuario_controller.deleteusuario);
router.post('/editarusuarioByID/', usuario_controller.updateusuario);
router.get('/checkToken', usuario_controller.checkToken);
router.post('/updateusuario', usuario_controller.updateusuario);
router.get('/destroyToken', usuario_controller.destroyToken);

module.exports = app => app.use('/usuario', router);


