// TODO : Should I implement this as an interface instead?
export class SocialInteraction {

    _id: string;
    name : string;
    date: Date;
    hours: number;
    isSocialDistancing : boolean;

    constructor() {
        this._id = '';
        this.name = '';
        this.date = new Date();
        this.hours = 0;
        this.isSocialDistancing = false;
    }

}
