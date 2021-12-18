const express = require('express');
const router = express.Router();
const bodegaController = require('../controllers/bodega.controller');

router.get('/ingredientes', bodegaController.getTodoEnBodega);
router.get('/inventario/:ingrendientes', bodegaController.getInventarioBodega);
router.put('/actualizar', bodegaController.updateCantidad);

module.exports = router;