import React from "react";
import {TableInstance} from "react-table";
import {TableAction} from "../models/TableAction";

type Props = {
    tableInstance: TableInstance,
    onUpdate: (rowNumber: number) => void
    onDelete: (rowNumber: number) => void
    onEdit: (rowNumber: number) => void
    onCancel: () => void
};

const TableControls: React.FC<Props> = (props: Props) => {

    const {
        row: {index},
        currentEditingRowIndex,
        tableAction,
        manipulatedData,
    } = props.tableInstance;

    if ([TableAction.EDIT, TableAction.CANCEL].includes(tableAction) && index === currentEditingRowIndex) {
        return (
            <div className="buttons">
                <button onClick={() => props.onUpdate(manipulatedData)} className="button is-primary is-small">Update
                </button>
                <button onClick={() => props.onCancel()} className="button is-small">Cancel
                </button>
            </div>
        )
    } else {
        return (
            <div className="buttons">
                <button onClick={() => props.onEdit(index)} className="button is-primary is-small">Edit
                </button>
                <button onClick={() => props.onDelete(index)} className="button is-danger is-small">Delete
                </button>
            </div>
        )
    }
}

export default TableControls;
