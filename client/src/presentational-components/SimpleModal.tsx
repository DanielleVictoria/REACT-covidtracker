import React from "react";

type Props = {
    children: React.ReactNode;
    title: string;
    show: boolean;
    handleClose: () => void;
};

/**
 * A simple modal that takes on children as content and shows it in a box
 * @param props
 * @constructor
 */
const SimpleModal: React.FC<Props> = (props) => {

    // This will determine if the modal will be shown or not
    const modalClass = props.show ? 'modal is-active' : 'modal';

    return (
        <div className={modalClass}>

            {/*Black overlay*/}
            <div className="modal-background"/>

            {/*Content*/}
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title has-text-weight-bold">{props.title}</p>
                </header>
                <section className="modal-card-body">
                    {props.children}
                </section>
                <footer className="modal-card-foot form-modal-footer"/>
            </div>

            {/*Close Button */}
            <button
                onClick={props.handleClose}
                className="modal-close is-large"
                aria-label="close"/>

        </div>
    );

}

export default SimpleModal;
