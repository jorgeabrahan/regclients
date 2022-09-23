import { goTo, setEditMode } from '../../Global/functions';

const handleNewLive = () => {
    setEditMode(false);
    goTo('./nuevo-registro.html');
};

const handleLogout = () => {
    localStorage.removeItem('UID');
    document.location.reload();
}

export {handleNewLive, handleLogout};
