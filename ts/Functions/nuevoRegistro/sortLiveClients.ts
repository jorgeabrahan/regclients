import { clientsCnt } from '../../DOM&LS/getFromNuevoRegistro';
import { clientsLS } from '../../DOM&LS/getFromNuevoRegistro/storage';
import createClient from '../../HTML/createClient';
import { saveOnLS, sort } from './clientsArray';

const showLiveClientsUI = () => {
    clientsCnt.innerHTML = '';
    const fragment = document.createDocumentFragment();
    clientsLS.forEach(client => {
        const { ID, name, total, articles, checked } = client;
        fragment.appendChild(createClient(ID, name, total, articles, checked));
    });
    clientsCnt.appendChild(fragment);
}

const sortLiveClients = () => {
    sort();
    saveOnLS();
    showLiveClientsUI();
};

export default sortLiveClients;
export {showLiveClientsUI};
