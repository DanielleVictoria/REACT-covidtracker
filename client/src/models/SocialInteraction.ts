export class SocialInteraction {

    name : string;
    date: Date;
    hours: number;
    isSocialDistancing : boolean;

    constructor() {
        this.name = '';
        this.date = new Date();
        this.hours = 0;
        this.isSocialDistancing = false;
    }

}
