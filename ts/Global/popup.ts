import { btnCloseM, cntM, descM, titleM } from '../DOM&LS/getModal';

let timeOutID: number | ReturnType<typeof setTimeout> = -1;
const fadePopup = () => {
    cntM.style.opacity = '0';
    cntM.addEventListener('transitionend', () => {
        cntM.classList.add('d-none');
        cntM.removeEventListener('transitionend', fadePopup);
    });
};
const closePopup = () => {
    fadePopup();
    timeOutID !== -1 && clearTimeout(timeOutID);
};
cntM.addEventListener('click', () => {
    closePopup();
});
//modal content
cntM.firstElementChild?.addEventListener('click', e => {
    e.stopPropagation();
});
btnCloseM.addEventListener('click', () => {
    closePopup();
});
const popup = (title: string, desc: string, timeOut = 10000) => {
    titleM.innerHTML = title;
    descM.innerHTML = desc;
    cntM.classList.remove('d-none');
    cntM.style.opacity = '1';
    timeOutID = setTimeout(() => {
        closePopup();
    }, timeOut);
};

export default popup;