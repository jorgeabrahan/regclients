import { btnPrintLivesTable, livesCnt, livesTable, livesTableCnt, livesTotalCnt, livesTotalP } from '../../DOM&LS/getFromIndex';
import { print } from '../../Global/functions';

const handlePrintLivesTable = () => {
    livesTotalCnt.appendChild(livesTotalP); //Default lives total container
    const confMsg = '¿Desea mostrar el total de la semana en la tabla?';
    if (confirm(confMsg)) livesTable.appendChild(livesTotalP);
    print();
};

const handleToggleLivesView = () => {
    livesTableCnt.classList.toggle('d-none');
    livesCnt.classList.toggle('d-none');
    btnPrintLivesTable.toggleAttribute('disabled');

    livesTotalCnt.appendChild(livesTotalP);
}

export {handlePrintLivesTable, handleToggleLivesView};
