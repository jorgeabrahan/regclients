import Category from "../../Classes/Category";
import { addCategoryF, addCategoryMsg, categoriesCnt } from "../../DOM&LS/getFromIndex";
import { createID } from "../../Global/functions";
import { categoryExists, getCategoryIndex, removeCategory, setCategory, setPrincipalCategory, userConfig } from "../../Global/userConfig";

const showCategoriesUI = () => {
    categoriesCnt.innerHTML = '';
    const fragment = document.createDocumentFragment();
    userConfig.categories.forEach((cat) => {
        const catP = document.createElement('P');
        catP.className = `c-pointer brdr-round d-flex ai-center fjc-space-between brdr-w-2 brdr-s-solid brdr-c-white pdng-0-5 ${cat.isPrincipal ? 'bg-contrast' : ''}`;
        catP.innerHTML = `
            <span class="c-pointer">${cat.category}</span>
            <button class="btn as-link">
                <span class="material-symbols-outlined">
                    delete
                </span>
            </button>
            `;
        fragment.appendChild(catP);
        catP.addEventListener('click', () => {
            if (catP.classList.contains('bg-contrast')) return;
            setPrincipalCategory(cat.ID);
            showCategoriesUI();
        })
        catP.querySelector('button')?.addEventListener('click', e => {
            e.stopPropagation();
            removeCategory(getCategoryIndex(cat.ID));
            showCategoriesUI();
        });
    });
    categoriesCnt.appendChild(fragment);
};

const handleAddCategorySubmit = () => {
    if(addCategoryF.category.value.trim().length === 0) {
        addCategoryMsg.textContent = 'No puedes agregar una categoria vacía.';
    }
    if(categoryExists(addCategoryF.category.value)) {
        addCategoryMsg.textContent = 'La categoria que quieres agregar ya existe.';
    }
    if (addCategoryMsg.textContent !== '') return;

    const category = addCategoryF.category.value.trim().toLowerCase();
    setCategory(new Category(category, false, createID()));
    showCategoriesUI();
    addCategoryF.reset();
};

export default handleAddCategorySubmit;
export {showCategoriesUI};