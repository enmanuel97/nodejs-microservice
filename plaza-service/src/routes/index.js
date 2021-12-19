const express = require('express');
const router = express.Router();
const plazaController = require('../controllers/plaza.controller');

router.post('/hacer-compra', plazaController.hacerCompra);
router.get('/historial/:id', plazaController.historial);
module.exports = router;