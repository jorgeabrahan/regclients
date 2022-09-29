import Client from '../Classes/Client';
import { btnDeleteRegistry, editF, editM, registry, registryM, registryMTitle } from '../DOM&LS/getFromNuevoRegistro';
import { getByID, saveOnLS } from '../Functions/nuevoRegistro/clientsArray';
import { removeByID, removeOption } from '../Functions/nuevoRegistro/clientsDOM';
import { FORMATTER, WIDTH } from '../Global/variables';

const toggleRegChecked = (regCnt: HTMLDivElement, client: Client) => {
    const reg = client.registry[Number(regCnt.getAttribute('key'))];
    reg.selected = !reg.selected;
    regCnt.querySelector('input')?.toggleAttribute('checked');
    saveOnLS();
}

const showRegistry = (client: Client) => {
    registryM.classList.remove('d-none');
    registryMTitle.textContent = `Registro de ${client.name}`;
    registry.innerHTML = '';
    const fragment = document.createDocumentFragment();
    client.registry.forEach((reg, index) => {
        const regCnt = document.createElement('DIV') as HTMLDivElement;
        regCnt.setAttribute('key', `${index}`);
        regCnt.className = "d-flex ai-center fjc-space-between bg-contrast pdng-0-5 brdr-round c-pointer"; 
        regCnt.innerHTML = `
            <p>${reg.category}</p>
            <div class="d-flex gap-1">
                <p>+${reg.amount}</p>
                <input type="checkbox" ${reg.selected ? 'checked' : ''}>
            </div>
        `;
        regCnt.addEventListener('click', () => {
            toggleRegChecked(regCnt, client);
        });
        fragment.appendChild(regCnt);
    });
    registry.append(fragment);
    btnDeleteRegistry.setAttribute('client-id', client.ID);
};

const showEditModal = (client: Client) => {
    const { ID, name } = client;
    editF.newName.value = name;
    editM.setAttribute('client-id', ID);
    editM.classList.remove('d-none');
};

const removeClient = (ID: string, name: string) => {
    const msg = `Confirme que desea eliminar al cliente ${name}`;
    if (!confirm(msg)) return;

    removeOption(ID);
    removeByID(ID);
};

const ifUserIsOnMobile = (clientCnt: HTMLDivElement) => {
    if (WIDTH >= 1024) return;
    const btnsCnt = clientCnt.querySelector('.table__row--buttons') as HTMLDivElement;
    clientCnt.addEventListener('click', () => {
        btnsCnt.classList.toggle('table__row--buttons--show'); //toggle show buttons
    });
}

const createClient = (ID: string, name: string, total: number, articles: number, checked: boolean) => {
    const clientCnt = document.createElement('div');
    clientCnt.className = 'table__row table__row--options';
    clientCnt.id = ID;
    clientCnt.innerHTML = `
        <p class="d-flex fjc-space-between">
            <span>${name}</span> 
            <span>[<span class="table__row--articles ff-monospace">${articles}</span>]</span>
        </p>
        <p class="d-flex fjc-space-between ta-right ff-monospace">L. <span class="table__row--total">${FORMATTER.format(total)}</span></p>
        <div class="table__row--buttons">
            <button class="btn as-link btnShowRegistry">
                <span class="material-symbols-outlined">inventory_2</span>
            </button>
            <button class="btn as-link btnShowEditModal">
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn as-link btnRemoveClient">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    `;

    ifUserIsOnMobile(clientCnt);
    const client: Client | undefined = getByID(ID);
    const btnShowRegistry = clientCnt.querySelector('.btnShowRegistry') as HTMLButtonElement;
    btnShowRegistry.addEventListener('click', () => showRegistry(client!));
    const btnShowEditModal = clientCnt.querySelector('.btnShowEditModal') as HTMLButtonElement; 
    btnShowEditModal.addEventListener('click', () => showEditModal(client!));
    const btnRemoveClient = clientCnt.querySelector('.btnRemoveClient') as HTMLButtonElement; 
    btnRemoveClient.addEventListener('click', () => removeClient(ID, name));

    return clientCnt;
};

export default createClient;
