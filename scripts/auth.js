const formRegister = document.getElementById('formRegister');

if (formRegister) {

    formRegister.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const doc  = document.getElementById('doc').value;
        const pass = document.getElementById('pass').value;

        const users = JSON.parse(localStorage.getItem('users'));

        let existe = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].document === doc) {
                existe = true;
            }
        }

        if (existe) {
            alert('Ya existe una cuenta con ese documento.');
            return;
        }

        let newId = 1;
        if (users.length > 0) {
            newId = users[users.length - 1].id + 1;
        }

        let newUser = {
            id:       newId,
            name:     name,
            document: doc,
            password: pass,
            role:     'student'
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('¡Cuenta creada! Ya puedes iniciar sesión.');
        formRegister.reset();
        window.location.href = 'login.html';

    });
}

const formLogin = document.getElementById('formLogin');

if (formLogin) {
    let attempts = parseInt(sessionStorage.getItem('loginAttempts') || '0');

    formLogin.addEventListener('submit', function(e) {
        e.preventDefault();

        if (attempts >= 3) {
            window.location.href = 'error.html';
            return;
        }

        const doc  = document.getElementById('doc').value;
        const pass = document.getElementById('pass').value;

        const users = JSON.parse(localStorage.getItem('users'));

        let found = null;
        for (let i = 0; i < users.length; i++) {
            if (users[i].document === doc && users[i].password === pass) {
                found = users[i];
            }
        }

        if (found === null) {
            attempts++;
            sessionStorage.setItem('loginAttempts', attempts);

            const remaining = 3 - attempts;

            if (remaining <= 0) {
                window.location.href = 'index.html';
            } else {
                alert('Documento o contraseña incorrectos. Te quedan ' + remaining + ' intento(s).');
            }

            return;
        }

        sessionStorage.setItem('activeUser', JSON.stringify(found));
        sessionStorage.removeItem('loginAttempts');
        formLogin.reset();

        if (found.role === 'admin') {
            alert('¡Bienvenid@, ' + found.name + '! Redirigiendo a tu panel de administrador...');
            window.location.href = 'dashboard_admin.html';
        } else if (found.role === 'teacher') {
            alert('¡Bienvenid@, ' + found.name + '! Redirigiendo a tu panel de maestro...');
            window.location.href = 'dashboard_teacher.html';
        } else {
            alert('¡Bienvenid@, ' + found.name + '! Redirigiendo a tu panel de estudiante...');
            window.location.href = 'dashboard_student.html';
        }

    });
}
