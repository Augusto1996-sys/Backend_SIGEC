const express = require('express');
const stock_controller = require('../Controllers/controller_stock');
const router = express.Router();
router.post('/registar_stock', stock_controller.registar_stock);
router.get('/listar_stock', stock_controller.listar_stock);
router.post('/actualizar_stock', stock_controller.upDateStock);
router.post('/actualizar_stockbyCs', stock_controller.liststocksByCs);
router.post('/listStockByCutsheet', stock_controller.listStockByCutsheet);


router.post('/listStockBycodCutsheet', stock_controller.listStockBycodCutsheet);
router.post('/listrefrenciaByCutsheetandStock', stock_controller.listrefrenciaByCutsheetandStock); 
router.get('/listTamanhoByCutsheetandStockandRefern', stock_controller.listTamanhoByCutsheetandStockandRefern);

router.get('/listCorByCutsheetandStockandRefern', stock_controller.listCorByCutsheetandStockandRefern);
router.post('/listQuantidadeByCutsheetandStockandRefern', stock_controller.listQuantidadeByCutsheetandStockandRefern);

router.post('/listQuantidadeByCutsheetandStockandcod', stock_controller.listQuantidadeByCutsheetandStockandcod);

module.exports = app => app.use('/stock', router);


