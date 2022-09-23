import Client from "./Client";

export default class Live {
    constructor(
        public date: string,
        public ID: string,
        public startTime: string,
        public endTime: string,
        public total: number,
        public articlesAmount: number,
        public clientsAmount: number,
        public bestBuyer: Client,
        public clients: Client[]
    ) {

    }
}