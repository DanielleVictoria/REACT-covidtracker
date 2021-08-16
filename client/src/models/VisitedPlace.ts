export class VisitedPlace {

    _id: string;
    place : string;
    date: Date;
    hours: number;
    isCrowded : boolean;

    constructor() {
        this._id = '';
        this.place = '';
        this.date = new Date();
        this.hours = 0;
        this.isCrowded = false;
    }

}
