import * as globalVars from "./globalVars.mjs";

export const clientsHtmlCnt = document.getElementById("clientsHtml");
export const clientsDataList = document.getElementById("clients");

export const modalEdit = document.getElementById("modalEdit");
export const frmEdit = document.getElementById("frmEdit");

export let clientsArr = JSON.parse(localStorage.getItem("Clients")) || [];
export const setClientsArr = (newVal) => (clientsArr = newVal);

export const userIdLS = localStorage.getItem("userId");
//Si el usuario no ha iniciado sesion
if (userIdLS == null) {
    open("index.html", "_self");
}

/* Guradar arreglo de clientes en el almacenamiento local */
export const saveClientsLS = () => {
    localStorage.setItem("Clients", JSON.stringify(clientsArr));
};
/* ------------------------------------------------------ */

/* Calcular y mostrar el total del live */
export const updateLiveTotal = () => {
    let clientsTotal = 0;
    for (let client of clientsArr) clientsTotal += Number(client.total);
    document.getElementById("totalLive").innerText = globalVars.FORMATTER.format(clientsTotal);
    return clientsTotal;
};
/* ------------------------------------ */

/* Actualizar la cantidad de clientes */
export const updateClientsAmount = () => (document.getElementById("clientsAmount").innerText = clientsArr.length);
/* ---------------------------------- */

/* Actualizar todo y guardar el arreglo en el almacenamiento local */
export const updateAndSave = () => {
    updateLiveTotal();
    updateClientsAmount();
    saveClientsLS();
};
/* --------------------------------------------------------------- */

/* Modal para mostrar informacion o mensajes de error */
export const showModal = (title, description) => {
    document.getElementById("modalTitle").textContent = title;
    document.getElementById("modalDescription").innerText = description;
    document.getElementById("modal").classList.remove("d-none");
};
/* ---------------------------------------------------- */
