import Live from '../../Classes/Live';
import {
    clientsLS,
    dateLS,
    liveToEdit,
    timeStartLS,
} from '../../DOM&LS/getFromNuevoRegistro/storage';
import {
    createID,
    getCurrentTime,
    getEditMode,
    goTo,
    setEditMode,
} from '../../Global/functions';
import { getLives, removeLive } from '../../Global/livesObj';
import popup from '../../Global/popup';
import { ERRORS } from '../../Global/variables';
import { handleClearLive } from './others';
import { getLiveTotal } from '../../Functions/nuevoRegistro/clientsDOM';
import { saveLivesDB } from '../../Firebase/custom';

const getBestBuyer = () => {
    let best = clientsLS[0];
    clientsLS.forEach((client) => {
        if (client.total > best.total) best = client;
    });
    return best;
};
const getTotalArticles = () => {
    let total = 0;
    for (let { articles } of clientsLS) total += articles;
    return total;
};

const newLive = (isEditOn: boolean): Live => {
    const date = isEditOn ? liveToEdit.date : dateLS;
    const ID = isEditOn ? liveToEdit.ID : createID();
    const startTime = isEditOn ? liveToEdit.startTime : timeStartLS;
    const endTime = isEditOn ? liveToEdit.endTime : getCurrentTime();
    return new Live(
        date,
        ID,
        startTime,
        endTime,
        getLiveTotal(),
        getTotalArticles(),
        clientsLS.length,
        getBestBuyer(),
        clientsLS
    );
};

const getIndexOfLive = () =>
    getLives().findIndex(({ ID }) => ID === liveToEdit.ID);

const ifEditIsOn = (isEditOn: boolean, live: Live): boolean => {
    if (!isEditOn) return false;
    const msg = 'Se sobreescribira el live, ¿Desea continuar?';
    if (!confirm(msg)) return true; //if true father function execution stops

    let index = getIndexOfLive();
    removeLive(index);
    if (clientsLS.length !== 0) getLives().splice(index, 0, live);
    setEditMode(false);
    return false;
};

const handleSaveLive = () => {
    const isEditOn = getEditMode();

    if (clientsLS.length === 0 && !isEditOn) {
        popup(ERRORS.titles.save, ERRORS.noClients);
        return;
    }

    const live = newLive(isEditOn);

    if (ifEditIsOn(isEditOn, live)) return;
    if (!isEditOn) getLives().push(live);

    popup(
        'Guardando cambios',
        'Se está almacenando la información del live en la base de datos.'
    );
    if (clientsLS.length === 0) {
        popup(
            'Eliminando live',
            'El live sera eliminado ya que se guardo sin ningun cliente.'
        );
    }
    saveLivesDB().then(() => {
        handleClearLive();
        goTo('./index.html');
    }).catch((err) => {
        popup(ERRORS.titles.save, ERRORS.database.connectionTimedOut);
        throw new Error(err);
    })
};

export default handleSaveLive;
