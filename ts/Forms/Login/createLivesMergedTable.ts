import Client from '../../Classes/Client';
import { weekAmount, livesTable } from '../../DOM&LS/getFromIndex';
import { sortByName } from '../../Global/functions';
import { getLives } from '../../Global/livesObj';
import createWeekClient from '../../HTML/createWeekClient';

const clientsMerged: Client[] = [];

const mergeClients = (clients: Client[]) => {
    //Creates new array with clients from all lives merged
    for (let client of clients) {
        const { name, total, articles, registry } = client;
        const clientRepeated = clientsMerged.find((c) => name === c.name);
        if (typeof clientRepeated === "undefined") {
            clientsMerged.push(client);
            continue;
        }
        clientRepeated.total    += total;
        clientRepeated.articles += articles;
        clientRepeated.registry  = [...clientRepeated.registry, ...registry];
    }
};

const showLivesMergedTable = () => {
    const fragment = document.createDocumentFragment();
    clientsMerged.forEach(client => fragment.appendChild(createWeekClient(client)));
    livesTable.appendChild(fragment); //add all lives clients to table
    weekAmount.textContent = clientsMerged.length.toString(); //show amount
}

const createLivesMergedTable = () => {
    getLives().forEach((live) => mergeClients(live.clients)); //Merge clients from all lives
    sortByName(clientsMerged);
    showLivesMergedTable();
};

export default createLivesMergedTable;
