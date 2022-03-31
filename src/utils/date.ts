export default class CustomDate extends Date {
    constructor(date: Date) {
        super(date);
    }

    get yyyymmdd(): string {
        const mm: number = this.getMonth() + 1;
        const dd: number = this.getDate();

        return [this.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
    }
}
