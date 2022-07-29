"use strict";
import * as globalVars from "./globalVars.mjs";

export const makeId = () => {
    let ID = "";
    let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 62; i++) {
        ID += characters.charAt(Math.floor(Math.random() * 62));
    }
    return ID;
};

export const allowJustLetters = (target) => {
    //Se obtiene el valor del input y su ultimo caracter
    const value = target.value;
    const valueLastChar = value[value.length - 1];
    //Solo permite ingresar letras y espacios
    if (!isNaN(Number(valueLastChar)) && valueLastChar !== " ")
        target.value = value.slice(0, value.length - 1);
};

export const allowJustNumbers = (target) => {
    //Solo permite ingresar numeros y puntos
    if (isNaN(Number(target.value)))
        target.value = target.value.slice(0, target.value.length - 1);
};

export const formatTime = (time) =>
    time.toString().length === 1 ? `0${time}` : time;

export const getCompleteDate = () => {
    const weekDay = globalVars.WEEK_DAYS[globalVars.DATE.getDay()];
    const year = globalVars.DATE.getFullYear();
    const monthDay = globalVars.DATE.getDate();
    const month = globalVars.MONTHS[globalVars.DATE.getMonth()];

    return `${weekDay} ${monthDay} de ${month} del ${year}`;
};
