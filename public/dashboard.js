const usersTable = document.querySelector('#users-table');

function createRow(data) {
	const { user_id, firstname, lastname, email, is_admin, is_disabled, created_at, updated_at } = data;

	const tr = document.createElement('tr');
	tr.innerHTML = `
    <tr>
    <th scope="row">${user_id}</th>
    <td>${firstname}</td>
    <td>${lastname}</td>
    <td>${email}</td>
    <td>${!!is_admin}</td>
    <td>${!!is_disabled}</td>
    <td>${new Date(created_at)}</td>
    <td>${new Date(updated_at)}</td>
</tr>
`;

	usersTable.appendChild(tr);
}

function wipePreviousResults() {
	usersTable.innerHTML = '';
}

function fetchUsers() {
	const adminData = sessionStorage.getItem('token');
	const params = {
		method: 'GET',
		json: true,
		headers: {
			authorization: `Bearer ${adminData}`,
			'Content-Type': 'application/json',
		},
	};
	fetch('/users', params)
		.then((r) => {
			console.log(r);
			return r.json();
		})
		.then((users) => {
			wipePreviousResults();
			users.forEach((user) => {
				createRow(user);
			});
		})
		.catch((err) => {
			console.error(err);
		});
}

fetchUsers();
