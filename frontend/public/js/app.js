import axios from 'axios';
import Swal from 'sweetalert2';

if(document.querySelectorAll('.start-preparation') !== null) {
	var buttonStart = document.querySelectorAll('.start-preparation');
	for(var i = 0; i < buttonStart.length; i++) {
		buttonStart[i].addEventListener('click', (e) => {
			var button = e.target;
			const url = `${location.origin}/cocina/preparar/${button.getAttribute('data-id')}`;

			axios.get(url).then(function(response) {
				if(response.data.status === 'success') {
					Swal.fire({
						title: '¡Listo!',
						text: 'La orden se ha preparado correctamente',
						type: 'success'
					});
					button.parentElement.parentElement.remove();
				} else if(response.data.status == 'without_stock') {
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
							Swal.fire({
								title: 'Ingrese la cantidad que deseas comprar',
								html: '<input id="swal-input1" type="number" min="1" class="swal2-input" placeholder="Arroz">' +
										'<input id="swal-input2" type="number" min="1" class="swal2-input" placeholder="Queso">',
								showCancelButton: true,
								confirmButtonText: 'Comprar',
								showLoaderOnConfirm: true,
								preConfirm: (cantidad) => {
									return new Promise(function (resolve) {
										resolve([
										  $('#swal-input1').val(),
										  $('#swal-input2').val()
										])
									});
								},
								onOpen: function () {
									$('#swal-input1').focus()
								},
								allowOutsideClick: () => !Swal.isLoading()
							}).then((result) => {
								if (result.isConfirmed) {
									const url = `${location.origin}/plaza/comprar/${cantidad}`;
									console.log(url)

									axios.get(url).then(function(response) {
										if(response.data.status === 'success') {
											Swal.fire({
												title: '¡Listo!',
												text: 'La compra se realizo correctamente, ¿Deseas continuar con la preparacion?',
												type: 'info',
												showCancelButton: true,
												confirmButtonColor: '#3085d6',
												cancelButtonColor: '#d33',
												confirmButtonText: 'Si, preparar',
												cancelButtonText : 'No, Cancelar'
											}).then((result) => {
												if (result.value) {
													const url = `${location.origin}/cocina/preparar/${button.getAttribute('data-id')}`;
													axios.get(url).then(function(response) {
														if(response.data.status === 'success') {
															Swal.fire({
																title: '¡Listo!',
																text: 'La orden se ha preparado correctamente',
																type: 'success'
															});
															button.parentElement.parentElement.remove();
														} else {
															Swal.fire({
																title: 'Error',
																text: 'Hubo un error al preparar la orden intente mas tarde',
																type: 'error'
															});
														}
													});
												}
											});
										} else {
											Swal.fire({
												title: 'Error',
												text: 'Hubo un error al comprar, intente mas tarde',
												type: 'error'
											});
										}
									});
								}
							})
						}
					})
				} else {
					Swal.fire({
						title: '¡Error!',
						text: 'Ha ocurrido un error al preparar la orden',
						type: 'error'
					});
				}
			});
		});
	}
}

if(document.querySelectorAll('.ingredient') !== null) {
	var ingredientes = document.querySelectorAll('.ingredient');
	for(var i = 0; i < ingredientes.length; i++) {
		ingredientes[i].addEventListener('click', function(e) {
			var ingrediente = e.target;

			var myModal = new bootstrap.Modal(document.getElementById('history-modal'), {
				keyboard: false
			});

			myModal.show();
			
			document.querySelector('#history-modal .modal-title #ingredient-name').textContent = '/ '+ingrediente.getAttribute('data-name');
			
			const url = `${location.origin}/plaza/history/${ingrediente.getAttribute('data-name')}`;

			console.log(url);
		});
	}
}