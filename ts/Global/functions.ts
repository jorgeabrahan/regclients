import Client from '../Classes/Client';
import DATE from './date';

const createID = () => {
    let ID = '';
    let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 62; i++) {
        ID += characters.charAt(Math.floor(Math.random() * 62));
    }
    return ID;
};

const formatTime = (time: number | string) => time.toString().length === 1 ? `0${time}` : time;

const sortByName = (array: Client[]) => {
    array.sort((a, b) => {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
    });
};

const print = () => {
    try {
        //Print on safari
        if (!document.execCommand('print', false, undefined)) {
            window.print();
        }
    } catch {
        window.print();
    }
};

const setEditMode = (mode: boolean) => {
    localStorage.setItem('edit', `${mode}`);
};
const getEditMode = (): boolean => {
    return localStorage.getItem('edit') === 'true';
};
const goTo = (href: string) => {
    window.location.href = href;
};
const getTime = () =>
    `${formatTime(DATE.getHours())}:${formatTime(DATE.getMinutes())}`;
const getCurrentTime = () => {
    const date = new Date();
    return `${formatTime(date.getHours())}:${formatTime(date.getMinutes())}`;
}

export {
    createID,
    formatTime,
    sortByName,
    print,
    setEditMode,
    getEditMode,
    goTo,
    getTime,
    getCurrentTime,
};
