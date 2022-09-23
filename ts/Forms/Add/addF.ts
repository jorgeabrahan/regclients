import Client from '../../Classes/Client';
import Registry from '../../Classes/Registry';
import { addF, addMsg } from '../../DOM&LS/getFromNuevoRegistro';
import { clientsLS } from '../../DOM&LS/getFromNuevoRegistro/storage';
import { getByName } from '../../Functions/nuevoRegistro/clientsArray';
import { newClient, updateAllAndSave } from '../../Functions/nuevoRegistro/clientsDOM';
import sortLiveClients from '../../Functions/nuevoRegistro/sortLiveClients';
import { createID } from '../../Global/functions';
import { ERRORS, FORMATTER } from '../../Global/variables';
import { formatName, isAnyInputEmpty } from '../validateForms';

const afterAdd = () => {
    addF.reset();
    addF.clientName.focus();
    sortLiveClients();
    updateAllAndSave();
};

const updateClientDOM = (ID: string, total: number, articles: number) => {
    const clientCnt = document.getElementById(ID) as HTMLDivElement;
    const totalHTML = clientCnt.querySelector('.table__row--total') as HTMLSpanElement;
    totalHTML.textContent = FORMATTER.format(total);
    const articlesHTML = clientCnt.querySelector('.table__row--articles') as HTMLSpanElement;
    articlesHTML.textContent = articles.toString();
};

const ifClientExists = (
    name: string,
    price: number,
    amount: number,
    category: string
): boolean => {
    const existingClient = getByName(name);
    if (!existingClient) return false; //if client does not exist
    const { ID, total, articles } = existingClient;

    for (let client of clientsLS) {
        if (client.name !== name) continue;

        const totalPrice = price * amount;
        client.total = total + totalPrice;

        client.articles += amount;

        for (let i = 0; i < amount; i++) client.registry.push(new Registry(price, false, category));
        break;
    }

    updateClientDOM(ID, total, articles);
    afterAdd();
    return true;
};

const ifClientNotExists = (name: string, price: number, articles: number, category: string) => {
    const total = price * articles;
    const client = new Client(name, createID(), articles, total, false, []);

    for (let i = 0; i < articles; i++) client.registry.push(new Registry(price, false, category));

    clientsLS.push(client);
    newClient(client.ID, name, price, articles, false);
    afterAdd();
};

const handleAddSubmit = () => {
    const name = formatName(addF.clientName.value.trim());
    const price = addF.price.valueAsNumber;
    const amount = Number(addF.amount.value);
    const category = addF.category.value;

    if (isAnyInputEmpty(addF)) {
        addMsg.textContent = ERRORS.submit.emptyFields;
        return;
    }

    if (ifClientExists(name, price, amount, category)) return;
    ifClientNotExists(name, price, amount, category);
};

export default handleAddSubmit;
