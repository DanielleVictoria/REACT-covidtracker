import React, {useState} from "react";
import '../bulma/mystyles.css';
import {SocialInteraction} from "../models/SocialInteraction";
import Typeahead from "../presentational-components/Typeahead";
import {useSelector} from "react-redux";
import {StoreState} from "../redux/StoreState";
import {getAllNames} from "../filters/SocialInteractionsFilters";
import {validateSocialInteraction} from "../validators/SocialInteractionFormValidator";
import {ValidatorReturnObject} from "../models/ValidatorReturnObject";

type Props = {
    handleClose: () => void;
    handleSubmit: (socialInteraction: SocialInteraction) => void;
};

const SocialInteractionForm: React.FC<Props> = (props: Props) => {

    /** Form values */
    const [socialInteractionData, setSocialInteractionData] = useState<any>({
        name : '',
        date: '',
        hours: 0,
        isSocialDistancing : false,
    });

    const [clearTypeahead, setClearTypeahead] = useState<boolean>(false);
    const [validationObject, setValidationObject] = useState<ValidatorReturnObject>();

    /** Displayed dropdown options for the name */
    const nameOptions = useSelector<StoreState>(
        (state) => getAllNames(state.socialInteractions)
    ) as string[];

    /** Handler for any input fields, except type ahead */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setSocialInteractionData(
            {
                ...socialInteractionData,
                [name]: value
            }
        );
    }

    const handleSubmit = () => {
        const validationObject = validateSocialInteraction(socialInteractionData);
        if (!validationObject.isValid) {
            setValidationObject(validationObject);
            return;
        } else {
            setValidationObject(undefined);
        }
        props.handleSubmit({...socialInteractionData, date: new Date(socialInteractionData.date)});
        resetForm();
        props.handleClose(); // Close the modal
    }

    const handleClose = () => {
        resetForm();
        props.handleClose(); // Close the modal
    }

    const resetForm = () => {
        setValidationObject(undefined);
        setClearTypeahead(!clearTypeahead);
        setSocialInteractionData({
            name : '',
            date: '',
            hours: 0,
            isSocialDistancing : false,
        }); // Reset the form
    }

    const showValidationMessage = (name: string) => {
        if (!validationObject?.isValid) {
            const message = validationObject?.messages.find(message => message.property === name);
            return <p className="help is-danger">{message?.message}</p>
        }
    }

    return (

        <form>

            {/*------------- NAME -------------*/}
            <div className="field">
                <label className="label">Name</label>
                <div className="control is-expanded">
                    <Typeahead
                        clear = {clearTypeahead}
                        options={nameOptions}
                        onValueChange={(str) => {
                            setSocialInteractionData({...socialInteractionData, name: str})
                        }}
                        visibilityIndex={1}
                    />
                </div>
                {showValidationMessage('name')}

            </div>

            <div className="columns">

                <div className="column">
                    {/*------------- DATE -------------*/}
                    <div className="field ">
                        <label className="label">Date</label>
                        <div className="control">
                            <input
                                name="date"
                                onChange={handleInputChange}
                                value={socialInteractionData.date}
                                className="input"
                                type="date"/>
                        </div>
                        {showValidationMessage('date')}
                    </div>
                </div>

                <div className="column">
                    {/*------------- HOURS -------------*/}
                    <div className="field ">
                        <label className="label">Hours</label>
                        <div className="control">
                            <input
                                name="hours"
                                onChange={handleInputChange}
                                value={socialInteractionData.hours}
                                className="input"
                                type="number"/>
                        </div>
                        {showValidationMessage('hours')}
                    </div>
                </div>

            </div>

            {/*------------- SOCIAL DISTANCING -------------*/}
            <div className="field">
                <label className="checkbox">
                    <input
                        name="isSocialDistancing"
                        onChange={handleInputChange}
                        checked={socialInteractionData.isSocialDistancing}
                        type="checkbox"/> Is Social Distancing Observed?
                </label>
            </div>

            {/*------------- BUTTON CONTROLS -------------*/}
            <div className="field is-grouped is-pulled-right">
                <div className="control mt-5">
                    <button onClick={handleSubmit} type="button" className="button is-success">Save</button>
                </div>
                <div className="control mt-5">
                    <button onClick={handleClose} type="button" className="button is-danger">Cancel</button>
                </div>
            </div>

        </form>
    );

}

export default SocialInteractionForm;
