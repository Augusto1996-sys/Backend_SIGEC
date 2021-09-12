const express = require('express');
const pessoacontroller = require('../Controllers/controller_operario');
const router = express.Router();

module.exports = app => app.use('/pessoa', router);


