"use strict";

import * as firebase from "./modules/firebase.mjs";
import * as globalVars from "./modules/globalVars.mjs";
import * as clientVars from "./modules/clientVars.mjs";
import * as globalFuncs from "./modules/globalFuncs.mjs";
import * as clientFuncs from "./modules/clientFuncs.mjs";

/* Formulario e inputs para agregar clientes */
const frmClientData = document.getElementById("frmClientData");
/* ----------------------------------------- */

/* Obtener los lives anteriores en caso de que existan */
let fbLives = { lives: [] };
const getPrevLives = () => {
    //Se obtienen los lives previos en caso de que existan
    firebase.STORAGE.collection("vendedoras")
        .doc(clientVars.userIdLS)
        .get()
        .then((seller) => {
            if (seller.exists) fbLives = seller.data();
        })
        .catch((err) => {
            clientFuncs.showModal(
                "Error al leer base de datos",
                `Si sigues utilizando la pagina la informacion no se guardara en la base de datos.\n\nReporta este error: ${err}`
            );
        });
};
/* --------------------------------------------------- */

const liveToEdit = JSON.parse(localStorage.getItem("LiveToEdit"));
const btnExit = document.getElementById("btnExit");
/* Al salir de la edicion del live */
btnExit.addEventListener("click", () => {
    clientFuncs.showModal("Saliendo..", "Volviendo a la pantalla de inicio sin guardar.");
    open("index.html", "_self");
    localStorage.setItem("Edit", "off");
});
/* ------------------------------ */

/* Evaluar si existen elementos en el almacenamiento local y realizar acciones en base a ello */
const checkForPrevClients = () => {
    const dateLive = document.getElementById("dateLive");
    getPrevLives();

    //Si el usuario entro en modo edicion
    if (localStorage.getItem("Edit") == "on") {
        clientFuncs.showModal(
            "Modo edicion",
            "Usted se encuentra en el modo de edicion, todos los cambios que realice se guardaran en el live que esta editando.\n\nImportante: ninguno de los cambios realizados en este live se guardaran hasta que no de click en el boton de guardar"
        );
        btnExit.classList.remove("d-none");
        dateLive.innerText = liveToEdit.date;
        clientVars.setClientsArr(liveToEdit.clients);
        clientFuncs.loadClientsFromArr();
        clientFuncs.updateAndSave();
        return;
    }

    //Si habian elementos en el almacenamiento local
    if (clientVars.clientsArr.length > 0) {
        clientFuncs.showModal(
            "Almacenamiento local",
            "Habian clientes en el almacenamiento local de una sesion previa."
        );
        dateLive.innerText = localStorage.getItem("Date");
        clientFuncs.loadClientsFromArr();
        clientFuncs.updateAndSave();
        return;
    }

    //Si no habian elementos en el almacenamiento local
    const time = `${globalFuncs.formatTime(globalVars.DATE.getHours())}:${globalFuncs.formatTime(
        globalVars.DATE.getMinutes()
    )}`;
    localStorage.setItem("TimeStart", time);
    /* Se muestra y almacena la fecha del live */
    const currentDate = globalFuncs.getCompleteDate();
    localStorage.setItem("Date", currentDate);
    dateLive.innerText = currentDate;
    /* --------------------------------------- */
    const warn =
        "Mientras no se agreguen clientes a la lista, cada vez que se recargue la pagina la hora de inicio y la fecha seran actualizadas.";
    clientFuncs.showModal(`Informacion del live`, `Hora de inicio: ${time}\nFecha: ${currentDate}\n\n${warn}`);
};

checkForPrevClients();

/* Cancelar la edicion del cliente */
document.getElementById("btnEditCancel").addEventListener("click", () => clientVars.modalEdit.classList.add("d-none"));

