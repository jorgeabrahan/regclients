const liveDate = document.getElementById('liveDate') as HTMLParagraphElement;
const liveTotal = document.getElementById('liveTotal') as HTMLSpanElement;
const clientsCnt = document.getElementById("clientsCnt") as HTMLDivElement;
const clientsOptions = document.getElementById("clientsOptions") as HTMLDataListElement;
const clientsAmount = document.getElementById('clientsAmount') as HTMLSpanElement;

const addF = document.getElementById('addF') as HTMLFormElement;
const addMsg = document.getElementById('addMsg') as HTMLParagraphElement;

const editM = document.getElementById("editM") as HTMLDivElement;
const editF = document.getElementById("editF") as HTMLFormElement;
const editMsg = document.getElementById("editMsg") as HTMLParagraphElement;
const {newName, newArticles, newTotal} = editF;

const registryM = document.getElementById('registryM') as HTMLDivElement;
const registryMTitle = document.getElementById('registryMTitle') as HTMLTitleElement;
const registry = document.getElementById('registry') as HTMLDivElement;
const btnDeleteRegistry = document.getElementById('btnDeleteRegistry') as HTMLButtonElement;

const btnExitEdit = document.getElementById('btnExitEdit') as HTMLButtonElement;
const btnClearLive = document.getElementById('btnClearLive') as HTMLButtonElement;
const btnPrintLive = document.getElementById('btnPrintLive') as HTMLButtonElement;
const btnSaveLive = document.getElementById('btnSaveLive') as HTMLButtonElement;
const shortcutsM = document.getElementById('shortcutsM') as HTMLDivElement;
const btnShowShortcuts = document.getElementById('btnShowShortcuts') as HTMLButtonElement;

export { liveDate, liveTotal, clientsCnt, clientsOptions, clientsAmount, addF, addMsg, editM, editF, editMsg, newName, newArticles, newTotal, registryM, registryMTitle, registry, btnDeleteRegistry, btnExitEdit, btnClearLive, btnPrintLive, btnSaveLive, shortcutsM, btnShowShortcuts};