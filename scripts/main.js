// Menu
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('nav-open');
    });
}

// Get Users
async function startApp() {
    try {
        const response = await fetch('json/users.json');

        const initialUsers = await response.json();

        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(initialUsers));
        }

    } catch (error) {
        console.error('Error en startApp:', error);
    }
}

startApp();

// Stats
const studentsAmount = document.getElementById('students-amount');
const teachersAmount = document.getElementById('teachers-amount');
const usersAmount = document.getElementById('users-amount')

if (studentsAmount || teachersAmount) {
    const user = JSON.parse(localStorage.getItem('users') || '[]');

    let students = 0
    let teachers = 0
    let users = 0

    user.forEach(u => {
        if (u.role === 'student') students++;
        if (u.role === 'teacher') teachers++;
        users = teachers + students
    });

    if (studentsAmount) studentsAmount.textContent = students;
    if (teachersAmount) teachersAmount.textContent = teachers;
    if (usersAmount) usersAmount.textContent = users;
}

// Logout
const btnLogout = document.getElementById('btnLogout');

if (btnLogout) {
    btnLogout.addEventListener('click', () => {
        alert('Has cerrado sesión. Redirigiendo a la página de inicio...');
        sessionStorage.removeItem('activeUser');
    });
}