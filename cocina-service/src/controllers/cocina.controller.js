const db = require('../database/db');
const axios = require('axios');

exports.recibirPedido = async (req, res) => {
	try {
		const receta = await axios.get(`http://localhost:8080/api/receta`);
		const pedido = await db.Pedidos.create(
			{
				recetaId: receta.data.id,
			}
		);

		res.status(200).json({
			message: 'Pedido recibido',
			pedido
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

exports.prepararPedido = async (req, res) => {
	try {
		const pedidoId = req.params.pedidoId;

		const pedido = await db.Pedidos.findOne({
			where: {
				id: pedidoId
			}
		});

		const receta = await axios.get(`http://localhost:8080/api/receta/${pedido.recetaId}`);

		const recipeIngredients = receta.data.ingredients;
		let newArray = [];
		let ingredientsString = '';
		let ingredients = recipeIngredients.split(',');
		
		for (let i = 0; i < ingredients.length; i++) {
			let ingrediente = ingredients[i].split(':')
			ingredientsString += `${ingrediente[0]},`;
			newArray.push({name: ingrediente[0], quantity: ingrediente[1]});
		}
		
		let itemWithoutStock = 0;
		let ingredientWithoutStock = [];
		const {data: stock} = await axios.get(`http://localhost:8080/api/bodega/inventario/${ingredientsString.slice(0, -1)}`);
		console.log(newArray, stock);
		for (let i = 0; i < stock.length; i++) {
			let ingrediente = newArray.filter(item => item.name === stock[i].name)[0];
			
			if (ingrediente.quantity > stock[i].cantidad) {
				ingredientWithoutStock.push(`${ingrediente.name}`);
				itemWithoutStock++;
			}
		}

		if(itemWithoutStock > 0) {
			res.status(200).json({
				status: 'without_stock',
				ingredientWithoutStock
			});
		} else {
			await axios.post(`http://localhost:8080/api/bodega/actualizar-inventario/retirar`, {
				ingredients: newArray
			});

			await db.Pedidos.update({
				status: 3
			}, {
				where: {
					id: pedidoId
				}
			});

		 	res.status(200).json({
		 		status: 'success'
		 	});
		}
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}

exports.ultimosPedidos = async (req, res) => {

	try {
		const status = req.params.status;

		const pedidos = await db.query(`SELECT a.*, b.name AS recetaName, b.ingredients AS recetaIngredients FROM pedidos as a
			LEFT JOIN recetas as b ON b.id = a.recetaId WHERE a.status IN (${status}) ORDER BY a.id ASC`, { type: db.QueryTypes.SELECT });

		res.status(200).json({
			message: 'Pedidos recibidos',
			pedidos
		});
	} catch (error) {
		res.status(500).json({
			message: error.message
		});
	}
}