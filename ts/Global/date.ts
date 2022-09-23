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
const getCompleteDate = () => `${WEEK_DAY} ${MONTH_DAY} de ${MONTH} del ${YEAR}`;

export default DATE;
export { WEEK_DAYS, MONTHS, MONTH, MONTH_DAY, WEEK_DAY, WEEK_DAY_INDEX, YEAR, getCompleteDate };
