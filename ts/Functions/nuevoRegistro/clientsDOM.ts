import { clientsAmount, clientsCnt, clientsOptions, liveTotal } from "../../DOM&LS/getFromNuevoRegistro";
import { clientsLS, setClientsLS } from "../../DOM&LS/getFromNuevoRegistro/storage";
import { FORMATTER } from "../../Global/variables";
import createClient from "../../HTML/createClient";
import createClientOption from "../../HTML/createClientOption";
import { getIndexByID, remove, saveOnLS } from "./clientsArray";
import { loadFrequentClients } from "./loadConfig";


const getLiveTotal = (): number => {
    let totalAll = 0;
    clientsLS.forEach(({total}) => totalAll += total);
    return totalAll;
}

const updateLiveTotal = () => liveTotal.textContent = FORMATTER.format(getLiveTotal());
const updateClientsAmount = () => clientsAmount.textContent = `${clientsLS.length}`;

const updateAllAndSave = () => {
    updateLiveTotal();
    updateClientsAmount();
    saveOnLS();
};

const removeOption = (ID: string) => {
    for (let opt of clientsOptions.options) opt.getAttribute("key") === ID && opt.remove();
};


const removeByID = (ID: string) => {
    remove(getIndexByID(ID)); //from array
    const clientCnt = document.getElementById(ID) as HTMLDivElement; 
    clientCnt.remove(); //DOM container

    updateAllAndSave();
};

const removeAll = () => {
    setClientsLS([]);
    clientsOptions.innerHTML = '';
    loadFrequentClients();
    clientsCnt.innerHTML = "";
};

const newClient = (ID: string, name: string, total: number, articles: number, checked: boolean) => {
    clientsOptions.appendChild(createClientOption(name, ID));
    clientsCnt.appendChild(createClient(ID, name, total, articles, checked));
};

const loadAll = () => {
    for (let {ID, name, total, articles, checked} of clientsLS) newClient(ID, name, total, articles, checked);
};

export {getLiveTotal, updateLiveTotal, updateClientsAmount, updateAllAndSave, removeOption, removeByID, removeAll, newClient, loadAll}