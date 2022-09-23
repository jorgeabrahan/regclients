import { clientsLS } from "../../DOM&LS/getFromNuevoRegistro/storage";

const getByName = (cName: string) => clientsLS.find(({name}) => name === cName);
const getByID = (cID: string) => clientsLS.find(({ID}) => ID === cID);
const getIndexByName = (cName: string): number => clientsLS.findIndex(({name}) => name === cName);
const getIndexByID = (cID: string): number => clientsLS.findIndex(({ID}) => ID === cID);

const remove = (index: number) => clientsLS.splice(index, 1);
const sort = () => {
    clientsLS.sort(function (a, b) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};

const saveOnLS = () => localStorage.setItem("clients", JSON.stringify(clientsLS));

export {getByName, getByID, getIndexByName, getIndexByID, remove, sort, saveOnLS};