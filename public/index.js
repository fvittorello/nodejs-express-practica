const boton = document.querySelector('#boton_ingresar');
const formulario = document.querySelector('#form-registrarse');
const enviar = document.querySelector('#submit-user');
const emailInput = document.querySelector('#email_input');
const passwordInput = document.querySelector('#contrasenia');

enviar.addEventListener('click', (e) => {
	e.preventDefault();
	const email = emailInput.value;
	const contrasenia = passwordInput.value;
	const data = { email, contrasenia };

	nuevoUsuario(data);
});

function toggleVisibility(tag) {
	if (tag.classList.contains('hidden')) {
		tag.classList.remove('hidden');
	} else {
		tag.classList.add('hidden');
	}
}

function nuevoUsuario(data) {
	// const formData = new FormData();
	// formData.append('file', userGifBlob, 'myGif.gif');

	const parameters = {
		method: 'POST',
		body: JSON.stringify(data),
		json: true,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	fetch(`http://localhost:3000/registrarse`, parameters)
		.then((json) => {
			return json;
		})
		.catch((err) => {
			console.error(err);
		});
}

boton.addEventListener('click', () => {
	toggleVisibility(formulario);
});
