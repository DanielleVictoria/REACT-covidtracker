import {useState} from "react";

/**
 * A custom hook that contains common functionalities across all modals
 */
const useModal = () => {

    const [modalDisplay, setModalDisplay] = useState<boolean>(false);

    const showModal = () => {
        setModalDisplay(true);
    }

    const hideModal = () => {
        setModalDisplay(false);
    }

    return {
        isShown : modalDisplay,
        showModal,
        hideModal
    };

};

export default useModal;