/* Eventos para los inputs del formulario para editar un cliente */
clientVars.frmEdit.nameE.addEventListener("input", ({ target }) => globalFuncs.allowJustLetters(target));
clientVars.frmEdit.articlesE.addEventListener("input", ({ target }) => globalFuncs.allowJustNumbers(target));
clientVars.frmEdit.totalE.addEventListener("input", ({ target }) => globalFuncs.allowJustNumbers(target));
/* ------------------------------------------------------------- */

const formatNameCorrectly = (string) => {
    const words = string.split(" ");
    for (let word in words) {
        words[word] = words[word].charAt(0).toUpperCase() + words[word].slice(1).toLowerCase();
    }
    return words.join(" ");
};

/* Al editar un cliente */
clientVars.frmEdit.addEventListener("submit", (e) => {
    e.preventDefault();
    let editNameVal = clientVars.frmEdit.nameE.value.trim();
    const editArticlesVal = Number(clientVars.frmEdit.articlesE.value.trim());
    const editTotalVal = Number(clientVars.frmEdit.totalE.value.trim());

    if (editNameVal.split(" ").length > 2) {
        clientFuncs.showModal(
            "Error al modificar",
            "Asegurate de solo agregar al cliente con un nombre y un apellido o dos nombres, pero no más."
        );
        return;
    }

    if (editNameVal.split(" ").length < 2) {
        clientFuncs.showModal(
            "Error al modificar",
            "Asegurate de agregar dos nombres o un nombre y un apellido al cliente, solo escribir un nombre no es valido."
        );
        return;
    }

    editNameVal = formatNameCorrectly(editNameVal);

    if (editNameVal === "" || editArticlesVal <= 0 || editTotalVal <= 0) {
        clientFuncs.showModal(
            "Error al modificar",
            "Asegurate de llenar todos los campos antes de continuar o de introducir una cantidad valida."
        );
        return;
    }

    //Se busca un cliente con el mismo nombre y diferente id
    let clientRepeated = clientVars.clientsArr.find(
        (element) => element.name == editNameVal && element.clientId !== clientVars.modalEdit.id
    );

    //Si el cliente ya existe
    if (clientRepeated) {
        const confirmMsg = `Ya existe otro cliente con este nombre en la lista\n\n¿Deseas unificarlos?`;
        if (!confirm(confirmMsg)) return;
        /* Si quiere unificar a los clientes */
        const currentClient = clientFuncs.getClientInfoById(clientVars.modalEdit.id);

        //Crear un nuevo objeto con la informacion unificada
        const mergedClient = {
            ...clientRepeated,
            total: Number(clientRepeated.total) + editTotalVal,
            articles: Number(clientRepeated.articles) + editArticlesVal,
            registry: [...clientRepeated.registry, ...currentClient.registry],
        };

        //Se elimina el cliente de la lista de recomendaciones para agregar
        clientFuncs.deleteOption(currentClient.clientId);

        //Se eliminan ambos clientes del arreglo y la interfaz
        clientFuncs.deleteThis(clientVars.modalEdit.id);
        clientFuncs.deleteThis(clientRepeated.clientId);

        //Se agrega el nuevo cliente al arreglo y la interfaz
        clientVars.clientsArr.push(mergedClient);
        sortLive();
        clientVars.modalEdit.classList.add("d-none");
        /* --------------------------------- */
        return;
    }

    //Si no existe otro cliente igual
    for (let client of clientVars.clientsArr) {
        if (client.clientId !== clientVars.modalEdit.id) continue;

        //Verificar si se cambio el nombre
        if (client.name !== editNameVal) {
            clientFuncs.deleteOption(client.clientId); //Se elimina la opcion del nombre del clientlist
            clientVars.clientsDataList.appendChild(clientFuncs.createOption(editNameVal, client.clientId)); //Se agrega el nuevo nombre para autocompletar en la lista de clientes
        }

        client.name = editNameVal;
        client.articles = editArticlesVal;
        client.total = editTotalVal;
        break;
    }

    sortLive();
    clientVars.modalEdit.classList.add("d-none");
});
/* -------------------- */

