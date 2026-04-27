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

        // Verificación de datos correctos
        if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
            alert("Acceso concedido. Bienvenido " + usuario);
            console.log("Inicio de sesión exitoso");
            intentos = 0;
            return;
        } 
        else {
            intentos++;
            if (intentos >= maxIntentos) {
                bloqueado = true;
                alert("Cuenta bloqueada. Demasiados intentos fallidos");
                console.log("Usuario bloqueado por exceso de intentos");

                const boton = document.querySelector('.btn-login');
            } 
            else {
                alert("Datos incorrectos. Intento " + intentos + "/" + maxIntentos);
                console.log("Intento fallido número: ", intentos);
            }
        }
    }
}