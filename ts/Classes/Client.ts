import Registry from "./Registry";

export default class Client {
    constructor(
        public name: string,
        public ID: string,
        public articles: number,
        public total: number,
        public checked: boolean,
        public registry: Registry[]
    ) {

    }
}