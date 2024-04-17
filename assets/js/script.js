const form = document.getElementsByTagName("form")[0];

// form.addEventListener("submit", function (event) {
//     console.log("test");
//     event.preventDefault();
// } );

let input = document.getElementById("imageUrl");
let inputError = document.querySelector("imageUrl + span.error");
console.log(inputError);


input.addEventListener('on', function (event) {

    if (input.validity.valid) {
        // En caso de que haya un mensaje de error visible, si el campo
        // es válido, eliminamos el mensaje de error.
        inputError.innerHTML = ""; // Restablece el contenido del mensaje
        inputError.className = "error"; // Restablece el estado visual del mensaje
      } else {
        // Si todavía hay un error, muestra el error exacto
        showError();
        e.preventDefault();
      }

});

form.addEventListener("submit", function (event) {

    if (!input.validity.valid) {
        // Si no es así, mostramos un mensaje de error apropiado
        showError();
        // Luego evitamos que se envíe el formulario cancelando el evento
        event.preventDefault();
      }

});


function showError() {
    if (input.validity.valueMissing) {
        inputError.textContent =
        "Debe introducir una url de alguna imagen.";
    }
    inputError.className = "error activo";
};


