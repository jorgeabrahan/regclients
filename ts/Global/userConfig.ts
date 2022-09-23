import Category from '../Classes/Category';
import FrequentClient from '../Classes/FrequentClient';
import userConfigI from '../Interfaces/userConfig';
import FIRESTORE, * as DB from '../Firebase/firestore';
import { ERRORS, UIDLS } from './variables';
import { getFirestoreDoc } from '../Firebase/custom';
import popup from './popup';

let userConfig: userConfigI = {
    categories: [],
    frequentClients: [],
};

const loadUserConfigDB = (afterLoad: Function) => {
    getFirestoreDoc('userConfig', UIDLS).then(({data, exists}) => {
        if (exists) userConfig = data;
        afterLoad();
    }).catch((err) => {
        popup(ERRORS.titles.read, ERRORS.database.connectionTimedOut);
        throw new Error(err);
    });
}

const getCategoryIndex = (ID: string) =>
    userConfig.categories.findIndex((cat) => cat.ID === ID);
const getFrequentClientIndex = (ID: string) =>
    userConfig.frequentClients.findIndex((fc) => fc.ID === ID);

const categoryExists = (category: string) =>
    userConfig.categories.findIndex((cat) => cat.category === category) !== -1;

const setCategory = (category: Category) => {
    userConfig.categories.push(category);
};
const setPrincipalCategory = (ID: string) => {
    userConfig.categories.forEach((cat) => {
        if (cat.ID === ID) cat.isPrincipal = true;
        else cat.isPrincipal = false;
    });
};
const getCategory = (ID: string) =>
    userConfig.categories.find((cat) => cat.ID === ID);
const removeCategory = (index: number) => {
    userConfig.categories.splice(index, 1);
};
const frequentClientExists = (name: string) =>
    userConfig.frequentClients.findIndex((fc) => fc.name === name) !== -1;
const setFrequentClient = (frequentClient: FrequentClient) => {
    userConfig.frequentClients.push(frequentClient);
};
const getFrequentClient = (ID: string) =>
    userConfig.frequentClients.find((fc) => fc.ID === ID);
const removeFrequentClient = (index: number) => {
    userConfig.frequentClients.splice(index, 1);
};

const saveUserConfigDB = ():Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const docRef = DB.doc(FIRESTORE, 'userConfig', UIDLS);
        try {
            await DB.setDoc(docRef, JSON.parse(JSON.stringify(userConfig)));
            resolve('succeeded');
        } catch(err: any) {
            reject(err);
        }
    });
}

export {
    userConfig,
    loadUserConfigDB,
    getCategoryIndex,
    getFrequentClientIndex,
    categoryExists,
    setCategory,
    setPrincipalCategory,
    getCategory,
    removeCategory,
    frequentClientExists,
    setFrequentClient,
    getFrequentClient,
    removeFrequentClient,
    saveUserConfigDB
};
