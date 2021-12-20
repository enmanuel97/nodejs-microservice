import axios from 'axios';
import Swal from 'sweetalert2';
require('regenerator-runtime/runtime');

if(document.querySelector('#hacer-pedido') !== null) {
	document.querySelector('#hacer-pedido').addEventListener('click', async e => {
		e.preventDefault();

		try {
			const pedido = await axios.post(`http://localhost:4001/api/cocina/recibir-pedido`, {});
			
			if(pedido.status === 200) {
				Swal.fire({
					title: 'Pedido realizado',
					text: 'Tu pedido ha sido recibido, en breve te contactaremos',
					icon: 'success'
				});
			} else {
				Swal.fire({
					title: 'Error',
					text: 'Hubo un error al realizar el pedido, intentalo de nuevo',
					icon: 'error'
				});
			}
		} catch (error) {
			Swal.fire({
				title: 'Error',
				text: 'Hubo un error al realizar el pedido, intentalo de nuevo',
				icon: 'error'
			});
		}
	});
}

if(document.querySelectorAll('.start-preparation') !== null) {
	var buttonStart = document.querySelectorAll('.start-preparation');
	for(var i = 0; i < buttonStart.length; i++) {
		buttonStart[i].addEventListener('click', async (e) => {
			var button = e.target;
			await prepararReceta(button);
		});
	}
}

if(document.querySelectorAll('.ingredient') !== null) {
	var ingredientes = document.querySelectorAll('.ingredient');
	for(var i = 0; i < ingredientes.length; i++) {
		ingredientes[i].addEventListener('click', async function(e) {
			var ingrediente = e.target;

			var myModal = new bootstrap.Modal(document.getElementById('history-modal'), {
				keyboard: false
			});

			myModal.show();
			
			document.querySelector('#history-modal .modal-title #ingredient-name').textContent = '/ '+ingrediente.getAttribute('data-name');
			document.querySelector("#historial-table").innerHTML = '';
			
			// const url = `${location.origin}/plaza/history/${ingrediente.getAttribute('data-name')}`;
			const url = `http://localhost:4002/api/plaza/historial/${ingrediente.getAttribute('data-id')}`;

			const {data: response} = await axios.get(url);
			
			response.historial.forEach(element => {
				var row = document.createElement('tr');
				row.innerHTML = `
					<td>${element.date}</td>
					<td>${element.quantity}</td>
				`;
				document.querySelector('#history-modal .modal-body table tbody').appendChild(row);
			});
		});
	}
}

async function prepararReceta(button) {
	const url = `http://localhost:4001/api/cocina/preparar/${button.getAttribute('data-id')}`;

	const response = await axios.get(url);

	if(response.data.status === 'success') {
		Swal.fire({
			title: '¡Listo!',
			text: 'La orden se ha preparado correctamente',
			type: 'success'
		});
		button.parentElement.parentElement.remove();
		await updateTablaIngredientes();
	} else if(response.data.status == 'without_stock') {
		var ingredientWithoutStock = response.data.ingredientWithoutStock;
	
		Swal.fire({
			title: 'Sin Stock',
			text: 'No hay stock suficiente para preparar la orden, ¿Deseas realizar una compra?',
			type: 'error',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, comprar',
			cancelButtonText : 'No, Cancelar'
		}).then((result) => {
			if (result.value) {
				const url = `http://localhost:4002/api/plaza/hacer-compra`;

				axios.post(url, {
					ingredients: ingredientWithoutStock
				}).then(function(compraResponse) {
					if(compraResponse.data.status === 'success') {
						Swal.fire({
							title: '¡Listo!',
							text: 'La compra se sometio correctamente, ¿Deseas continuar con la preparacion?',
							type: 'info',
							showCancelButton: true,
							confirmButtonColor: '#3085d6',
							cancelButtonColor: '#d33',
							confirmButtonText: 'Si, preparar',
							cancelButtonText : 'No, Cancelar'
						}).then((result) => {
							if (result.value) {
								prepararReceta(button);
							}
						});
					} else {
						Swal.fire({
							title: 'Error',
							text: compraResponse.data.message,
							type: 'error'
						});
					}
				});
			}
		})
	} else {
		Swal.fire({
			title: '¡Error!',
			text: 'Ha ocurrido un error al preparar la orden',
			type: 'error'
		});
	}
}

async function updateTablaIngredientes() {
	document.querySelector("#lista-ingredientes").innerHTML = '';
	const { data: ingredients } = await axios.get(`http://localhost:4004/api/bodega/ingredientes`);
		ingredients.forEach(ingredient => {

		var li = document.createElement('li');
		li.className = 'list-group-item d-flex justify-content-between align-items-center';
		li.innerHTML = `
			<a href="javascript:void(0);" data-id="${ingredient.id}" data-name="${ingredient.name}" class="ingredient">
				${ingredient.name}
			</a>
			<span class="badge bg-primary rounded-pill">${ingredient.cantidad}</span>
		`;
		document.querySelector('#lista-ingredientes').appendChild(li);
	});
}