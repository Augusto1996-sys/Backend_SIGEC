const express = require('express');
const authMiddlewhere = require('../midlewares/auth');

const router = express.Router();


router.use(authMiddlewhere);
router.post('/index', (request, response) =>{
  response.send({ok: true, Id_Usuario: request.userId });
});
 
module.exports = app => app.use('/projecto', router);