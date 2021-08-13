import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {
    addSocialInteraction, deleteSocialInteraction,
    getAllSocialInteractions,
    updateSocialInteraction
} from "../redux/actions/social-interactions/Actions";
import {StoreState} from "../redux/StoreState";
import {SocialInteraction} from "../models/SocialInteraction";
import {Column, Row} from 'react-table';
import Header from "../presentational-components/Header";
import Table from "../presentational-components/Table";
import SimpleModal from "../presentational-components/SimpleModal";
import SocialInteractionForm from "../forms/SocialInteractionForm";
import useModal from "../hooks/useModal";
import {formatResults} from "../filters/SocialInteractionsFilters";
import {filterLastNDaysFromTableObject} from "../filters/TableObjectFilters";

const SocialInteractionsMasterList = () => {

    // ------------- Variable Initializations
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getAllSocialInteractions(dispatch)
    }, []);

    // ------------- Configurations for table

    const columns: Array<Column> = [
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

    // ------------- Modal functionalities
    const socialInteractionModal = useModal();

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
                        <h1 className="title is-size-4">List of Social Interactions</h1>
                    </div>
                    <div className="column">
                        <button onClick={socialInteractionModal.showModal}
                                className="button is-primary is-pulled-right">Add Social Interaction
                        </button>
                    </div>
                </div>
                <Table
                    columnsConf={columns}
                    dataConf={
                        useSelector<StoreState>(
                            (state) => formatResults(state.socialInteractions)
                        ) as SocialInteraction[]
                    }
                    onUpdate={(data) => {
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
                    }
                    }
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

        </div>
    )
}

export default SocialInteractionsMasterList;