/* Eventos para los inputs del formulario para agregar un cliente */
frmClientData.clientName.addEventListener("input", (e) => globalFuncs.allowJustLetters(e.target));
frmClientData.price.addEventListener("input", ({ target, data }) => {
    //El input devuelve en value un <empty string> si se agrega un valor no numerico
    if (target.value === "" && data !== "-") target.value = ""; //Si se agrego un valor no numerico se vacia el input

    if (target.valueAsNumber < 0) {
        frmClientData.amount.setAttribute("disabled", "true");
        return;
    }
    frmClientData.amount.removeAttribute("disabled");
});

/* Al agregar un cliente */
frmClientData.addEventListener("submit", (e) => {
    e.preventDefault();

    let clientNameVal = frmClientData.clientName.value.trim();
    const priceVal = Number(frmClientData.price.value.trim());
    const amountVal = Number(frmClientData.amount.value.trim());

    if (clientNameVal.split(" ").length > 2) {
        clientFuncs.showModal(
            "Error al agregar",
            "Asegurate de solo agregar al cliente con un nombre y un apellido o dos nombres, pero no más."
        );
        return;
    }

    if (clientNameVal.split(" ").length < 2) {
        clientFuncs.showModal(
            "Error al agregar",
            "Asegurate de agregar dos nombres o un nombre y un apellido al cliente, solo escribir un nombre no es valido."
        );
        return;
    }

    clientNameVal = formatNameCorrectly(clientNameVal);

    if (clientNameVal === "" || priceVal == 0) {
        clientFuncs.showModal(
            "Error al agregar",
            "Asegurate de llenar todos los campos antes de continuar o introducir un precio correcto."
        );
        return;
    }

    frmClientData.amount.removeAttribute("disabled");

    //Se obtiene el cliente de la lista
    let clientFromList = clientFuncs.getClientInfoByName(clientNameVal);
    //Si el cliente está en la lista
    if (clientFromList) {
        //Modificar cliente en el arreglo
        for (let client of clientVars.clientsArr) {
            if (client.name !== clientNameVal) continue;

            //Si ingresa un precio negativo
            if (priceVal < 0) {
                client.total = Number(clientFromList.total) + priceVal;

                const confirmMsg = `La cantidad ingresada es negativa por lo que se restara al total del cliente ${client.name}\n\n¿Desea restar 1 articulo también?`;
                confirm(confirmMsg) ? (client.articles -= 1) : null;
            } else {
                const priceToAdd = amountVal > 1 ? priceVal * amountVal : priceVal;
                client.total = Number(clientFromList.total) + priceToAdd;

                client.articles += amountVal;
            }

            //Se agrega la operacion al registro
            client.registry.push(`${priceVal > 0 ? "+" : ""}${priceVal}`);

            //Si se agrega mas de una prenda y si el valor es positivo
            if (amountVal > 1 && priceVal > 0) {
                //Se agrega al registro la cantidad de veces que falten
                for (let i = 1; i < amountVal; i++) {
                    client.registry.push(`${priceVal > 0 ? "+" : ""}${priceVal}`);
                }
            }
            break;
        }

        //Modificar cliente en la interfaz
        const totalToEdit = document.getElementById(clientFromList.clientId).children[1].firstElementChild;
        totalToEdit.innerText = globalVars.FORMATTER.format(clientFromList.total);
        const articlesToEdit = document.getElementById(clientFromList.clientId).firstElementChild.lastElementChild;
        articlesToEdit.innerText = clientFromList.articles;

        frmClientData.reset();
        frmClientData.clientName.focus();
        sortLive();

        if (clientFromList.total > 0) return;
        //Si el cliente tiene un total menor o igual a 0
        document.getElementById(clientFromList.clientId).remove(); //Se elimina de la interfaz
        clientFuncs.deleteOption(clientFromList.clientId); //Se elimina la opcion del nombre del clientlist
        clientFuncs.removeClientFromArr(clientFuncs.getClientIndexById(clientFromList.clientId)); //Se elimina del arreglo
        sortLive();
        return;
    }

    if (priceVal <= 0) {
        clientFuncs.showModal("Error al agregar", "No puedes agregar un cliente a la lista con esta cantidad");
        return;
    }
    //Si el cliente no esta en la lista
    clientFromList = {
        name: clientNameVal,
        total: priceVal * amountVal,
        articles: amountVal,
        registry: [],
        clientId: globalFuncs.generateId(),
    };
    //Se agrega la cantidad al registro de operaciones con el cliente
    clientFromList.registry.push(`+${priceVal}`);
    //Si se agrega mas de una prenda
    if (amountVal > 1) {
        //Se agrega al registro la cantidad de veces que falten
        for (let i = 1; i < amountVal; i++) clientFromList.registry.push(`+${priceVal}`);
    }

    clientVars.clientsArr.push(clientFromList);
    clientFuncs.createNewClient(clientFromList.clientId, clientNameVal, priceVal, clientFromList.articles);

    frmClientData.reset();
    frmClientData.clientName.focus();
    sortLive();
});
/* --------------------- */

