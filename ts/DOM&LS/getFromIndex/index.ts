const zeroLivesCnt = document.getElementById('zeroLivesCnt') as HTMLElement; 
const livesCnt = document.getElementById('livesCnt') as HTMLElement; //section element

const livesTotalCnt = document.getElementById('livesTotalCnt') as HTMLDivElement;
const livesTotal = document.getElementById('livesTotal') as HTMLSpanElement;
const livesTotalP = livesTotal.parentElement as HTMLParagraphElement;

const livesTablePage = document.getElementById('livesTablePage') as HTMLDivElement;
const livesTableCnt = document.getElementById('livesTableCnt') as HTMLElement;
const livesTable = document.getElementById('livesTable') as HTMLDivElement;
const btnPrintLivesTable = document.getElementById('btnPrintLivesTable') as HTMLButtonElement;
const btnToggleLivesView = document.getElementById('btnToggleLivesView') as HTMLButtonElement;

const livesOptions = document.getElementById('livesOptions') as HTMLElement; //section element
const weekAmount = document.getElementById('weekAmount') as HTMLSpanElement;

const loginPage = document.querySelector('.login') as HTMLDivElement;
const loginF = document.getElementById('loginF') as HTMLFormElement;
const loginFMsg = document.getElementById('loginFMsg') as HTMLParagraphElement;

const btnNewLive = document.getElementById('btnNewLive') as HTMLButtonElement;
const btnDeleteLives = document.getElementById('btnDeleteLives') as HTMLButtonElement;
const btnLogout = document.getElementById('btnLogout') as HTMLButtonElement;
const settingsM = document.getElementById('settingsM') as HTMLDivElement;
const btnShowSettings = document.getElementById('btnShowSettings') as HTMLButtonElement;

const addCategoryF = document.getElementById('addCategoryF') as HTMLFormElement;
const addCategoryMsg = document.getElementById('addCategoryMsg') as HTMLParagraphElement;
const categoriesCnt = document.getElementById('categoriesCnt') as HTMLDivElement;
const addFrequentClientF = document.getElementById('addFrequentClientF') as HTMLFormElement;
const addFrequentClientMsg = document.getElementById('addFrequentClientMsg') as HTMLParagraphElement;
const frequentClientsCnt = document.getElementById('frequentClientsCnt') as HTMLDivElement;
const toggleShortcuts = document.getElementById('toggleShortcuts') as HTMLInputElement;
const btnSaveUserConfig = document.getElementById('btnSaveUserConfig') as HTMLButtonElement;

export {livesCnt, zeroLivesCnt, livesTotalCnt, livesTotalP, livesTotal, livesTablePage, livesTableCnt, livesTable, btnPrintLivesTable, btnToggleLivesView, livesOptions, loginPage, weekAmount, loginF, loginFMsg, btnNewLive, btnDeleteLives, btnLogout, settingsM, btnShowSettings, addCategoryF, addCategoryMsg, categoriesCnt, addFrequentClientF, addFrequentClientMsg, frequentClientsCnt, toggleShortcuts, btnSaveUserConfig};