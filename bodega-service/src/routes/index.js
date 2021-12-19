const express = require('express');
const router = express.Router();
const bodegaController = require('../controllers/bodega.controller');

router.get('/ingredientes', bodegaController.getTodoEnBodega);
router.get('/inventario/:ingredientes', bodegaController.getInventarioBodega);
router.post('/actualizar-inventario/:type', bodegaController.actualizarInventario);
module.exports = router;