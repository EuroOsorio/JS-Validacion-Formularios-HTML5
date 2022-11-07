// const inputNacimiento = document.querySelector("#birth");  //Extraigo los datos del identificador id=birth.

export function valida (input) {                // Exportar funcion para usarla en otros archivos.
    const tipoDeInput = input.dataset.tipo;     // Hace referencia o apunta a data-tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    console.log(input.parentElement);
    if (input.validity.valid) {         // Condicion para validar si el input es valido. Validity es una propiedad de input.
        input.parentElement.classList.remove ("input-container--invalid");  // Caso sea 'true' remueve la clase 
        input.parentElement.querySelector (".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add ("input-container--invalid"); // Caso sea 'false' adiciona la clase
        input.parentElement.querySelector (".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);  // Muestra mensaje de error.
    }
}; 

const tipoDeErrores = [     // Arreglo con los tipos de errores para indicar mensaje.
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

const mensajesDeError = {       // Mensajes de error.
    nombre: {
        valueMissing: "Este campo 'Nombre' no puede estar vacio"       
    },
    correo: {
        valueMissing: "Este campo 'Correo' no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo 'Password' no puede estar vacio",
        patternMismatch: "Al menos una letra mayuscula, una letra minuscula y un numero. Ademas de minimo 4 y maximo 8 caracteres"
    },
    nacimiento: {
        valueMissing: "Este campo 'Fecha de nacimiento' no puede estar vacio",
        customError: "¡Debes ser mayor de edad!"
    },
    numero: {
        valueMissing: "Este campo 'número telefónico' no puede estar vacio",
        patternMismatch: "El formato requerido es xxxxxxxxxx, 10 digitos"
    },
    direccion: {
        valueMissing: "Este campo 'dirección' no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo 'Cuidad' no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo 'Estado' no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    }
}

const validadores = {
    nacimiento: (input) => validarNacimiento (input),
}

function mostrarMensajeDeError (tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach ( error => {      // Recorro el arreglo 'tipoDeErrores' para buscar que error se presenta.
        if (input.validity[error]) {        // Condicion para identificar que error ocurre.
            console.log(error);
            console.log (input.validity[error]);
            console.log(tipoDeInput);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    })
    return mensaje;
}

// inputNacimiento.addEventListener("blur", (evento) => {      // Capturo el evernto "blur". Blur: salir del input;
//     validarNacimiento (evento.target);      
// });

function validarNacimiento (input) {
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if (!mayorEdad (fechaCliente)) {
        mensaje = "¡Debes ser mayor de edad!";
        console.log("mostrar mensaje");
    }
    input.setCustomValidity (mensaje);      // Me muestra un mensaje emergente al momento de validar la edad ingresada, muestra el mensaje al enviar el formulario.
}

function mayorEdad (fecha) {
    const fechaActual = new Date();             // Nueva instancia de la clase Date().
    const diferenciaFechas = new Date (fecha.getUTCFullYear() +18, fecha.getUTCMonth(), fecha.getUTCDate()); // Le sumo 18 a el dato año para despues compararlo con la fecha actual.
    return (fechaActual >= diferenciaFechas);
}
