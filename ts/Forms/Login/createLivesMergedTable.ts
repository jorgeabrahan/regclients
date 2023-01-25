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
        
        const repeated = clientsMerged.find((c) => name === c.name);
        const repeatedIndex = clientsMerged.findIndex((c) => name === c.name);

        if (typeof repeated === "undefined") {
            clientsMerged.push(client);
            continue;
        }
        clientsMerged.push({
            ...client,
            total: repeated.total + total,
            articles: repeated.articles + articles,
            registry: [...repeated.registry, ...registry]
        });
        clientsMerged.splice(repeatedIndex, 1);
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
