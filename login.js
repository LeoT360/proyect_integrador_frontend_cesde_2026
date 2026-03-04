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
}