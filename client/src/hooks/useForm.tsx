import React, {useState} from "react";
import {ValidatorReturnObject} from "../models/ValidatorReturnObject";

const useForm = (initialData : any) => {

    const [formData, setFormData] = useState<any>(initialData);
    const [validationObject, setValidationObject] = useState<ValidatorReturnObject>();
    const [clearTypeahead, setClearTypeahead] = useState<boolean>(false);

    /** Handler for any input fields, except type ahead */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setFormData(
            {
                ...formData,
                [name]: value
            }
        );
    }

    const resetForm = () => {
        setValidationObject(undefined);
        setClearTypeahead(!clearTypeahead);
        setFormData(initialData);
    }

    const showValidationMessage = (name: string) => {
        if (!validationObject?.isValid) {
            const message = validationObject?.messages.find(message => message.property === name);
            return <p className="help is-danger">{message?.message}</p>
        }
    }

    const isFormValid = (validator: (data: any) => ValidatorReturnObject) : boolean => {
        const validationObject = validator(formData);
        !validationObject.isValid ? setValidationObject(validationObject) : setValidationObject(undefined);
        return validationObject.isValid;
    }

    return {
        validationObject,
        setValidationObject,
        clearTypeahead,
        setClearTypeahead,
        showValidationMessage,
        handleInputChange,
        formData,
        setFormData,
        resetForm,
        isFormValid,
    }

}

export default useForm;
