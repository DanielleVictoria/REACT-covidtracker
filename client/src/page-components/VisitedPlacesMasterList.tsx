import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {Row} from 'react-table';
import Header from "../presentational-components/Header";
import ModifiableTable from "../smart-components/ModifiableTable";
import SimpleModal from "../presentational-components/SimpleModal";
import useModal from "../hooks/useModal";
import {filterLastNDaysFromTableObject} from "../filters/TableObjectFilters";
import {generalFormValidator} from "../forms/GeneralFormValidator";
import {ValidatorReturnObject} from "../models/ValidatorReturnObject";
import {TableAction} from "../models/TableAction";
import ErrorTable from "../presentational-components/ErrorTable";
import {
    addVisitedPlace,
    deleteVisitedPlace,
    getAllVisitedPlaces,
    updateVisitedPlace
} from "../redux/actions/VisitedPlacesActions";
import VisitedPlaceForm from "../forms/VisitedPlaceForm";
import {VisitedPlace} from "../models/VisitedPlace";
import {StoreState} from "../redux/StoreState";

const VisitedPlacesMasterList = () => {

    // ------------- Variable Initializations
    const dispatch = useDispatch();
    const history = useHistory();

    // ------------- States
    const [validatorObject, setValidationObject] = useState<ValidatorReturnObject>(); // Contains validation messages if validation fails
    const [tableOverride, setTableOverride] = useState<{ rowIndex: number, actionType: TableAction }>();

    useEffect(() => {
        getAllVisitedPlaces(dispatch);
    }, []);

    // ------------- Modal functionalities
    const visitedPlaceModal = useModal();
    const validationErrorsModal = useModal();

    return (
        <div>

            {/*------------- HEADER -------------*/}
            <Header
                title='COVID Exposure Tracker Tool'
                tabInformation={[
                    {
                        title: 'Dashboard',
                        onTabClick: () => history.push("/dashboard")
                    }
                ]}/>

            {/*------------- CONTENT -------------*/}
            <div className="section">
                <div className="columns">
                    <div className="column">
                        <h1 className="title is-size-4">Visited Places List</h1>
                    </div>
                    <div className="column">
                        <button onClick={visitedPlaceModal.showModal}
                                className="button is-primary is-pulled-right">Add Visited Place
                        </button>
                    </div>
                </div>
                <ModifiableTable
                    columnsConf={
                        [
                            {Header: 'Place', accessor: 'place'},
                            {
                                Header: 'Date',
                                accessor: 'date',
                                defaultCanFilter: true,
                                filter: (rows: Array<Row>, columnIds: Array<string>, daysToGoBack: number) =>
                                    filterLastNDaysFromTableObject(rows, columnIds, daysToGoBack),
                                sortType: (rowA: Row, rowB: Row, columnId: string): number => {
                                    return rowA.values[columnId] > rowB.values[columnId] ? 1 : -1;
                                }
                            },
                            {Header: 'Hours', accessor: 'hours'},
                            {
                                Header: 'Is Crowded?',
                                accessor: 'isCrowded',
                                sortType: (rowA: Row, rowB: Row, columnId: string): number => {
                                    return rowA.values[columnId] === true ? 1 : -1;
                                }
                            },
                        ]
                    }
                    dataConf={
                        useSelector<StoreState>(
                            (state) => state.visitedPlaces.map(place => (
                                {...place, date: place.date.toLocaleDateString('en-CA')}
                            ))
                        ) as VisitedPlace[]
                    }
                    onUpdate={(data, rowIndex, tableInstance) => {
                        const validationObject = generalFormValidator(data);
                        if (!validationObject.isValid) {
                            setValidationObject(validationObject);
                            validationErrorsModal.showModal();
                            setTableOverride({rowIndex, actionType: TableAction.EDIT});
                            return;
                        } else {
                            setValidationObject(undefined);
                        }
                        updateVisitedPlace(dispatch, data._id, data as VisitedPlace);
                    }}
                    onDelete={(data) => {
                        deleteVisitedPlace(dispatch, (data as VisitedPlace)._id);
                    }}
                    typeMap={{
                        place: {type: 'text'},
                        date: {type: 'date'},
                        hours: {type: 'number'},
                        isCrowded: {type: 'checkbox'}
                    }}
                    overrideRowActionType={tableOverride}
                    hasError={validatorObject === undefined}
                    highlightRow={(rowData => (rowData as VisitedPlace).isCrowded)}
                />
            </div>

            {/*------------- MODALS -------------*/}
            <SimpleModal
                title="Add Visited Place"
                show={visitedPlaceModal.isShown}
                handleClose={visitedPlaceModal.hideModal}>
                <VisitedPlaceForm
                    handleClose={visitedPlaceModal.hideModal}
                    handleSubmit={visitedPlace => addVisitedPlace(dispatch, visitedPlace)}
                />
            </SimpleModal>

            <SimpleModal
                title="Modification unsuccessful"
                show={validationErrorsModal.isShown}
                handleClose={() => {
                    setValidationObject(undefined);
                    validationErrorsModal.hideModal();
                }}>
                <p className="has-text-danger">
                    Date modification unsuccessful! Your changes are reverted. Please see the following errors :
                </p>
                {(() => {
                    if (validatorObject) {
                        return <ErrorTable validatorObject={validatorObject}/>;
                    }
                })()}
            </SimpleModal>

        </div>
    )
}

export default VisitedPlacesMasterList;
