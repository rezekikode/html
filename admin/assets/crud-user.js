document.addEventListener('DOMContentLoaded', () => {
    const crudUserForm = document.getElementById('crud-user-form');
    const crudUserTableBody = document.querySelector('#crud-user-table tbody');
    const addButton = document.getElementById('add-button');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');

    let crudUsers = JSON.parse(localStorage.getItem('crudUsers')) || [];
    let editIndex = null;

    function toggleButtons(state) {
        if (state === 'add') {
            addButton.disabled = true;
            saveButton.disabled = false;
            cancelButton.disabled = false;
            document.getElementById('crud-name').disabled = false;
            document.getElementById('crud-email').disabled = false;
        } else if (state === 'save') {
            addButton.disabled = false;
            saveButton.disabled = true;
            cancelButton.disabled = true;
            document.getElementById('crud-name').disabled = true;
            document.getElementById('crud-email').disabled = true;
        } else if (state === 'reset') {
            addButton.disabled = false;
            saveButton.disabled = true;
            cancelButton.disabled = true;
            document.getElementById('crud-name').value = '';
            document.getElementById('crud-email').value = '';
            document.getElementById('crud-edit-index').value = '';
            document.getElementById('crud-name').disabled = true;
            document.getElementById('crud-email').disabled = true;
        }
    }    

    function validateUser(name, email) {
        const errors = [];

        if (!name.trim()) {
            errors.push("Please enter a valid name.");
        }
        if (!validateEmail(email)) {
            errors.push("Please enter a valid email address.");
        }

        if (errors.length > 0) {
            const modalTitle = document.getElementById('modal-title');
            const list = document.getElementById('modal-list');
            modalTitle.innerHTML = 'Error(s) Found';
            list.innerHTML = errors.map(error => `<li>${error}</li>`).join('');
            const modal = document.getElementById('modal');
            modal.style.display = 'block';
            return false;
        }

        return true;
    }    

    function addUser() {
        crudUserForm.reset();
        editIndex = null;
        toggleButtons('add');
    }

    function editUser(index) {
        const user = crudUsers[index];
        document.getElementById('crud-name').value = user.name;
        document.getElementById('crud-email').value = user.email;
        document.getElementById('crud-edit-index').value = index;
        editIndex = index;
        toggleButtons('add');
    }

    function deleteUser(index) {
        crudUsers.splice(index, 1);
        localStorage.setItem('crudUsers', JSON.stringify(crudUsers));
        renderCrudUsers();
        toggleButtons('reset');
    }

    function saveUser() {
        const name = document.getElementById('crud-name').value.trim();
        const email = document.getElementById('crud-email').value.trim();

        if (!validateUser(name, email)) {
            return;
        }

        if (editIndex !== null) {
            crudUsers[editIndex] = { name, email };
        } else {
            crudUsers.push({ name, email });
        }

        localStorage.setItem('crudUsers', JSON.stringify(crudUsers));
        crudUserForm.reset();
        editIndex = null;
        renderCrudUsers();
        toggleButtons('save');
    }

    function renderCrudUsers() {
        crudUserTableBody.innerHTML = '';
        crudUsers.forEach((user, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="crud-edit" onclick="editUser(${index})">Edit</button>
                    <button class="crud-delete" onclick="deleteUser(${index})">Delete</button>
                </td>
            `;
            tr.addEventListener('dblclick', () => editUser(index));
            crudUserTableBody.appendChild(tr);
        });
    }

    window.editUser = editUser;
    window.deleteUser = deleteUser;

    addButton.addEventListener('click', addUser);
    saveButton.addEventListener('click', saveUser);  
    cancelButton.addEventListener('click', () => toggleButtons('reset'));  

    renderCrudUsers();
    toggleButtons('reset');
});
