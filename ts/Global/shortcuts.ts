const shortcutsLS = localStorage.getItem('shortcuts') || "";
const setShortcutsLS = (enabled: boolean) => localStorage.setItem("shortcuts", `${enabled}`); 
const getShortcutsLS = (): boolean => localStorage.getItem('shortcuts') === 'true';

export {shortcutsLS, setShortcutsLS, getShortcutsLS};