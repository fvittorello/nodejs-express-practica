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
    <td>${is_admin}</td>
    <td>${is_disabled}</td>
    <td>${created_at}</td>
    <td>${updated_at}</td>
</tr>
`;

	usersTable.appendChild(tr);
}
