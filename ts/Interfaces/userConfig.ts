import Category from "../Classes/Category";
import FrequentClient from "../Classes/FrequentClient";

export default interface userConfigI {
    categories: Category[],
    frequentClients: FrequentClient[]
}