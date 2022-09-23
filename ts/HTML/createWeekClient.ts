import Client from "../Classes/Client";
import { FORMATTER } from "../Global/variables";

const createWeekClient = ({name, articles, total}: Client) => {
    const clientDiv = document.createElement("DIV");
    clientDiv.className = "table__row";
    clientDiv.innerHTML = `
        <p class="d-flex fjc-space-between">
            <span>${name}</span>
            <span>( <span class="table__row--articles">${articles}</span> )</span>
        </p>
        <p>HNL <span>${FORMATTER.format(total)}</span></p>
    `;
    return clientDiv;
};

export default createWeekClient;