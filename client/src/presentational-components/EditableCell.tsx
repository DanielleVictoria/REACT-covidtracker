import React, {useEffect} from "react";
import {TableInstance} from "react-table";
import {TableAction} from "../models/TableAction";

/**
 * The EditableCell is the one that we pass onto react-table. This is the default cell.
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

    const [value, setValue] = React.useState(initialValue);
    const [originalValue, setOriginalValue] = React.useState<any>({});

    useEffect(() => setValue(initialValue), [initialValue]);

    useEffect(() => {
        if (index !== currentEditingRowIndex) {
            return;
        }
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
        }
    }, [tableAction])

    const onChange = (e: any) => {
        let modifiedValue: any;
        if (type === 'checkbox') {
            modifiedValue = e.target.checked;
        } else if (type === 'date') {
            modifiedValue = new Date(e.target.value);
        } else {
            modifiedValue = e.target.value;
        }

        setValue(modifiedValue);
        setManipulatedData({...manipulatedData, [id]: modifiedValue})

    }

    if ([TableAction.EDIT, TableAction.CANCEL].includes(tableAction) && index === currentEditingRowIndex) {
        if (type === 'checkbox') {
            return (
                <label className='checkbox'>
                    <input type={type} checked={value} onChange={onChange}/>
                </label>
            )
        } else if (type === 'date') {
            return (
                <input className='input' type='date' value={(value as Date).toLocaleDateString('en-CA')}
                       onChange={onChange}/>
            )
        } else {
            return <input className='input' type={type} value={value} onChange={onChange}/>
        }
    } else {
        if (type === 'checkbox') {
            return <span>{value === true ? 'Yes' : 'No'}</span>
        } else if (type === 'date') {
            return <span>{(value as Date).toLocaleDateString()}</span>
        } else {
            return <span>{value.toString()}</span>
        }
    }

}

export default EditableCell;
