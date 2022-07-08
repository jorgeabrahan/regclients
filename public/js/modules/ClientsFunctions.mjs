'use strict';

import { formatter } from './GenVars.mjs';
import { updateAndSave, showModal, clientsHtmlCnt, frmEdit, modalEdit, clientsArr, setClientsArr, clientsDataList } from './ClientsDOM.mjs';


/* Getters de informacion del arreglo de clientes */
export const getClientInfoByName = (clientName) => clientsArr.find(element => element.name == clientName)
export const getClientInfoById = clientId => clientsArr.find(element => element.clientId == clientId)
/* Getters de indice del arreglo de clientes */
export const getClientIndexByName = clientName => clientsArr.findIndex(element => element.name == clientName)
export const getClientIndexById = clientId => clientsArr.findIndex(element => element.clientId == clientId)
/* Remocer elemento del arreglo de clientes */
export const removeClientFromArr = index => clientsArr.splice(index, 1)




export const createOption = (clientName, id) => {
    const optionClient = document.createElement('option');
    optionClient.setAttribute('key', id);
    optionClient.value = clientName;
    return optionClient;
}

const shwRegistry = (clientId) => {
    const clientInfo = getClientInfoById(clientId);
    showModal(`Registro de ${clientInfo.name}`, `${clientInfo.registry.toString().replace(/,/g, '\t')}`);
}
const shwEditModal = (clientId) => {
    //Se obtiene la informacion del cliente
    const clientInfo = getClientInfoById(clientId);
    //Se muestra en los inputs
    frmEdit.nombre.value = clientInfo.name;
    frmEdit.articulos.value = clientInfo.articles;
    frmEdit.total.value = clientInfo.total;
    //Se le agrega al modal el mismo identificador que el del cliente que se esta editando
    modalEdit.id = clientInfo.clientId;
    //Se muestra el modal para editar al cliente
    modalEdit.classList.remove('d-none');
}
export const deleteOption = clientId => {
    //Se elimina de la lista de clientes para agregar
    for (let element of document.getElementById('clients').options) element.getAttribute('key') == clientId && element.remove();
}
export const deleteThis = clientId => {
    //Se actualiza el array y la interfaz
    removeClientFromArr(getClientIndexById(clientId));
    document.getElementById(clientId).remove();
    updateAndSave();
}

export const createHtml = (id, clientName, total, articles) => {
    const divClient = document.createElement('div');
    divClient.className = 'table__row';
    divClient.id = id;
    divClient.innerHTML = `
        <p>${clientName} (<span class="row__articles">${articles}</span>)</p>
        <p>HNL <span>${formatter.format(total)}</span></p>
        <div class="row__btns">
            <button class="btn shwRegistry"><span class="material-icons">info</span></button>
            <button class="btn shwEditModal"><span class="material-icons">edit</span></button>
            <button class="btn deleteThis"><span class="material-icons">delete</span></button>
        </div>
    `;

    /* Se establecen los eventos de los botones */
    divClient.getElementsByClassName('shwRegistry')[0].addEventListener('click', () => shwRegistry(id));
    divClient.getElementsByClassName('shwEditModal')[0].addEventListener('click', () => shwEditModal(id));
    divClient.getElementsByClassName('deleteThis')[0].addEventListener('click', () => {
        if (!confirm(`Seguro que desea eliminar el cliente ${clientName}`)) return;
        deleteOption(id);
        deleteThis(id);
    });

    return divClient;
}


export const sortClientsArr = () => {
    clientsArr.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
}

export const createNewClient = (id, name, total, articles) => {
    clientsDataList.appendChild(createOption(name, id));
    clientsHtmlCnt.appendChild(createHtml(id, name, total, articles));
}
export const emptyClients = () => {
    setClientsArr([]);
    clientsDataList.innerText = '';
    clientsHtmlCnt.innerHTML = '';
}

export const loadClientsFromArr = () => {
    for (let client of clientsArr) createNewClient(client.clientId, client.name, client.total, client.articles);
}