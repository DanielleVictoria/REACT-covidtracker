import React from "react";
import '../bulma/mystyles.css';
import {SocialInteraction} from "../models/SocialInteraction";
import Typeahead from "../presentational-components/Typeahead";
import {useSelector} from "react-redux";
import {getAllNames} from "../filters/SocialInteractionsFilters";
import {generalFormValidator} from "../validators/GeneralFormValidator";
import useForm from "../hooks/useForm";
import {StoreState} from "../redux/reducers/StoreState";

type Props = {
    handleClose: () => void;
    handleSubmit: (socialInteraction: SocialInteraction) => void;
};

const SocialInteractionForm: React.FC<Props> = (props: Props) => {

    const {
        clearTypeahead,
        showValidationMessage,
        handleInputChange,
        formData,
        setFormData,
        resetForm,
        isFormValid,
    } = useForm({
        name : '',
        date: '',
        hours: 0,
        isSocialDistancing : false,
    });

    /** Displayed dropdown options for the name */
    const nameOptions = useSelector<StoreState>(
        (state) => getAllNames(state.socialInteractions)
    ) as string[];

    const handleSubmit = () => {
        if (!isFormValid(generalFormValidator)) return;
        props.handleSubmit({...formData, date: new Date(formData.date)});
        resetForm();
        props.handleClose();
    }

    const handleClose = () => {
        resetForm();
        props.handleClose();
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
                            setFormData({...formData, name: str})
                        }}
                        visibilityLength={2}
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
                                value={formData.date}
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
                                value={formData.hours}
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
                        checked={formData.isSocialDistancing}
                        type="checkbox"/> Is Social Distancing Observed?
                </label>
            </div>

            {/*------------- BUTTON CONTROLS -------------*/}
            <div className="field is-grouped is-pulled-right">
                <div className="control mt-1 mb-2">
                    <button onClick={handleClose} type="button" className="button is-danger">Cancel</button>
                </div>
                <div className="control mt-1 mb-2">
                    <button onClick={handleSubmit} type="button" className="button is-success">Save</button>
                </div>
            </div>

        </form>
    );

}

export default SocialInteractionForm;
