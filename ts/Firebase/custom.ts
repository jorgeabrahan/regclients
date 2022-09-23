import { livesObj } from "../Global/livesObj";
import { UIDLS } from "../Global/variables";
import docInfoI from "../Interfaces/docInfo";
import AUTH, * as auth from "./auth";
import FIRESTORE, * as DB from './firestore';

const getFirestoreDoc = (collection: string, document: string): Promise<docInfoI> => {
    return new Promise(async (resolve, reject) => {
        try {
            const docRef = DB.doc(FIRESTORE, collection, document);
            const doc = await DB.getDoc(docRef);
            resolve({
                data: doc.data(),
                exists: doc.exists(),
            });
        } catch (err: any) {
            reject(err);
        }
    });
};

const signIn = (email: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        auth.signInWithEmailAndPassword(AUTH, email, password)
        .then((userCredential: any) => {
            const UID = userCredential.user.uid;
            resolve(UID);
        })
        .catch((err: any) => {
            reject(err.code.split('/')[1]);
        })
    })
}

const saveLivesDB = (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const docRef = DB.doc(FIRESTORE, 'vendedoras', UIDLS);
        try {
            await DB.setDoc(docRef, JSON.parse(JSON.stringify(livesObj)));
            resolve('succeeded');
        } catch (err: any) {
            reject(err);
        }
    })
};

export { getFirestoreDoc, signIn, saveLivesDB };