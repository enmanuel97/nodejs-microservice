const express = require('express');
const router = express.Router();
const recetaController = require('../controllers/receta.controller');

router.get('/', recetaController.getReceta);
router.get('/:id', recetaController.getReceta);

module.exports = router;