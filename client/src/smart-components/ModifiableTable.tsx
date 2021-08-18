import React, {useEffect, useMemo, useState} from "react";
import {Column, TableInstance, useFilters, usePagination, useSortBy, useTable} from "react-table";
import {ArrowDownOutline, ArrowUpOutline} from "react-ionicons";
import TableControls from "../presentational-components/TableControls";
import PageSizeSelector from "../presentational-components/PageSizeSelector";
import Pagination from "../presentational-components/Pagination";
import EditableCell from "../presentational-components/EditableCell";
import {TypeMap} from "../models/TypeMap";
import {TableAction} from "../models/TableAction";

type Props = {

    /** The columns that will be memoized and rendered into the table */
    columnsConf: Array<Column>,

    /** The data that will be memoized and rendered into the table */
    dataConf: Array<any>,

    /** A lookup for the input type when we make each cell editable */
    typeMap: TypeMap

    // Callbacks
    onUpdate: (value: any, rowIndex: number, tableInstance?: TableInstance) => void;
    onDelete: (value: any) => void;

    /** This will override the action type of a row */
    overrideRowActionType?: { rowIndex: number, actionType: TableAction }

    /** This is a handling for when the Update and Delete validation fails. This will revert the new values into the
     * value assigned before we clicked the Update/Delete */
    hasError: boolean;

    highlightRow: (rowData: any) => boolean;
};

const ModifiableTable: React.FC<Props> = (props: Props) => {

    const {columnsConf, dataConf, typeMap} = props;

    // Row index that is currently being edited
    const [currentEditingRowIndex, setCurrentEditingRowIndex] = useState<number>(-1);

    // This will be used for the cells or table controls to know what was last clicked
    const [tableAction, setTableAction] = useState<TableAction>(TableAction.NONE);

    // Data being manipulated. The value of this will change realtime as the user inputs anything.
    const [manipulatedData, setManipulatedData] = useState<any>({});

    // Previous data that is saved upon clicking edit. This will be used if we want to revert the changes when the validation fails
    const [originalData, setOriginalData] = useState<any>({});

    useEffect(() => {
        if (props.overrideRowActionType) {
            setCurrentEditingRowIndex(props.overrideRowActionType.rowIndex);
            setTableAction(props.overrideRowActionType.actionType);
        }
    }, [props.overrideRowActionType]);

    useEffect(() => {
        if (props.hasError) {
            setManipulatedData(originalData);
        }
    }, [props.hasError]);

    // ------------- Table

    const columns: Array<Column> = React.useMemo(
        () => [
            ...columnsConf,
            {
                Header: 'Actions', disableSortBy: true, accessor: 'actions', Cell: (tableInstance) => (
                    <TableControls
                        tableInstance={tableInstance}
                        onCancel={() => {
                            setManipulatedData({});
                            setTableAction(TableAction.CANCEL);
                        }}
                        onUpdate={(manipulatedData, rowNumber) => {
                            props.onUpdate(manipulatedData, rowNumber, tableInstance);
                            setTableAction(TableAction.UPDATE);
                        }}
                        onEdit={(rowNumber) => {
                            setManipulatedData(tableInstance.row.original)
                            setOriginalData(tableInstance.row.original);
                            setCurrentEditingRowIndex(rowNumber);
                            setTableAction(TableAction.EDIT);
                        }}
                        onDelete={rowNumber => {
                            setManipulatedData({});
                            props.onDelete(tableInstance.row.original);
                            setTableAction(TableAction.DELETE);
                        }}/>
                )
            },
        ], []
    )

    const data = useMemo(() => dataConf, [dataConf])

    // Cells that will be able to change from label to text box upon button click
    const defaultColumn = {
        Cell: EditableCell
    }

    const table = useTable(
        {

            // Table Configurations
            columns,
            data,
            initialState: {pageIndex: 0,},

            // Defaults
            defaultColumn,

            // Defined properties : Set the variables here so that the EditableCells can access it
            currentEditingRowIndex, setCurrentEditingRowIndex, typeMap, tableAction,
            setTableAction, manipulatedData, setManipulatedData
        },

        // React table hooks
        useFilters, useSortBy, usePagination
    );

    const {

        // Table Properties
        getTableProps, getTableBodyProps, headerGroups, prepareRow,

        // Page Navigation
        page, canPreviousPage, canNextPage, pageCount, gotoPage, nextPage, previousPage, setPageSize,

        // Filters
        setFilter, setAllFilters,

        // State
        state: {
            pageIndex,
            pageSize,
        },

    } = table;

    // The default view is 5 rows
    useEffect(() => setPageSize(5), [])

    // ------------- Template Calls
    const filterLastNDays = (days: number, enable: boolean) => {
        enable ? setFilter("date", days) : setAllFilters([]);
    }

    return (
        <div>
            <div className="level">
                <div className="level-left">
                    <div className="level-item">
                        {/*------------- PAGE SIZE SELECTOR -------------*/}
                        <PageSizeSelector
                            pageSize={pageSize}
                            setPageSize={setPageSize}
                        />

                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <label className="checkbox">
                            <input type="checkbox" onChange={e => filterLastNDays(7, e.target.checked)}/> Display
                            records within the last 14 days
                        </label>
                    </div>
                </div>
            </div>

            {/*------------- TABLE-------------*/}
            <table {...getTableProps()} className="table is-hoverable is-fullwidth">
                <thead>
                {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render('Header')}
                                    <span className="mx-2">
                                        {(() => {
                                            if (column.isSortedDesc) {
                                                return <ArrowDownOutline color={'#00000'} title={''} height="15px"
                                                                         width="15px"/>
                                            } else if (column.isSorted) {
                                                return <ArrowUpOutline color={'#00000'} title={''} height="15px"
                                                                       width="15px"/>
                                            } else {
                                                return <span/>
                                            }
                                        })()}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    )
                )}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                    prepareRow(row)
                    return (
                        <tr className={props.highlightRow(row.original) ? 'has-background-danger-light' : ''} {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>

            {/*------------- PAGINATION -------------*/}
            <Pagination previousPage={previousPage} nextPage={nextPage} gotoPage={gotoPage} canNextPage={canNextPage}
                        canPreviousPage={canPreviousPage} pageCount={pageCount} pageIndex={pageIndex}/>

        </div>
    )

}

export default ModifiableTable;
