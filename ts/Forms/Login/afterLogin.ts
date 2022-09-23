import { livesOptions, livesCnt, livesTablePage, loginPage, zeroLivesCnt, livesTotal, btnNewLive } from "../../DOM&LS/getFromIndex";
import {getFirestoreDoc} from "../../Firebase/custom";
import { WEEK_DAYS, WEEK_DAY_INDEX } from "../../Global/date";
import { getLives, setLivesObj } from "../../Global/livesObj";
import popup from "../../Global/popup";
import { FORMATTER } from "../../Global/variables";
import createLive from "../../HTML/createLive";
import createLivesMergedTable from "./createLivesMergedTable";

const getLiveDayFromDate = (date: string) => date.split(' ')[0];
const getDayIndex = (day: string) => WEEK_DAYS.findIndex((weekDay) => day === weekDay)

const isNewWeek = (): boolean => {
    if (WEEK_DAY_INDEX !== 1 || getLives().length === 0) return false;

    //if it's Monday and user have previous lives
    let livePastWeekExists = false;
    for (let live of getLives()) {
        if (getDayIndex(getLiveDayFromDate(live.date)) === 1) continue;
        //if there's a live from a day different than Monday
        livePastWeekExists = true;
        break;
    }
    return livePastWeekExists;
};

const ifNewWeek = () => {
    if (!isNewWeek()) return;
    const alertMsg = `
        Para dar inicio a esta nueva semana asegurate de eliminar todo el registro de la semana anterior dando clic en el boton "Eliminar todo".
        `;
    popup("Inicio de semana", alertMsg)
}

const showLivesUI = () => {
    let total = 0;
    const fragment = document.createDocumentFragment();
    getLives().forEach((live) => {
        fragment.appendChild(createLive(live));
        total += live.total;
    });
    livesCnt.appendChild(fragment);
    livesTotal.textContent = FORMATTER.format(total);
};

const afterFetchingLives = () => {
    //if user has no previous lives
    if (getLives().length === 0) {
        zeroLivesCnt.classList.remove('d-none');
        zeroLivesCnt.appendChild(btnNewLive);
        return;
    }

    livesTablePage.classList.remove('d-none');
    livesOptions.classList.remove('d-none');
    livesOptions.prepend(btnNewLive);

    showLivesUI();
    createLivesMergedTable();
    ifNewWeek();
};


const afterLogin = (UID: string) => {
    loginPage.classList.add('d-none'); //hide login page
    //get user lives
    const collection = 'vendedoras'; 
    getFirestoreDoc(collection, UID)
        .then(({ data, exists }) => {
            if (exists) setLivesObj(data); 
            afterFetchingLives();
        })
        .catch((err) => {
            const errMsg = `
                Lo sentimos pero no nos pudimos comunicar con la base de datos para obtener tu información.<br />
                RECOMENDACIONES:<br />
                - Asegurate de estar conectad@ al internet<br />
                - Asegurate que el internet no este fallando<br />
                - Prueba en otro momento<br />
                `;
            popup("Error al obtener información", errMsg);
            throw new Error(err);
        });
};

export default afterLogin;