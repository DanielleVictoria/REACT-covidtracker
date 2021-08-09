import React from "react";
import '../bulma/mystyles.css';

type Props = {
    handleClose: () => void;
    handleSubmit: () => void;
};

const PlaceExposureForm: React.FC<Props> = (props: Props) => {

    return (
        <form>

            {/*------------- PLACE -------------*/}
            <div className="field">
                <label className="label">Place</label>
                <div className="control">
                    <input className="input" type="text"/>
                </div>
            </div>

            <div className="columns">

                <div className="column">
                    {/*------------- DATE -------------*/}
                    <div className="field ">
                        <label className="label">Date</label>
                        <div className="control">
                            <input className="input" type="date"/>
                        </div>
                    </div>
                </div>

                <div className="column">
                    {/*------------- HOURS -------------*/}
                    <div className="field ">
                        <label className="label">Hours</label>
                        <div className="control">
                            <input className="input" type="number"/>
                        </div>
                    </div>
                </div>

            </div>

            {/*------------- CROWDED -------------*/}
            <div className="field">
                <label className="checkbox">
                    <input type="checkbox"/> Is Crowded?
                </label>
            </div>

            {/*------------- BUTTON CONTROLS -------------*/}
            <div className="field is-grouped is-pulled-right">
                <div className="control mt-5">
                    <button onClick={props.handleSubmit} type="button" className="button is-success">Save</button>
                </div>
                <div className="control mt-5">
                    <button onClick={props.handleClose} type="button" className="button is-danger">Cancel</button>
                </div>
            </div>

        </form>
    );

}

export default PlaceExposureForm;
