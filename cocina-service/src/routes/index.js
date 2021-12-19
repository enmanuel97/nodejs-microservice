const express = require('express');
const router = express.Router();
const cocinaController = require('../controllers/cocina.controller');

router.post('/recibir-pedido', cocinaController.recibirPedido);
router.get('/preparar/:pedidoId', cocinaController.prepararPedido);
router.get('/ultimos-pedidos/:status', cocinaController.ultimosPedidos);

module.exports = router;