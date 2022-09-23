import { clientsLS, dateLS, liveToEdit, setClientsLS } from '../../DOM&LS/getFromNuevoRegistro/storage';
import { btnExitEdit, liveDate } from '../../DOM&LS/getFromNuevoRegistro';
import {
    getTime,
    getEditMode,
} from '../../Global/functions';
import getLivesDB from '../../Functions/nuevoRegistro/getLivesDB';
import { INFO } from '../../Global/variables';
import popup from '../../Global/popup';
import { loadAll, updateAllAndSave } from '../../Functions/nuevoRegistro/clientsDOM';
import { getCompleteDate } from '../../Global/date';

const ifEditModeOn = (): boolean => {
    if (!getEditMode()) return false;
    popup('Modo edición', INFO.liveEditMode);
    btnExitEdit.classList.remove('d-none');
    liveDate.textContent = liveToEdit.date;

    setClientsLS(liveToEdit.clients);
    loadAll();
    updateAllAndSave();
    return true;
};

const ifClientsOnLS = (): boolean => {
    if (clientsLS.length <= 0) return false;
    popup('Almacenamiento local', INFO.LSHasClients);
    liveDate.textContent = dateLS || getCompleteDate();
    loadAll();
    updateAllAndSave();
    return true;
};

const createNuevoRegistro = () => {
    const time = getTime();
    localStorage.setItem('timeStart', time);

    const currentDate = getCompleteDate();
    liveDate.textContent = currentDate;
    localStorage.setItem('date', currentDate);

    popup(
        'Información del live',
        `
        Hora de inicio: <strong>${time}</strong><br />
        ${INFO.newLive}
        `
    );
} 

const handleNuevoRegistroLoad = () => {
    getLivesDB();
    if (ifEditModeOn()) return;
    if (ifClientsOnLS()) return;
    createNuevoRegistro();
};

export default handleNuevoRegistroLoad;
