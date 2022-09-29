import {
    loginF,
    btnNewLive,
    btnLogout,
    btnDeleteLives,
    btnPrintLivesTable,
    btnToggleLivesView,
    btnShowSettings,
    settingsM,
    toggleShortcuts,
    addCategoryF,
    addCategoryMsg,
    addFrequentClientF,
    addFrequentClientMsg,
    btnSaveUserConfig,
} from './DOM&LS/getFromIndex';
import handleAddCategorySubmit from './Forms/AddCategory/addCategoryF';
import handleAddFrequentClientSubmit from './Forms/AddFrequentClient/addFrequentClientF';
import afterLogin from './Forms/Login/afterLogin';
import handleFormLogin from './Forms/Login/form';
import {
    handleCategoryValidation,
    handleNameValidation,
} from './Forms/validateForms';
import popup from './Global/popup';
import { getShortcutsLS, setShortcutsLS } from './Global/shortcuts';
import { saveUserConfigDB } from './Global/userConfig';
import { ERRORS, UIDLS } from './Global/variables';
import handleDeleteLives from './Handlers/Index/deleteLives';
import {
    handlePrintLivesTable,
    handleToggleLivesView,
} from './Handlers/Index/livesTable';
import { handleLogout, handleNewLive } from './Handlers/Index/others';

window.onload = () => {
    /* if user is already logged */
    UIDLS && afterLogin(UIDLS);

    loginF.addEventListener('submit', (e) => {
        e.preventDefault();
        handleFormLogin();
    });
    btnLogout.addEventListener('click', () => {
        handleLogout();
    });
    btnNewLive.addEventListener('click', () => {
        handleNewLive();
    });
    btnToggleLivesView.addEventListener('click', () => {
        handleToggleLivesView();
    });
    btnPrintLivesTable.setAttribute('disabled', '');
    btnPrintLivesTable.addEventListener('click', () => {
        handlePrintLivesTable();
    });
    btnDeleteLives.addEventListener('click', () => {
        btnDeleteLives.style.pointerEvents = 'none';
        handleDeleteLives();
    });
    btnShowSettings.addEventListener('click', () => {
        settingsM.classList.remove('d-none');
    });
    
    addCategoryF.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddCategorySubmit();
    });
    addCategoryF.category.addEventListener('input', () => {
        addCategoryMsg.textContent = handleCategoryValidation(
            addCategoryF.category.value
        );
    });

    addFrequentClientF.addEventListener('submit', (e) => {
        e.preventDefault();
        handleAddFrequentClientSubmit();
    });
    addFrequentClientF.frequentClient.addEventListener('input', () => {
        addFrequentClientMsg.textContent = handleNameValidation(
            addFrequentClientF.frequentClient.value
        );
    });

    if (getShortcutsLS()) toggleShortcuts.checked = true;
    toggleShortcuts.addEventListener('change', () => {
        setShortcutsLS(toggleShortcuts.checked);
    });

    btnSaveUserConfig.addEventListener('click', () => {
        saveUserConfigDB().then(() => {
            settingsM.classList.add('d-none');
        }).catch(err => {
            popup(ERRORS.titles.save, ERRORS.database.connectionTimedOut);
            throw new Error(err);
        });
    });
};
