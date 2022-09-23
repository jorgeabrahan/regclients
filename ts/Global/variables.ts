const FORMATTER = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}); //for numbers

const RECOMENDATIONS = {
    internet: `
    - Asegurate de estar conectad@ al internet<br />
    - Asegurate que el internet no este fallando<br />
    - Prueba en otro momento<br />
    `,
};

const ERRORS = {
    emptyInputs: 'Debes llenar todos los campos para continuar.',
    noClients: "No has agregado ningun cliente aún.",
    login: {
        userNotFound:
            'El usuario no existe o el correo electronico es incorrecto.',
        wrongPassword: 'La contraseña ingresada no es correcta.',
        unknown: 'Ocurrio un error desconocido al intentar iniciar sesion.',
    },
    database: {
        connectionTimedOut: `
            Lo sentimos pero no nos pudimos comunicar con la base de datos.<br />
            Recomendaciones:<br />
            ${RECOMENDATIONS.internet}
        `,
    },
    titles: {
        delete: 'Error al eliminar',
        read: 'Error de lectura',
        save: 'Error al guardar',
        print: "Error al imprimir"
    },
    submit: {
        clientNameLength: 'El cliente debe agregarse con dos o mas nombres.',
        productPrice:
            'El precio del producto debe ser un numero entero positivo',
        emptyFields:
            'Debes llenar todos los campos solicitados antes de continuar.',
        format: {
            articles:
                'La cantidad de articulos debe ser un numero entero positivo mayor a 0.',
            price: 'El precio del articulo debe ser un numero entero positivo.',
            total: 'El total del cliente debe ser un numero entero positivo.',
            name: 'El nombre del cliente solo debe contener letras.',
            category: 'La categoria no debe contener espacios ni numeros, solo letras y guiones.'
        },
    },
};

const INFO = {
    liveEditMode:
        '<strong>Importante: </strong>no se realizara ningun cambio en el live que esta editando hasta que no de clic en el boton <i>guardar</i>.',
    LSHasClients:
        'Se cargaron clientes del almacenamiento local que se habian guardado de una sesión previa.',
    newLive:
        'Mientras no agregue clientes al registro, cada vez que recargue la página la hora de inicio sera actualizada.',
    exitEdit: 'Saliendo del modo edicion sin guardar los cambios realizados.',
};

const UIDLS = localStorage.getItem('UID') || '';

const WIDTH = document.body.clientWidth;

export { FORMATTER, ERRORS, INFO, UIDLS, WIDTH };
