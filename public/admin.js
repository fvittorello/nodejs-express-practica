const submitBtn = document.querySelector('#admin-form-submit');
const userEmail = document.querySelector('#inputEmail');
const userPassword = document.querySelector('#inputPassword');

submitBtn.addEventListener('click', (e) => {
	const email = userEmail.value;
	const password = userPassword.value;
	const userData = { email, password };
	const params = {
		method: 'POST',
		body: JSON.stringify(userData),
		json: true,
		headers: {
			'Content-Type': 'application/json',
		},
	};

	console.log(params);
	fetch('/login', params)
		.then((r) => {
			return r.json();
		})
		.then((data) => {
			console.log(data.token);
			saveToLocal(data.token);
			redirectTo('dashboard.html');
		})
		.catch((err) => {
			console.error(err);
		});

	e.preventDefault();
});

function saveToLocal(token) {
	sessionStorage.setItem('token', token);
}

function redirectTo(url) {
	window.location = `http://localhost:3000/${url}`;
}
