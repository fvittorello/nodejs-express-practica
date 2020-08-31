const boton = document.querySelector('#boton_ingresar');
const formulario = document.querySelector('#form-registrarse');
const firstnameInput = document.querySelector('#firstname_input');
const lastnameInput = document.querySelector('#lastname_input');
const emailInput = document.querySelector('#email_input');
const passwordInput = document.querySelector('#password_input');
const submitUserForm = document.querySelector('#submit_user');

submitUserForm.addEventListener('click', (e) => {
	e.preventDefault();
	const firstname = firstnameInput.value;
	const lastname = lastnameInput.value;
	const email = emailInput.value;
	const password = passwordInput.value;
	const userData = { firstname, lastname, email, password };

	firstnameInput.value = '';
	lastnameInput.value = '';
	emailInput.value = '';
	passwordInput.value = '';

	nuevoUsuario(userData);
});

function toggleVisibility(tag) {
	if (tag.classList.contains('hidden')) {
		tag.classList.remove('hidden');
	} else {
		tag.classList.add('hidden');
	}
}

function nuevoUsuario(userData) {
	// const formData = new FormData();
	// formData.append('file', userGifBlob, 'myGif.gif');

	const parameters = {
		method: 'POST',
		body: JSON.stringify(userData),
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
