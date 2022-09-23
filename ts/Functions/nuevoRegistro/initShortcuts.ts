import { btnShowShortcuts } from "../../DOM&LS/getFromNuevoRegistro";
import { setShortcutsLS, shortcutsLS } from "../../Global/shortcuts";
import { WIDTH } from "../../Global/variables";

const initShortcuts = () => {
    if (WIDTH < 1024) btnShowShortcuts.setAttribute('disabled', '');
    if (shortcutsLS === "") setShortcutsLS(true);
}

export default initShortcuts;