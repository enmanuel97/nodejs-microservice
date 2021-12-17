import axios from 'axios';
import Swal from 'sweetalert2';

if(document.querySelector('.aceptar-orden') !== null) {
	document.querySelector('.aceptar-orden').addEventListener('click', function(e) {
		
	});
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