import React, {useEffect, useState} from "react";
import '../bulma/mystyles.css';

type Props = {

    options: string[];

    clear: boolean;

    onValueChange: (option: string) => void;

    /** How many letters should the user type to make the typeahead appear */
    visibilityLength: number;

}

const Typeahead: React.FC<Props> = (props: Props) => {

    const [textValue, setTextValue] = useState(""); // Value on the text box itself
    const [options, setOptions] = useState<string[]>([]); // Options to render
    const [isDropdownActive, setIsDropdownActive] = useState(false);

    /** When the text field value changes */
    useEffect(() => {
        props.onValueChange(textValue);
    }, [textValue]);

    /** When the clear is changed */
    useEffect(() => {
        setTextValue('');
        setIsDropdownActive(false);
        setOptions([]);
    }, [props.clear]);

    /** When the user types */
    const onUserChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        const value = target.value;
        setTextValue(value);
        setOptions(props.options.filter(option => option.toLowerCase().startsWith(value.toLowerCase())));
        value.length >= props.visibilityLength ? setIsDropdownActive(true) : setIsDropdownActive(false);
    }

    const onOptionClick = (option: string) => {
        setTextValue(option);
        setIsDropdownActive(false);
        setOptions([]);
    }

    const getDropdownClass = () => {
        return `dropdown is-fullwidth is-block is-hoverable`;
    }

    return (
        <div className={getDropdownClass()}>

            <div className="dropdown-trigger">
                <div className="columns">

                    {/*------------- TEXT FIELD -------------*/}
                    <div className="column col-10">
                        <input
                            value={textValue}
                            onChange={onUserChange}
                            className="input"
                            type="text"/>
                    </div>

                    {/*------------- REMOVE SUGGESTIONS -------------*/}
                    <div className="column">
                        {/*{(() => {*/}
                        {/*    if (options.length > 0 && isDropdownActive) {*/}
                        {/*        return (*/}
                        {/*            <button*/}
                        {/*                onClick={() => {*/}
                        {/*                    setIsDropdownActive(false);*/}
                        {/*                    setOptions([]);*/}
                        {/*                }}*/}
                        {/*                type="button"*/}
                        {/*                className="is-small button">Remove Suggestions*/}
                        {/*            </button>*/}
                        {/*        )*/}
                        {/*    }*/}
                        {/*})()}*/}
                    </div>

                </div>
            </div>

            {/*------------- DROPDOWN MENU -------------*/}
            {(() => {
                if (options.length > 0 && isDropdownActive) {
                    return <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            {options.map((option) => (
                                <a key={option} onMouseDown={() => onOptionClick(option)} className="dropdown-item">
                                    {option}
                                </a>
                            ))}
                        </div>
                    </div>
                }
            })()}

        </div>
    );

}

export default Typeahead;
