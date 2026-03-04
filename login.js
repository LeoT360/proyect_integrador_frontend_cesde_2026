let intentos = 0;
const maxIntentos = 3;
let bloqueado = false;

// Función de inicio de sesión
function iniciarSesion() {

    const usuarioCorrecto = "admin";
    const contrasenaCorrecta = "1234";

    // Verificación de cuenta bloqueada
    if (bloqueado) {
        alert("Lo siento, su cuenta ha sido bloqueada");
        console.log("Intento de acceso con cuenta bloqueada");
        return;
    }

    // While para el ingreso de datos
    while (intentos < maxIntentos && !bloqueado) {
        let usuario = prompt("Ingrese su nombre de usuario:");
        let contrasena = prompt("Ingrese su contraseña:");

        console.log("Usuario ingresado: ", usuario);
        console.log("Contraseña ingresada: ", contrasena);

    }
}