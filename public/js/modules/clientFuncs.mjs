"use strict";

import * as globalVars from "./globalVars.mjs";
import * as clientVars from "./clientVars.mjs";

/* Getters de informacion del arreglo de clientes */
const getClientInfoByName = (clientName) => clientVars.clientsArr.find((element) => element.name == clientName);
const getClientInfoById = (clientId) => clientVars.clientsArr.find((element) => element.clientId == clientId);
/* Getters de indice del arreglo de clientes */
const getClientIndexByName = (clientName) => clientVars.clientsArr.findIndex((element) => element.name == clientName);
const getClientIndexById = (clientId) => clientVars.clientsArr.findIndex((element) => element.clientId == clientId);
/* Remocer elemento del arreglo de clientes */
const removeClientFromArr = (index) => clientVars.clientsArr.splice(index, 1);

const sortClientsArr = () => {
    clientVars.clientsArr.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};

const createOption = (clientName, id) => {
    const optionClient = document.createElement("option");
    optionClient.setAttribute("key", id);
    optionClient.value = clientName;
    return optionClient;
};
const deleteOption = (clientId) => {
    //Se elimina de la lista de clientes para agregar
    for (let element of document.getElementById("clients").options) element.getAttribute("key") == clientId && element.remove();
};

const shwRegistry = (clientId) => {
    const clientInfo = getClientInfoById(clientId);
    showModal(`Registro de ${clientInfo.name}`, `${clientInfo.registry.toString().replace(/,/g, "\t")}`);
};

const shwEditModal = (clientId) => {
    //Se obtiene la informacion del cliente
    const clientInfo = getClientInfoById(clientId);
    //Se muestra en los inputs
    clientVars.frmEdit.nombre.value = clientInfo.name;
    clientVars.frmEdit.articulos.value = clientInfo.articles;
    clientVars.frmEdit.total.value = clientInfo.total;
    //Se le agrega al modal el mismo identificador que el del cliente que se esta editando
    clientVars.modalEdit.id = clientInfo.clientId;
    //Se muestra el modal para editar al cliente
    clientVars.modalEdit.classList.remove("d-none");
};
const deleteThis = (clientId) => {
    removeClientFromArr(getClientIndexById(clientId));
    //Se actualiza el array y la interfaz
    document.getElementById(clientId).remove();
    updateAndSave();
};

const createHtml = (id, clientName, total, articles, checked) => {
    const divClient = document.createElement("div");
    divClient.className = "table__row";
    divClient.id = id;
    // console.log(checked);
    divClient.innerHTML = `
        <p>${clientName} (<span class="row__articles">${articles}</span>)</p>
        <p>HNL <span>${globalVars.FORMATTER.format(total)}</span></p>
        <div class="row__btns">
            <button class="btn shwRegistry"><span class="material-icons">info</span></button>
            <button class="btn shwEditModal"><span class="material-icons">edit</span></button>
            <button class="btn deleteThis"><span class="material-icons">delete</span></button>
        </div>
    `;

    //Si es desde una tablet o celular
    if (document.body.clientWidth < 1024) {
        divClient.addEventListener("click", () => {
            //Al dar click al cliente
            divClient.querySelector(".row__btns").classList.toggle("row__btns--show"); //Se muestran los botones
        });
    }

    /* Se establecen los eventos de los botones */
    divClient.getElementsByClassName("shwRegistry")[0].addEventListener("click", () => shwRegistry(id));
    divClient.getElementsByClassName("shwEditModal")[0].addEventListener("click", () => shwEditModal(id));
    divClient.getElementsByClassName("deleteThis")[0].addEventListener("click", () => {
        if (!confirm(`Seguro que desea eliminar el cliente ${clientName}`)) return;
        deleteOption(id);
        deleteThis(id);
    });

    return divClient;
};

const createNewClient = (id, name, total, articles, checked) => {
    clientVars.clientsDataList.appendChild(createOption(name, id));
    clientVars.clientsHtmlCnt.appendChild(createHtml(id, name, total, articles, checked));
};

const emptyClients = () => {
    clientVars.setClientsArr([]);
    clientVars.clientsDataList.innerText = "";
    clientVars.clientsHtmlCnt.innerHTML = "";
};

const loadClientsFromArr = () => {
    for (let client of clientVars.clientsArr) createNewClient(client.clientId, client.name, client.total, client.articles, client.checked);
};

const saveClientsLS = () => {
    //Guardar clientes en el almacenamiento local
    localStorage.setItem("Clients", JSON.stringify(clientVars.clientsArr));
};

const updateLiveTotal = () => {
    //Calcular y mostrar total del live
    let clientsTotal = 0;
    for (let client of clientVars.clientsArr) clientsTotal += Number(client.total);
    document.getElementById("totalLive").innerText = globalVars.FORMATTER.format(clientsTotal);
    return clientsTotal;
};

//Actualizar cantidad de clientes
const updateClientsAmount = () => (document.getElementById("clientsAmount").innerText = clientVars.clientsArr.length);

//Actualizar y guardar el arreglo en el LS
const updateAndSave = () => {
    updateLiveTotal();
    updateClientsAmount();
    saveClientsLS();
};

const showModal = (title, description) => {
    document.getElementById("modalTitle").innerHTML = title;
    document.getElementById("modalDescription").innerHTML = description;
    document.getElementById("modal").classList.remove("d-none");
};

export {
    getClientInfoByName,
    getClientInfoById,
    getClientIndexByName,
    getClientIndexById,
    removeClientFromArr,
    sortClientsArr,
    createOption,
    deleteOption,
    deleteThis,
    createHtml,
    createNewClient,
    emptyClients,
    loadClientsFromArr,
    saveClientsLS,
    updateLiveTotal,
    updateClientsAmount,
    updateAndSave,
    showModal,
};
