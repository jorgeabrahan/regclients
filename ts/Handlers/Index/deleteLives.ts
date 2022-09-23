import { btnNewLive, livesCnt, livesOptions, livesTablePage, livesTotal, zeroLivesCnt } from "../../DOM&LS/getFromIndex";
import FIRESTORE, * as DB from "../../Firebase/firestore";
import popup from "../../Global/popup";
import { ERRORS, UIDLS } from "../../Global/variables";

const afterDeletingLives = () => {
    livesCnt.innerHTML = '';
    livesTotal.textContent = '0.00';

    livesTablePage.classList.add('d-none');
    livesOptions.classList.add('d-none');

    zeroLivesCnt.classList.remove('d-none');
    zeroLivesCnt.appendChild(btnNewLive);
};

const handleDeleteLives = async () => {
    if (!confirm('¿Deseas eliminar todos los lives?')) return;
    try {
        await DB.deleteDoc(DB.doc(FIRESTORE, 'vendedoras', UIDLS));
        afterDeletingLives();
    } catch (err: any) {
        popup(ERRORS.titles.delete, ERRORS.database.connectionTimedOut);
        throw new Error(err);
    }
}

export default handleDeleteLives;