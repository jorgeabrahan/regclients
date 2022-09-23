import { getFirestoreDoc } from "../../Firebase/custom";
import { setLivesObj } from "../../Global/livesObj";
import popup from "../../Global/popup";
import { ERRORS, UIDLS } from "../../Global/variables";

const getLivesDB = () => {
    const collection = 'vendedoras';
    getFirestoreDoc(collection, UIDLS)
        .then(({ data, exists }) => {
            exists && setLivesObj(data);
        })
        .catch((err: any) => {
            popup(ERRORS.titles.read, ERRORS.database.connectionTimedOut);
            throw new Error(err);
        });
};

export default getLivesDB;