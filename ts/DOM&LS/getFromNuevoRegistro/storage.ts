import Client from "../../Classes/Client";

const liveToEdit = JSON.parse(localStorage.getItem('editLive') || '{}');
const dateLS = localStorage.getItem('date') || "";
const getDateLS = () => localStorage.getItem('date') || "";
const timeStartLS = localStorage.getItem('timeStart') || "";
const getTimeStartLS = () => localStorage.getItem('timeStart') || "";

let clientsLS: Client[] = JSON.parse(localStorage.getItem("clients") || "[]");
const setClientsLS = (newClients: Client[]) => (clientsLS = newClients);

export {liveToEdit, dateLS, getDateLS, timeStartLS, getTimeStartLS, clientsLS, setClientsLS};