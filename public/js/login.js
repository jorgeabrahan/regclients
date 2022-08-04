"use strict";

import * as firebase from "./modules/firebase.mjs";
import * as globalVars from "./modules/globalVars.mjs";

const auth = firebase.APP.auth();

const frmLogin = document.getElementById("frmLogin");
const mail = frmLogin.mail;
const pass = frmLogin.pass;
const msgLogin = document.getElementById("msgLogin");
const login = document.querySelector(".login");

const userIdLS = localStorage.getItem("userId");

const livesCnt = document.getElementById("livesCnt");
const livesTable = document.getElementById("livesTable");
const livesOpts = document.getElementById("livesOpts");

const noLivesMsg = document.getElementById("noLivesMsg");

let fbLives = { lives: [] };

const createClientsHtml = (clients) => {
    const allClients = clients.map(
        (client) => `
        <p>
            <span class="bold">${client.name}</span> 
            <span>HNL ${globalVars.FORMATTER.format(Number(client.total))}</span>
        </p>
        `
    );
    return allClients.join(" ");
};

document.getElementById("btnNewLive").addEventListener("click", () => {
    localStorage.setItem("Edit", "off");
    open("live.html", "_self");
});
document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("userId");
    open("index.html", "_self");
});
const editLive = (id) => {
    localStorage.setItem("Edit", "on");
    localStorage.setItem("LiveToEdit", JSON.stringify(fbLives.lives.find((element) => element.liveId == id)));
    open("live.html", "_self");
};

const createLiveHtml = (liveData) => {
    const liveCnt = document.createElement("section");
    liveCnt.className = "live";
    liveCnt.id = liveData.liveId;
    liveCnt.innerHTML = `
        <div class="live__header">
            <div class="live__info">
                <h2>${liveData.date}</h2>
                <div class="live__group">
                    <h3>Tiempo</h3>
                    <p class="flex"><span class="bold">Hora inicio:</span> <span>${liveData.startTime}</span></p>
                    <p class="flex"><span class="bold">Hora finalización:</span> <span>${liveData.time}</span></p>
                </div>
                <div class="live__group">
                    <h3>Cantidad</h3>
                    <p class="flex"><span class="bold">Compradores:</span> <span>${liveData.clientsAmount}</span></p>
                    <p class="flex"><span class="bold">Artículos:</span> <span>${liveData.totalArticles}</span></p>
                </div>
                <div class="live__group">
                    <h3>Mejor comprador</h3>
                    <p class="flex"><span class="bold">Nombre:</span> <span>${liveData.bestBuyer.name}</span></p>
                    <p class="flex"><span class="bold">Total:</span> <span>HNL <span>${globalVars.FORMATTER.format(
                        Number(liveData.bestBuyer.total)
                    )}</span></span></p>
                    <p class="flex"><span class="bold">Articulos:</span> <span>${liveData.bestBuyer.articles}</span></p>
                </div>
                <p class="live__total flex"><span>Total:</span> <span>HNL <span>${globalVars.FORMATTER.format(
                    liveData.total
                )}</span></span></p>
            </div>
            <div class="live__info live__clients">
                <div class="live__title">
                    <h2>Clientes</h2>
                    <button class="btn edit-btn"><span class="material-icons">edit</span></button>
                </div>
                <div class="live__group clients__list">
                    ${createClientsHtml(liveData.clients)}
                </div>
            </div>
        </div>
    `;
    /* Al dar click en editar */
    liveCnt.getElementsByClassName("edit-btn")[0].addEventListener("click", () => editLive(liveCnt.id));
    return liveCnt;
};

const weekTotal = document.getElementById("weekTotal");

const loadContentFromFb = (userId) => {
    firebase.STORAGE.collection("vendedoras")
        .doc(userId)
        .get()
        .then((seller) => {
            if (seller.exists) fbLives = seller.data();
            /* Si ya inicio sesion pero no tiene lives previos */
            if (fbLives.lives.length == 0) {
                noLivesMsg.classList.remove("d-none");
                return;
            }
            /* ----------------------------------------------- */

            //Si ya tiene lives previos
            livesTable.classList.remove("d-none");
            livesOpts.classList.remove("d-none");

            /* Se muestran los lives en la interfaz */
            let totalLives = 0;
            const livesFrgmn = document.createDocumentFragment();
            for (let live of fbLives.lives) {
                livesFrgmn.appendChild(createLiveHtml(live));
                totalLives += live.total;
            }
            weekTotal.innerText = globalVars.FORMATTER.format(totalLives);
            livesCnt.appendChild(livesFrgmn);
            /* ------------------------------------- */

            mergeClientsLive(); //Se crea la tabla unificando todos los clientes

            const weekDay = globalVars.WEEK_DAYS[globalVars.DATE.getDay()];
            if (weekDay === "Lunes" && fbLives.lives.length > 0) {
                let existsLiveFromPastWeek = false;
                for (live of fbLives.lives) {
                    const liveDay = live.date.split(" ")[0];
                    const dayIndex = globalVars.WEEK_DAYS.findIndex((day) => liveDay === day);
                    //If theres a live from past week
                    if (dayIndex > 1 || dayIndex === 0) {
                        existsLiveFromPastWeek = true;
                        break;
                    }
                }

                if (existsLiveFromPastWeek) {
                    alert(
                        "¡La semana ha terminado! para comenzar una nueva elimina los lives de la semana dando clic en el boton 'Eliminar todo'"
                    );
                }
            }
        })
        .catch((err) => {
            const errMsg = `Error al leer la base de datos, intente en otro momento con una mejor conexion a internet.\nError: ${err}`;
            alert(errMsg);
            throw new Error(errMsg);
        });
};

