'use strict';

const firebaseConfig = {
    apiKey: "AIzaSyCG8k2lfzQQ04Rso8lQ0jmqjgd3lK7-Q5U",
    authDomain: "lives-tool.firebaseapp.com",
    projectId: "lives-tool",
    storageBucket: "lives-tool.appspot.com",
    messagingSenderId: "747025863039",
    appId: "1:747025863039:web:4c4a873687fe07b0650a4a"
};

export const fbApp = firebase.initializeApp(firebaseConfig);
export const fbStore = firebase.firestore();
export const date = new Date();

/* Constante para establecer formato de moneda a los valores en lempiras */
export const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});
/* --------------------------------------------------------------------- */