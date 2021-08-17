import React, {useEffect} from "react";
import '../bulma/mystyles.css';
import {useSelector} from "react-redux";
import {StoreState} from "../redux/StoreState";
import {generalFormValidator} from "../validators/GeneralFormValidator";
import Typeahead from "../presentational-components/Typeahead";
import {VisitedPlace} from "../models/VisitedPlace";
import useForm from "../hooks/useForm";
import {getAllPlaces} from "../filters/VisitedPlacesFilters";

type Props = {
    handleClose: () => void;
    handleSubmit: (socialInteraction: VisitedPlace) => void;
};

const VisitedPlaceForm: React.FC<Props> = (props: Props) => {

    const {
        clearTypeahead,
        showValidationMessage,
        handleInputChange,
        formData,
        setFormData,
        resetForm,
        isFormValid,
    } = useForm({
        place: '',
        date: '',
        hours: 0,
        isCrowded: false,
    });

    /** Displayed dropdown options for the name */
    const placeOptions = useSelector<StoreState>(
        (state) => getAllPlaces(state.visitedPlaces)
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

            {/*------------- PLACE -------------*/}
            <div className="field">
                <label className="label">Place</label>
                <div className="control is-expanded">
                    <Typeahead
                        clear={clearTypeahead}
                        options={placeOptions}
                        onValueChange={(str) => {
                            setFormData({...formData, place: str})
                        }}
                        visibilityLength={2}
                    />
                </div>
                {showValidationMessage('place')}

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

            {/*------------- CROWDED -------------*/}
            <div className="field">
                <label className="checkbox">
                    <input
                        name="isCrowded"
                        onChange={handleInputChange}
                        checked={formData.isCrowded}
                        type="checkbox"/> Is Crowded?
                </label>
            </div>

            {/*------------- BUTTON CONTROLS -------------*/}
            <div className="field is-grouped is-pulled-right">
                <div className="control mt-1">
                    <button onClick={handleClose} type="button" className="button is-danger">Cancel</button>
                </div>
                <div className="control mt-1">
                    <button onClick={handleSubmit} type="button" className="button is-success">Save</button>
                </div>
            </div>

        </form>
    );

}

export default VisitedPlaceForm;
