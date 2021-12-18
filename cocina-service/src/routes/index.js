const express = require('express');
const router = express.Router();
const cocinaController = require('../controllers/cocina.controller');

router.post('/recibir-pedido', cocinaController.recibirPedido);
router.get('/preparar', cocinaController.prepararPedido);
router.get('/ultimos-pedidos', cocinaController.ultimosPedidos);

module.exports = router;