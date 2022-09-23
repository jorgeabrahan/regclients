import FrequentClient from "../../Classes/FrequentClient";
import { addFrequentClientF, addFrequentClientMsg, frequentClientsCnt } from "../../DOM&LS/getFromIndex";
import { createID } from "../../Global/functions";
import { frequentClientExists, getFrequentClientIndex, removeFrequentClient, saveUserConfigDB, setFrequentClient, userConfig } from "../../Global/userConfig";
import { formatName } from "../validateForms";

const showFrequentClientsUI = () => {
    frequentClientsCnt.innerHTML = '';
    const fragment = document.createDocumentFragment();
    userConfig.frequentClients.forEach(fc => {
        const fcP = document.createElement('P');
        fcP.className = "brdr-round d-flex ai-center fjc-space-between brdr-w-2 brdr-s-solid brdr-c-white pdng-0-5";
        fcP.innerHTML = `
            <span>${fc.name}</span>
            <button class="btn as-link">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
        `;
        fcP.querySelector('button')?.addEventListener('click', () => {
            removeFrequentClient(getFrequentClientIndex(fc.ID));
            showFrequentClientsUI();
        })
        fragment.appendChild(fcP);
    });
    frequentClientsCnt.appendChild(fragment);
}

const handleAddFrequentClientSubmit = () => {
    if (addFrequentClientF.frequentClient.value.trim().length === 0) {
        addFrequentClientMsg.textContent = 'No puedes agregar un cliente sin nombre.';
    }
    const frequentClient = formatName(addFrequentClientF.frequentClient.value.trim());
    if (frequentClientExists(frequentClient)) {
        addFrequentClientMsg.textContent = 'El cliente que quieres agregar ya existe.';
    }
    if (addFrequentClientMsg.textContent !== '') return;

    setFrequentClient(new FrequentClient(frequentClient, createID()));
    showFrequentClientsUI();
    addFrequentClientF.reset();
}

export default handleAddFrequentClientSubmit;
export {showFrequentClientsUI};