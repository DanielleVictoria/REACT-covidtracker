import {ValidatorMessage} from "./ValidatorMessage";

export interface ValidatorReturnObject {
    isValid: boolean;
    messages: ValidatorMessage[];
}
