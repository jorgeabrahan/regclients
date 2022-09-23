import { regexLetters, regexLettersNoSpaces } from '../Global/regex';
import { ERRORS } from '../Global/variables';

const isAnyInputEmpty = (form: HTMLFormElement): boolean => {
    for (let input of form) {
        if (input.tagName !== 'INPUT') continue;
        if ((input as HTMLInputElement).value.trim().length === 0) return true;
    }
    return false;
};

const formatName = (name: string) => {
    name = name.replace('  ', ' ');
    const words = name.split(' ');
    for (let word in words) {
        words[word] =
            words[word].charAt(0).toUpperCase() +
            words[word].slice(1).toLowerCase();
    }
    return words.join(' ');
};

const handleNameValidation = (name: string): string => {
    const isNameValid = regexLetters.test(name);
    if (!isNameValid) return ERRORS.submit.format.name;
    if (name.trim().split(' ').length < 2) {
        //should have two or more names
        return ERRORS.submit.clientNameLength;
    }
    return '';
};

const handleArticlesValidation = (articles: number): string => {
    if (isNaN(articles) || articles <= 0) return ERRORS.submit.format.articles;
    return '';
};

const handleTotalValidation = (amount: number, isTotal: boolean) => {
    if (isNaN(amount) || amount <= 0) {
        return isTotal ? ERRORS.submit.format.total : ERRORS.submit.format.price;
    }
    return '';
};

const handleCategoryValidation = (category: string) => {
    const isCategoryValid = regexLettersNoSpaces.test(category);
    if (!isCategoryValid) return ERRORS.submit.format.category;
    return '';
}

export {
    isAnyInputEmpty,
    formatName,
    handleNameValidation,
    handleArticlesValidation,
    handleTotalValidation,
    handleCategoryValidation
};
