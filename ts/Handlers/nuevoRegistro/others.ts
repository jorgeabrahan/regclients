import Registry from "../../Classes/Registry";
import { addF, btnDeleteRegistry, liveDate, registryM } from "../../DOM&LS/getFromNuevoRegistro";
import { getByID, getIndexByID, remove, saveOnLS } from "../../Functions/nuevoRegistro/clientsArray";
import { removeAll, removeOption, updateAllAndSave } from "../../Functions/nuevoRegistro/clientsDOM";
import { showLiveClientsUI } from "../../Functions/nuevoRegistro/sortLiveClients";
import { getCompleteDate } from "../../Global/date";
import { goTo, setEditMode } from "../../Global/functions";
import popup from "../../Global/popup";
import { getShortcutsLS } from "../../Global/shortcuts";
import { INFO } from "../../Global/variables";
import handleSaveLive from "./saveLive";

const handleExitEditMode = () => {
    popup('Información modo edición', INFO.exitEdit);
    removeAll(); //clients from DOM and LS
    saveOnLS();
    setEditMode(false);
    goTo('./index.html');
}

const handleClearLive = () => {
    const currentDate = getCompleteDate();
    localStorage.setItem('date', currentDate);
    liveDate.textContent = currentDate;

    removeAll(); //clients
    updateAllAndSave();
};

const handleShortcuts = (isAltPressed: boolean, keyCode: string) => {
    if (!getShortcutsLS()) return;
    if (isAltPressed && keyCode === 'KeyQ') addF.clientName.select();
    if (isAltPressed && keyCode === 'KeyW') addF.price.select();
    if (isAltPressed && keyCode === 'KeyC') handleClearLive();
    if (isAltPressed && keyCode === 'KeyG') handleSaveLive();
}

const handleDeleteRegistry = () => {
    const msg = "Confirme que desea eliminar todos los articulos seleccionados.";
    if(!confirm(msg)) return;
    const clientID = btnDeleteRegistry.getAttribute('client-id') || "";
    const client = getByID(clientID);
    const clientIndex = getIndexByID(clientID);
    if (client === undefined) return;
    const newRegistry: Registry[] = [];
    let subtract = 0;
    client.registry.forEach(reg => {
        if (!reg.selected) {
            newRegistry.push(reg);
        } else {
            subtract += reg.amount;
        }
    });
    client.registry = newRegistry;
    client.total -= subtract;
    client.articles = newRegistry.length;
    if (client.total === 0) {
        remove(clientIndex);
        removeOption(clientID);
    }
    updateAllAndSave();
    showLiveClientsUI();
    registryM.classList.add('d-none');
}

export {handleExitEditMode, handleClearLive, handleShortcuts, handleDeleteRegistry};