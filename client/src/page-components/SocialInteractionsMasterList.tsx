import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {
    addSocialInteraction, deleteSocialInteraction,
    getAllSocialInteractions,
    updateSocialInteraction
} from "../redux/actions/SocialInteractionsActions";
import {SocialInteraction} from "../models/SocialInteraction";
import {Row} from 'react-table';
import Header from "../presentational-components/Header";
import ModifiableTable from "../presentational-components/ModifiableTable";
import SimpleModal from "../presentational-components/SimpleModal";
import SocialInteractionForm from "../forms/SocialInteractionForm";
import useModal from "../hooks/useModal";
import {filterLastNDaysFromTableObject} from "../filters/TableObjectFilters";
import {generalFormValidator} from "../validators/GeneralFormValidator";
import {ValidatorReturnObject} from "../models/ValidatorReturnObject";
import {TableAction} from "../models/TableAction";
import ErrorTable from "../presentational-components/ErrorTable";
import {StoreState} from "../redux/StoreState";
const SocialInteractionsMasterList = () => {

    // ------------- Variable Initializations
    const dispatch = useDispatch();
    const history = useHistory();

    // ------------- States
    const [validatorObject, setValidationObject] = useState<ValidatorReturnObject>(); // Contains validation messages if validation fails
    const [tableOverride, setTableOverride] = useState<{ rowIndex: number, actionType: TableAction }>();

    useEffect(() => {
        getAllSocialInteractions(dispatch)
    }, []);

    // ------------- Modal functionalities
    const socialInteractionModal = useModal();
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
                        <h1 className="title is-size-4">Social Interactions List</h1>
                    </div>
                    <div className="column">
                        <button onClick={socialInteractionModal.showModal}
                                className="button is-primary is-pulled-right">Add Social Interaction
                        </button>
                    </div>
                </div>
                <ModifiableTable
                    columnsConf={
                        [
                            {Header: 'Person', accessor: 'name'},
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
                                Header: 'Is Practicing SD?',
                                accessor: 'isSocialDistancing',
                                sortType: (rowA: Row, rowB: Row, columnId: string): number => {
                                    return rowA.values[columnId] === true ? 1 : -1;
                                }
                            },
                        ]
                    }
                    dataConf={
                        useSelector<StoreState>(
                            (state) => state.socialInteractions.map(interaction => (
                                {...interaction, date: interaction.date.toLocaleDateString('en-CA')}
                            ))
                        ) as SocialInteraction[]
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
                        updateSocialInteraction(dispatch, data._id, data as SocialInteraction);
                    }}
                    onDelete={(data) => {
                        deleteSocialInteraction(dispatch, (data as SocialInteraction)._id);
                    }}
                    typeMap={{
                        name: {type: 'text'},
                        date: {type: 'date'},
                        hours: {type: 'number'},
                        isSocialDistancing: {type: 'checkbox'}
                    }}
                    overrideRowActionType={tableOverride}
                    hasError={validatorObject === undefined}
                    highlightRow={(rowData => !(rowData as SocialInteraction).isSocialDistancing)}
                />
            </div>

            {/*------------- MODALS -------------*/}
            <SimpleModal
                title="Add Social Interaction"
                show={socialInteractionModal.isShown}
                handleClose={socialInteractionModal.hideModal}>
                <SocialInteractionForm
                    handleClose={socialInteractionModal.hideModal}
                    handleSubmit={(socialInteraction) => addSocialInteraction(dispatch, socialInteraction)}/>
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

export default SocialInteractionsMasterList;
