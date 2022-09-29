import { formatTime } from "./functions";

const WEEK_DAYS = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
const MONTHS = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
];
const DATE = new Date();

const MONTH = MONTHS[DATE.getMonth()];
const MONTH_DAY = DATE.getDate();
const WEEK_DAY = WEEK_DAYS[DATE.getDay()];
const WEEK_DAY_INDEX = WEEK_DAYS.findIndex(weekDay => weekDay === WEEK_DAY);
const YEAR = DATE.getFullYear();
const getMonthNum = (month: string) => MONTHS.findIndex(m => m === month) + 1;
const getCompleteDate = () => `${WEEK_DAY} ${MONTH_DAY} de ${MONTH} del ${YEAR}`;
const getDateComponents = (date: string) => {
    const dateWords = date.split(' ');
    return {
        day: dateWords[0],
        dayNum: dateWords[1],
        month: dateWords[3],
        monthNum: formatTime(getMonthNum(dateWords[3])),
        year: dateWords[5]
    }
}
export default DATE;
export { WEEK_DAYS, MONTHS, MONTH, MONTH_DAY, WEEK_DAY, WEEK_DAY_INDEX, YEAR, getCompleteDate, getDateComponents };
