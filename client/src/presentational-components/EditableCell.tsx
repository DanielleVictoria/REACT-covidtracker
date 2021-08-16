import React, {useEffect} from "react";
import {TableInstance} from "react-table";
import {TableAction} from "../models/TableAction";

/**
 * The EditableCell is the one that we pass onto react-table. This is the default cell. This is not a React component.
 * */
const EditableCell = (obj: TableInstance) => {

    const {
        value: initialValue,
        row: {index},
        column: {id},
        currentEditingRowIndex,
        setCurrentEditingRowIndex,
        tableAction,
        manipulatedData,
        setManipulatedData,
    } = obj;

    // @ts-ignore
    const type = obj.typeMap[id].type;

    const [value, setValue] = React.useState(initialValue); // Value per cell
    const [originalValue, setOriginalValue] = React.useState<any>({}); // Original value per cell

    useEffect(() => setValue(initialValue), [initialValue]);

    useEffect(() => {
        if (index !== currentEditingRowIndex) return;
        switch (tableAction) {
            case TableAction.EDIT : {
                setOriginalValue(value); // Save the value before the user decided to modify it
                break;
            }
            case TableAction.CANCEL : {
                setValue(originalValue); // If the user cancels the modification, revert the changes to the original data
                setCurrentEditingRowIndex(-1); // Set the editing row index to -1 to indicate that we are not editing anymore
                break;
            }
            case TableAction.UPDATE : {
                setValue(originalValue);
                setManipulatedData({...manipulatedData, [id]: originalValue}) // State of the value in Table scope
                break;
            }
        }
    }, [tableAction])

    const onChange = (e: any) => {
        let modifiedValue: any;
        if (type === 'checkbox') {
            modifiedValue = e.target.checked;
        } else {
            modifiedValue = e.target.value;
        }
        setValue(modifiedValue); // State of the value in cell scope
        setManipulatedData({...manipulatedData, [id]: modifiedValue}) // State of the value in Table scope
    }

    // IF EDITING
    if ([TableAction.EDIT, TableAction.CANCEL].includes(tableAction) && index === currentEditingRowIndex) {
        if (type === 'checkbox') {
            return (
                <label className='checkbox'>
                    <input type={type} checked={value} onChange={onChange}/>
                </label>
            )
        } else if (type === 'date') {
            return (
                <input className='input' type='date' value={(new Date(value)).toLocaleDateString('en-CA')}
                       onChange={onChange}/>
            )
        } else {
            return <input className='input' type={type} value={value} onChange={onChange}/>
        }
    }
    // IF VIEWING
    else {
        if (type === 'checkbox') {
            return <span>{value === true ? 'Yes' : 'No'}</span>
        } else if (type === 'date') {
            return <span>{(new Date(value)).toLocaleDateString()}</span>
        } else {
            return <span>{value.toString()}</span>
        }
    }

}

export default EditableCell;
