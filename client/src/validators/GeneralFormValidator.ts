import {ValidatorReturnObject} from "../models/ValidatorReturnObject";
import {ValidatorMessage} from "../models/ValidatorMessage";
import {getDateWithoutTimestamp} from "../services/DateHelperService";

export const generalFormValidator = (interaction: any): ValidatorReturnObject => {

    let isValid = true;
    let messages: ValidatorMessage[] = [];

    // Check if all fields have values
    for (let property in interaction) {
        if (interaction.hasOwnProperty(property)) {
            if (interaction[property] === '') {
                isValid = false;
                messages.push({property, message: 'Field is required'});
            }
        }
    }

    // Invalid hours
    if (interaction.hours < 0) {
        isValid = false;
        messages.push({property: 'hours', message: 'Number of hours is invalid'});
    }

    // Invalid date
    if (getDateWithoutTimestamp(new Date(interaction.date)) > getDateWithoutTimestamp(new Date())) {
        isValid = false;
        messages.push({property: 'date', message: 'Date is invalid'});
    }

    return {isValid, messages};
}
