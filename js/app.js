//variables
const enviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const formulario = document.querySelector('#enviar-mail');
const resetear = document.querySelector('#resetBtn');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


EventListener();

function EventListener() {


    document.addEventListener('DOMContentLoaded', IniciarApp); /*** las funciones que se ejecutan antes de empezar a cargar */
    email.addEventListener('blur', validarFormulario); /***cuando me salgo del input */
    asunto.addEventListener('blur', validarFormulario); /***cuando me salgo del input */
    mensaje.addEventListener('blur', validarFormulario); /***cuando me salgo del input */
    enviar.addEventListener('click', enviarEmail);
    resetear.addEventListener('click', resetearcampos);
}


//funciones
function resetearcampos() {

    formulario.reset();
    IniciarApp();
}



function enviarEmail(e) {
    e.preventDefault();
    //mostrar circulito spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = "flex";
    //despues de 3 segundos ocultar spinner
    setTimeout(() => {
        spinner.style.display = "none";
        const elemento = document.createElement('p');
        elemento.textContent = 'datos enviados correctamente';
        elemento.classList.add('border', 'border-green-500', 'background-color-100', 'text-green-500', 'p-3', 'mt-5', 'text-center', 'enviado'); /**estilos propios del proyecto */
        formulario.appendChild(elemento);
        setTimeout(() => {
            elemento.remove();
            resetearcampos();
        }, 3000);

    }, 3000);

}

function IniciarApp() {
    enviar.disable = true;
    enviar.classList.add('cursor-not-allowed', 'opacity-50');

}
//validacion del formulario
function validarFormulario(e) {


    if (e.target.value.length > 0) {
        //elimina los errores
        const error = document.querySelector('p.error'); /***selecciono un p con una clase error y despues la elimino */
        if (error) {
            error.remove();
        }
        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    } else {
        e.target.classList.remove('border', 'border-green-500');
        //e.target.style.borderBottomColor = "red"; /***cambia el color de los bordes si esta vacio */
        e.target.classList.add('border', 'border-red-500'); /*** clases del framework taiwing */
        mostrarError('Todos los campos son obligatorios');
    }

    if (e.target.type === 'email') {
        /***er.test es de una expresion regular */
        if (er.test(e.target.value)) {
            //elimina los errores
            const error = document.querySelector('p.error'); /***selecciono un p con una clase error y despues la elimino */
            if (error) {
                error.remove();
            }
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');

        } else {
            e.target.classList.remove('border', 'border-green-500');
            //e.target.style.borderBottomColor = "red"; /***cambia el color de los bordes si esta vacio */
            e.target.classList.add('border', 'border-red-500'); /*** clases del framework taiwing */
            mostrarError('no es un mail valido');
        }
    }

    /***er.test es de una expresion regular */
    if (er.test(email.value) && asunto.value !== '' && mensaje.value !== '') {
        enviar.disable = false;
        enviar.classList.remove('cursor-not-allowed', 'opacity-50');


    }
}

function mostrarError(mensaje) {
    const mensajeError = document.createElement('p'); /***crear el parrafo si no es correcto */
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error'); /**estilos propios del proyecto */
    const errores = document.querySelectorAll('.error'); ///***si existe  no se agrega el nuevo item */
    if (errores.length === 0) {
        formulario.appendChild(mensajeError); /**agregar el nuevo elemento creado dinamicamente */
    }
    /**cuando creas un elemento se agrega al final  probar eliminar item en ves de crearlo una sola vez*/
    /***si queres agregarlo al principio es formulario.insertBefore */
}