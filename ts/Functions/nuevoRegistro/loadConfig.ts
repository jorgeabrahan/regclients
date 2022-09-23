import { addF, clientsOptions } from "../../DOM&LS/getFromNuevoRegistro";
import { getEditMode } from "../../Global/functions";
import { userConfig } from "../../Global/userConfig"
import createClientOption from "../../HTML/createClientOption";

const loadCategories = () => {
    const fragment = document.createDocumentFragment();
    userConfig.categories.forEach(cat => {
        const opt = document.createElement('OPTION');
        (opt as HTMLOptionElement).value = cat.category;
        opt.innerText = cat.category;
        if (cat.isPrincipal) (opt as HTMLOptionElement).selected = true;
        fragment.appendChild(opt);
    });
    addF.category.appendChild(fragment);
}

const loadFrequentClients = () => {
    const fragment = document.createDocumentFragment();
    userConfig.frequentClients.forEach((fc) => {
        const opt = document.createElement('OPTION');
        (opt as HTMLOptionElement).value = fc.name;
        opt.textContent = `${fc.name} (fc)`;
        opt.setAttribute("key", fc.ID);
        fragment.appendChild(opt);
    });
    clientsOptions.appendChild(fragment);
}

export {loadCategories, loadFrequentClients};