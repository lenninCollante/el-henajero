document.addEventListener('DOMContentLoaded', function () {
    // creamos function para validar los inputs
    function validateField(input) {
        const value   = input.value.trim();
        const isValid = value !== '';
        const email   = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        // actualizamos el input a verde y añadimos icono
        if (isValid) {
            input.style.borderColor = '#00ff00';
            if (input.nextElementSibling) {
                input.nextElementSibling.textContent = '✔️';
            }
        // actualizamos el input a rojo y añadimos icono
        } else {
            input.style.borderColor = '#ff0000';
            if (input.nextElementSibling) {
                input.nextElementSibling.textContent = '❌';
            }
        }

        return isValid;
    }

    // creamos function para validar el formulario completo
    function validateForm(form) {
        let isFormValid = true;
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach((input) => {
            if (input.type !== 'submit') { // Ignorar el botón de envío por que sale error
                const isValid = validateField(input);
                if (!isValid) {
                    isFormValid = false;
                }
            }
        });

        return isFormValid;
    }

    // validamos en tiempo real mientras el usuario escribe
    document.querySelectorAll('form').forEach((form) => {
        const inputs = form.querySelectorAll('input, textarea');

        inputs.forEach((input) => {
            input.addEventListener('input', function () {
                validateField(input);
            });
        });

        // bloqueamos el envío del formulario si los inputs estan vacios
        form.addEventListener('submit', function (event) {
            if (!validateForm(form)) {
                event.preventDefault(); // aquí bloquemos el envio
                const errorMessage = form.querySelector('.error-message');
                if (!errorMessage) {
                    const message = document.createElement('p');
                    message.textContent = 'Por favor, complete todos los campos correctamente.';
                    message.classList.add('error-message');
                    form.appendChild(message);
                };
            };
        });
    });
});
