import React, {useState} from "react";
import '../bulma/mystyles.css';
import {SocialInteraction} from "../models/SocialInteraction";
import Typeahead from "../presentational-components/Typeahead";
import {useSelector} from "react-redux";
import {StoreState} from "../redux/StoreState";
import {getAllNames} from "../filters/SocialInteractionsFilters";

type Props = {
    handleClose: () => void;
    handleSubmit: (socialInteraction: SocialInteraction) => void;
};

const SocialInteractionForm: React.FC<Props> = (props: Props) => {

    /** Form values */
    const [socialInteractionData, setSocialInteractionData] = useState(new SocialInteraction());

    /** Displayed dropdown options for the name */
    const nameOptions = useSelector<StoreState>(
        (state) => getAllNames(state.socialInteractions)
    ) as string[];

    const [clearTypeahead, setClearTypeahead] = useState<boolean>(false);

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
        props.handleSubmit(socialInteractionData);
        resetForm();
        props.handleClose(); // Close the modal
    }

    const handleClose = () => {
        resetForm();
        props.handleClose(); // Close the modal
    }

    const resetForm = () => {
        setClearTypeahead(!clearTypeahead);
        setSocialInteractionData(new SocialInteraction()); // Reset the form
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
                                value={socialInteractionData.date.toString()}
                                className="input"
                                type="date"/>
                        </div>
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
