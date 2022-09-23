import Client from '../../Classes/Client';
import {
    clientsOptions,
    editF,
    editM,
    editMsg,
    newName,
} from '../../DOM&LS/getFromNuevoRegistro';
import { clientsLS } from '../../DOM&LS/getFromNuevoRegistro/storage';
import { getByID } from '../../Functions/nuevoRegistro/clientsArray';
import { removeByID, removeOption, updateAllAndSave } from '../../Functions/nuevoRegistro/clientsDOM';
import sortLiveClients from '../../Functions/nuevoRegistro/sortLiveClients';
import { ERRORS } from '../../Global/variables';
import createClientOption from '../../HTML/createClientOption';
import { formatName, isAnyInputEmpty } from '../validateForms';

const afterEdit = () => {
    sortLiveClients();
    updateAllAndSave();
    editM.classList.add('d-none');
};

const ifClientIsRepeated = (
    client: Client,
    name: string
): boolean => {
    //other client same name different id
    let repeated = clientsLS.find((c) => c.name === name && c.ID !== client.ID);
    if (!repeated) return false;

    const msg = 'Ya existe otro cliente con este nombre ¿Deseas unificarlos?';
    if (!confirm(msg)) return true;

    if (!client) return true; //if client is undefined

    const merge = {
        ...repeated,
        total: repeated.total + client.total,
        articles: repeated.articles + client.articles,
        registry: [...repeated.registry, ...client.registry]
    };

    removeOption(client.ID);
    removeByID(client.ID);
    removeByID(repeated.ID);

    clientsLS.push(merge);
    afterEdit();
    return true;
};

const ifClientIsNotRepeated = (
    client: Client,
    name: string
) => {
    if (client.name !== name) {
        removeOption(client.ID);
        clientsOptions.appendChild(createClientOption(name, client.ID));
    }
    client.name = name;
    afterEdit();
};

const handleEditSubmit = () => {
    const name = formatName(newName.value.trim());
    const ID = editM.getAttribute('client-id') || "";
    const client = getByID(ID);

    if (isAnyInputEmpty(editF)) {
        editMsg.textContent = ERRORS.submit.emptyFields;
        return;
    }

    if (!client) return;

    if (ifClientIsRepeated(client, name)) return;
    ifClientIsNotRepeated(client, name);
};

export default handleEditSubmit;