/* Funciones para los botones de ordenar, eliminar y guardar */
const clearLive = () => {
    /* Se muestra y almacena la fecha actual */
    const currentDate = globalFuncs.getCompleteDate();
    localStorage.setItem("Date", currentDate);
    dateLive.innerText = currentDate;
    /* ------------------------------------- */
    clientFuncs.emptyClients();
    clientFuncs.updateAndSave();
};
const getBestBuyer = (arr) => {
    let bestBuyer = arr[0];
    for (let client of arr) if (Number(client.total) > Number(bestBuyer.total)) bestBuyer = client;
    return bestBuyer;
};
const getTotalArticles = () => {
    let totalArticles = 0;
    for (let client of clientVars.clientsArr) totalArticles += client.articles;
    return totalArticles;
};
export const removeLiveFromArr = (index) => fbLives.lives.splice(index, 1);

const sortLive = () => {
    //Ordenar el arreglo y actualizarlo en el LS
    clientFuncs.sortClientsArr();
    clientFuncs.saveClientsLS();
    clientFuncs.updateLiveTotal();
    clientFuncs.updateClientsAmount();
    //Limpiar el contenedor de los clientes
    clientVars.clientsHtmlCnt.innerHTML = "";
    const clientsHtmlFrgmnt = document.createDocumentFragment();
    //Mostrar los clientes ordenados en la interfaz
    for (let client of clientVars.clientsArr)
        clientsHtmlFrgmnt.appendChild(
            clientFuncs.createHtml(client.clientId, client.name, client.total, client.articles)
        );
    clientVars.clientsHtmlCnt.appendChild(clientsHtmlFrgmnt);
};

