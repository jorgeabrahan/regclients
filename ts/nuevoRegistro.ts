import { ERRORS, UIDLS } from './Global/variables';
import {
    addF,
    addMsg,
    btnClearLive,
    btnDeleteRegistry,
    btnExitEdit,
    btnPrintLive,
    btnSaveLive,
    btnShowShortcuts,
    editF,
    editMsg,
    shortcutsM
} from './DOM&LS/getFromNuevoRegistro';
import { goTo, print } from './Global/functions';
import handleNuevoRegistroLoad from './Handlers/nuevoRegistro/pageLoad';
import { clientsLS } from './DOM&LS/getFromNuevoRegistro/storage';
import popup from './Global/popup';
import { handleClearLive, handleDeleteRegistry, handleExitEditMode, handleShortcuts } from './Handlers/nuevoRegistro/others';
import {
    handleTotalValidation,
    handleNameValidation,
} from './Forms/validateForms';
import handleEditSubmit from './Forms/Edit/editF';
import handleAddSubmit from './Forms/Add/addF';
import handleSaveLive from './Handlers/nuevoRegistro/saveLive';
import initShortcuts from './Functions/nuevoRegistro/initShortcuts';
import { loadUserConfigDB, userConfig } from './Global/userConfig';
import { loadCategories, loadFrequentClients } from './Functions/nuevoRegistro/loadConfig';

window.onload = () => {
    !UIDLS && goTo('./index.html'); //if user isn't logged
    handleNuevoRegistroLoad();

    btnExitEdit.addEventListener('click', () => {
        handleExitEditMode();
    });

    editF.addEventListener('submit', (e) => {
        e.preventDefault();
        if (editMsg.textContent !== '') return; //if there's an error
        handleEditSubmit();
    });
    editF.newName.addEventListener('input', () => {
        editMsg.textContent = handleNameValidation(editF.newName.value);
    });

    addF.addEventListener('submit', (e) => {
        e.preventDefault();
        if (addMsg.textContent !== '') return; //if there's an error
        handleAddSubmit();
    });
    addF.clientName.addEventListener('input', () => {
        addMsg.textContent = handleNameValidation(addF.clientName.value);
    });
    addF.price.addEventListener('input', () => {
        addMsg.textContent = handleTotalValidation(
            addF.price.valueAsNumber,
            false
        );
    });

    btnClearLive.addEventListener('click', () => {
        const msg = "Se eliminara todo el contenido del live, ¿deseas continuar?";
        if (!confirm(msg)) return;
        handleClearLive();
    });
    
    btnPrintLive.addEventListener('click', () => {
        if (clientsLS.length === 0) {
            popup(ERRORS.titles.print, ERRORS.noClients);
            return;
        }
        print();
    });

    btnSaveLive.addEventListener('click', () => handleSaveLive());
    
    initShortcuts();
    btnShowShortcuts.addEventListener('click', () =>
        shortcutsM.classList.remove('d-none')
    );
    document.addEventListener('keydown', (e) => {
        handleShortcuts(e.altKey, e.code);
    });

    btnDeleteRegistry.addEventListener('click', () => {
        handleDeleteRegistry();
    });

    loadUserConfigDB(() => {
        loadFrequentClients();
        loadCategories();
    });
};

