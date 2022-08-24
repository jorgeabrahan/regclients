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

// Number formatter
const FORMATTER = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

let livesObj = { lives: [] };
const setLivesObj = (newLivesObj) => (livesObj = newLivesObj);

export { WEEK_DAYS, MONTHS, DATE, FORMATTER, livesObj, setLivesObj };