const onLogin = (userId) => {
    login.classList.add("d-none");
    loadContentFromFb(userId);
};

/* Si ya inicio sesion */
if (userIdLS != null) onLogin(userIdLS);

/* Al iniciar sesion */
frmLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    if (mail.value == "" || pass.value == "") {
        msgLogin.innerText = "Debe llenar todos los campos.";
        return;
    }
    e.target.style.pointerEvents = "none";

    msgLogin.innerText = "";
    auth.signInWithEmailAndPassword(mail.value, pass.value)
        .then((userCredential) => {
            const userId = userCredential.user.uid;
            localStorage.setItem("userId", userId);
            onLogin(userId);

            e.target.style.pointerEvents = "all";
        })
        .catch((err) => {
            const errCode = err.code.split("/")[1];
            if (errCode == "user-not-found") msgLogin.innerText = "El usuario no existe o el correo es incorrecto";
            if (errCode == "wrong-password") msgLogin.innerText = "La contraseña es incorrecta";

            e.target.style.pointerEvents = "all";
        });
});
/* ----------------- */

/* Eliminar todos los lives para empezar una nueva semana */
document.getElementById("livesDelete").addEventListener("click", () => {
    if (confirm("Seguro que deseas eliminar todo y empezar una nueva semana")) {
        firebase.STORAGE.collection("vendedoras")
            .doc(userIdLS)
            .delete()
            .then(() => {
                livesCnt.innerHTML = "";
                weekTotal.innerText = "0.00";
                livesTable.classList.add("d-none");
                noLivesMsg.classList.remove("d-none");
            });
    }
});
/* -------------------------------------------------------- */

const weekClientsTable = document.getElementById("weekClientsTable");
const printWeekTable = document.getElementById("printWeekTable");

/* Al imprimir la tabla con todos los lives unificados */
printWeekTable.addEventListener("click", () => {
    if (confirm("¿Desea mostrar el total de la semana en la tabla?"))
        weekClientsTable.appendChild(weekTotal.parentElement);
    else document.getElementById("totalCnt").appendChild(weekTotal.parentElement);
    try {
        if (!document.execCommand("print", false, null)) {
            window.print();
        }
    } catch {
        window.print();
    }
});
/* --------------------------------------------------- */

/* Unificar los clientes de todos los lives y crear una sola tabla */
const weekClients = [];
const createWeekClientsHtml = (name, articles, total) => {
    const divClient = document.createElement("div");
    divClient.className = "table__row";
    divClient.innerHTML = `
        <p>${name} (<span class="row__articles">${articles}</span>)</p>
        <p>HNL <span>${globalVars.FORMATTER.format(total)}</span></p>
    `;
    return divClient;
};
const sortWeekClients = () => {
    weekClients.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};
const mergeClients = (clients) => {
    for (let currentClient of clients) {
        //Se comprueba si el cliente ya existe en los nuevos clientes
        const clientFromWeek = weekClients.find((weekClient) => currentClient.name == weekClient.name);

        if (clientFromWeek == undefined) {
            weekClients.push({
                ...currentClient,
                total: Number(currentClient.total),
                articles: Number(currentClient.articles),
            });
            continue;
        }

        clientFromWeek.total += Number(currentClient.total);
        clientFromWeek.articles += Number(currentClient.articles);
        clientFromWeek.registry = [...clientFromWeek.registry, ...currentClient.registry];
    }
};
const mergeClientsLive = () => {
    for (let live of fbLives.lives) mergeClients(live.clients); //Por cada live se buscan clientes que compraron en varios y se unifica su informacion
    sortWeekClients(); //Se ordena el arreglo resultante
    /* Se muestra el arreglo unificado como tabla en la interfaz */
    const weekClientsFrgmnt = document.createDocumentFragment();
    for (let client of weekClients)
        weekClientsFrgmnt.appendChild(createWeekClientsHtml(client.name, client.articles, client.total));
    weekClientsTable.appendChild(weekClientsFrgmnt);
    /* Se muestra la cantidad de clientes */
    document.getElementById("weekClientsAmount").innerText = weekClients.length;
};
/* ---------------------------------------------------------------- */

/* Se intercambia entre la vista detallada y la de tabla */
document.getElementById("toggleView").addEventListener("click", () => {
    document.getElementById("clientsTable").classList.toggle("d-none");
    printWeekTable.classList.toggle("d-none");
    livesCnt.classList.toggle("d-none");
    //Se muestra el total fuera de la tabla
    document.getElementById("totalCnt").appendChild(weekTotal.parentElement);
});
