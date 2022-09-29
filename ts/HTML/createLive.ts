import Client from '../Classes/Client';
import Live from '../Classes/Live';
import { btnDeleteLives } from '../DOM&LS/getFromIndex';
import { saveLivesDB } from '../Firebase/custom';
import { getDateComponents } from '../Global/date';
import { setEditMode } from '../Global/functions';

import { getLiveIndex, livesObj, removeLive } from '../Global/livesObj';
import popup from '../Global/popup';
import { ERRORS, FORMATTER } from '../Global/variables';

const handleDeleteLive = (live: Live) => {
    removeLive(getLiveIndex(live.ID));
    popup('Eliminando live', 'Espere mientras se elimina el live de la base de datos.');
    saveLivesDB().then(() => {
        location.reload();
    }).catch((err) => {
        btnDeleteLives.style.pointerEvents = 'all';
        popup(ERRORS.titles.delete, ERRORS.database.connectionTimedOut);
        throw new Error(err);
    })
}

const handleEditLive = (ID: string) => {
    setEditMode(true);
    const liveToEdit = JSON.stringify(
        livesObj.lives.find((live) => live.ID === ID)
    );
    if (liveToEdit === undefined) return;
    localStorage.setItem('editLive', liveToEdit);
    window.location.href = './nuevo-registro.html';
};

const createLiveClients = (clients: Client[]) => {
    return clients
        .map(
            ({ name, total }) => `
        <p class="table__row--nomargin lh-1-8">
            <span>${name}</span> 
            <span class="d-flex fjc-space-between ff-monospace">L. <span>${FORMATTER.format(total)}</span></span>
        </p>
        `
        )
        .join(' ');
};

const createLive = (live: Live) => {
    const liveSec = document.createElement('SECTION');
    liveSec.className = 'mb-1';
    liveSec.id = live.ID;
    const date = getDateComponents(live.date); 
    const liveDate = `${date.day} ${date.dayNum}/${date.monthNum}/${date.year}`;
    liveSec.innerHTML = `
        <div class="d-grid gtc-aft-300px-1fr bg-contrast brdr-round">
            <div class="pdng-1">
                <h2 class="mb-1">${liveDate}</h2>
                <div>
                    <p class="d-flex fjc-space-between lh-1-8">
                        <span>Duración:</span> 
                        <span>${live.startTime} - ${live.endTime}</span>
                    </p>
                    <p class="d-flex fjc-space-between lh-1-8">
                        <span>Clientes:</span><span>${live.clientsAmount}</span>
                    </p>
                    <p class="d-flex fjc-space-between lh-1-8">
                        <span>Artículos:</span><span>${live.articlesAmount}</span>
                    </p>
                    <p class="d-flex fjc-space-between lh-1-8">
                        <span>Total:</span> <span>HNL <span>${FORMATTER.format(live.total)}</span></span>
                    </p>
                </div>
                <div>
                    <h3 class="lh-1-8">Comprador estrella</h3>
                    <p class="d-flex fjc-space-between lh-1-8">
                        <span>${live.bestBuyer.name} ( ${live.bestBuyer.articles} )</span>
                        <span>HNL ${FORMATTER.format(live.bestBuyer.total)}</span>
                    </p>
                </div>
            </div>
            <div class="pdng-1">
                <div class="d-flex fjc-space-between ai-center mb-1">
                    <h2>Clientes</h2>
                    <div class="d-flex gap-1">
                        <button class="edit as-link">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                        <button class="delete as-link">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                    </div>
                </div>
                <div class="height-175 of-y-scroll">
                    ${createLiveClients(live.clients)}
                </div>
            </div>
        </div>
    `;
    /* Al dar click en editar */
    const editBtn = liveSec.querySelector('button.edit') as HTMLButtonElement;
    editBtn.addEventListener('click', () => {
        handleEditLive(liveSec.id);
    });
    const deleteBtn = liveSec.querySelector('button.delete') as HTMLButtonElement;
    deleteBtn.addEventListener('click', () => {
        handleDeleteLive(live);
    });
    return liveSec;
};

export default createLive;
