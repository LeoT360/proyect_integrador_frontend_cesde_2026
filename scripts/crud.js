const usersList  = document.getElementById('usersList');
const formInline = document.getElementById('formInline');
const btnSubmit  = document.getElementById('btnSubmit');
const btnCancel  = document.getElementById('btnCancel');
const inputName  = document.getElementById('name');
const inputDoc   = document.getElementById('doc');
const inputPass  = document.getElementById('pass');
const inputRole  = document.getElementById('role');

let editMode = null;

function getUsers() {
    return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

function renderUsers() {
    const users = getUsers();

    usersList.innerHTML = '';

    for (let i = 0; i < users.length; i++) {
        let u = users[i];

        let label = 'Estudiante';
        if (u.role === 'admin')   label = 'Administrador';
        if (u.role === 'teacher') label = 'Docente';

        usersList.innerHTML += `
            <tr>
                <td><strong>${u.name}</strong></td>
                <td>${u.document}</td>
                <td><span class="role-badge role-${u.role}">${label}</span></td>
                <td class="actions">
                    <button class="btn-icon btn-edit" data-id="${u.id}"><img src="images/edit-icon.svg" alt="Editar"></button>
                    <button class="btn-icon btn-delete" data-id="${u.id}"><img src="images/delete-icon.svg" alt="Eliminar"></button>
                </td>
            </tr>`;
    }
}

function resetForm() {
    formInline.reset();
    inputPass.required = true;
    btnSubmit.textContent = 'Agregar';
    btnCancel.style.display = 'none';
    editMode = null;
}

usersList.addEventListener('click', function(e) {
    const btnEdit   = e.target.closest('.btn-edit');
    const btnDelete = e.target.closest('.btn-delete');

    if (btnEdit) {
        const id = Number(btnEdit.dataset.id);
        const users = getUsers();
        let u;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === id) { u = users[i]; break; }
        }
        inputName.value = u.name;
        inputDoc.value = u.document;
        inputPass.value = u.password;
        inputRole.value = u.role;
        btnSubmit.textContent    = 'Actualizar';
        btnCancel.style.display  = '';
        editMode = id;
    }

    if (btnDelete) {
        const id = Number(btnDelete.dataset.id);
        if (!confirm('¿Eliminar a este usuario?')) return;
        const users = getUsers();
        let newList = [];
        for (let i = 0; i < users.length; i++) {
            if (users[i].id !== id) newList.push(users[i]);
        }
        saveUsers(newList);
        if (editMode === id) resetForm();
        renderUsers();
    }
});

formInline.addEventListener('submit', function(e) {
    e.preventDefault();

    const users = getUsers();

    if (editMode !== null) {
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === editMode) {
                users[i].name = inputName.value;
                users[i].document = inputDoc.value;
                users[i].role = inputRole.value;

                if (inputPass.value !== '') {
                    users[i].password = inputPass.value;
                }
            }
        }
    } 
    else {
        let newId = 1;
        if (users.length > 0) {
            newId = users[users.length - 1].id + 1;
        }

        let newUser = {
            id:       newId,
            name:     inputName.value,
            document: inputDoc.value,
            password: inputPass.value,
            role:     inputRole.value
        };

        users.push(newUser);
    }

    saveUsers(users);
    resetForm();
    renderUsers();
});

btnCancel.addEventListener('click', resetForm);

renderUsers();