const saveLive = () => {
    const editOn = localStorage.getItem("Edit") == "on" ? true : false;

    if (clientVars.clientsArr.length == 0 && !editOn) {
        clientFuncs.showModal("Error al guardar", "No hay ningun cliente que guardar en la tabla de clientes.");
        return;
    }

    /* Crear objeto del live e introducirlo en los lives existentes */
    const actualDate = new Date();
    const endTime = `${globalFuncs.formatTime(actualDate.getHours())}:${globalFuncs.formatTime(
        actualDate.getMinutes()
    )}:${globalFuncs.formatTime(actualDate.getSeconds())}`;
    const liveData = {
        liveId: editOn ? liveToEdit.liveId : globalFuncs.generateId(),
        date: editOn ? liveToEdit.date : localStorage.getItem("Date"),
        startTime: editOn ? liveToEdit.startTime : localStorage.getItem("TimeStart"),
        time: editOn ? liveToEdit.time : endTime,
        clientsAmount: Number(clientsAmount.innerText),
        clients: clientVars.clientsArr,
        total: Number(totalLive.innerText.replace(/,/g, "")),
        totalArticles: getTotalArticles(),
        bestBuyer: getBestBuyer(clientVars.clientsArr),
    };
    let indexOfPrevLive;
    if (editOn) {
        for (let index in fbLives.lives) {
            if (fbLives.lives[index].liveId !== liveToEdit.liveId) continue;
            removeLiveFromArr(index);
            indexOfPrevLive = index;
            break;
        }

        if (!confirm("Esta a punto de sobreescribir la información previa del live, ¿Desea continuar?")) return;
        localStorage.setItem("Edit", "off");
    }

    clientFuncs.showModal("Cargando..", "Espere mientras se almacena la informacion del live en la base de datos.");

    if (clientVars.clientsArr.length !== 0) {
        if (editOn) {
            fbLives.lives.splice(indexOfPrevLive, 0, liveData); //Guarda el live de modo que permanezca en la misma posicion en la que estaba antes de ser modificado
        } else fbLives.lives.push(liveData);
    } else
        clientFuncs.showModal(
            "Live eliminado",
            "Al sobreescribir el live sin ningun cliente se elimina de la base de datos"
        );
    /* ------------------------------------------------------------- */

    /* Agregar el nuevo objeto a la base de datos */
    firebase.STORAGE.collection("vendedoras")
        .doc(clientVars.userIdLS)
        .set(fbLives)
        .then(() => {
            clearLive();
            open("index.html", "_self");
        })
        .catch((err) => {
            clientFuncs.showModal(
                "Error al guardar",
                `Ocurrio un error al guardar la informacion en la base de datos, informe sobre este error: ${err}`
            );
        });
    /* ------------------------------------------- */
};
/* ---------------------------------------------------------- */

/* Al eliminar la informacion de la tabla */
document.getElementById("btnDelete").addEventListener("click", () => clearLive());
/* -------------------------------------- */

/* Al imprimir la tabla */
document.getElementById("btnPrint").addEventListener("click", () => {
    if (clientVars.clientsArr.length == 0) {
        clientFuncs.showModal("Error al imprimir", "No hay ningun cliente que imprimir en la tabla de clientes.");
        return;
    }
    window.print();
});
/* -------------------- */

/* Al guardar el live */
document.getElementById("btnSave").addEventListener("click", () => saveLive());
/* ------------------ */

const modalShortcuts = document.getElementById("modalShortcuts");
document.getElementById("btnShortcuts").addEventListener("click", () => modalShortcuts.classList.remove("d-none"));

const shortcutsToggle = document.getElementById("shortcutsToggle");
/* Se establece si no existe y obtiene el valor de shortcuts en el almacenamiento local */
if (localStorage.getItem("Shortcuts") == null) localStorage.setItem("Shortcuts", "true");
const getShortcutsEnabled = () => (localStorage.getItem("Shortcuts") == "true" ? true : false);
/* Se establece el estado del checkbox de los atajos en base al almacenamiento local */
if (getShortcutsEnabled()) shortcutsToggle.setAttribute("checked", "checked");
else shortcutsToggle.removeAttribute("checked");
/* Se actualiza el estado en el almacenamiento local del shortcuts toggle */
shortcutsToggle.addEventListener("change", () => {
    localStorage.setItem("Shortcuts", JSON.stringify(shortcutsToggle.checked));
});

document.addEventListener("keydown", (e) => {
    if (getShortcutsEnabled()) {
        if (e.altKey && e.code == "KeyQ") frmClientData.clientName.focus();
        if (e.altKey && e.code == "KeyW") frmClientData.price.focus();
        if (e.altKey && e.code == "KeyC") clearLive();
        if (e.altKey && e.code == "KeyG") saveLive();
    }
});
