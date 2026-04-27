const listaUsuarios = document.getElementById('lista-usuarios');
const btnRegistrar = document.getElementById('btn-registrar');
const btnCancelar = document.getElementById('btn-cancelar');
const formTitle = document.getElementById('form-title');

let usuarios = [];
if (localStorage.getItem('usuarios_solaris')) {
    usuarios = JSON.parse(localStorage.getItem('usuarios_solaris'));
}

let editId = null;

function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('documento').value = '';
    document.getElementById('rol').value = '';
    editId = null; // Salimos del modo edición
}

function guardarDatos() {
    localStorage.setItem('usuarios_solaris', JSON.stringify(usuarios));
    renderizarTabla();
}

btnRegistrar.addEventListener('click', function() {
    
    let nombre = document.getElementById('nombre').value;
    let documento = document.getElementById('documento').value;
    let rol = document.getElementById('rol').value;

    if (nombre === '' || documento === '' || rol === '') {
        alert('Completa todos los campos');
        return;
    }

    if (editId !== null) {
        
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].id === editId) {
                usuarios[i].nombre = nombre;
                usuarios[i].documento = documento;
                usuarios[i].rol = rol;
            }
        }
        finalizarEdicion();
    } else {
        
        let nuevoId = 1;
        if (usuarios.length > 0) {
            
            let ultimoUsuario = usuarios[usuarios.length - 1];
            nuevoId = ultimoUsuario.id + 1;
        }

        
        let nuevoUsuario = {
            id: nuevoId,
            nombre: nombre,
            documento: documento,
            rol: rol
        };
        usuarios.push(nuevoUsuario);
    }

    guardarDatos();
    limpiarFormulario();
});