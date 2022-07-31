const clientsHtmlCnt = document.getElementById("clientsHtml");
const clientsDataList = document.getElementById("clients");

const modalEdit = document.getElementById("modalEdit");
const frmEdit = document.getElementById("frmEdit");

let clientsArr = JSON.parse(localStorage.getItem("Clients")) || [];
const setClientsArr = (newVal) => (clientsArr = newVal);

const userIdLS = localStorage.getItem("userId");
//Si el usuario no ha iniciado sesion
if (userIdLS == null) {
    open("index.html", "_self");
}

export { clientsHtmlCnt, clientsDataList, modalEdit, frmEdit, clientsArr, setClientsArr, userIdLS };
