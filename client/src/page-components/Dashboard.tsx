import {getDayAndMonthNDaysAgo} from "../services/DateHelperService";
import SocialInteractionForm from "../forms/SocialInteractionForm";
import {getSocialInteractionsChartData} from "../filters/SocialInteractionsFilters";
import {useDispatch, useSelector} from "react-redux";
import useModal from "../hooks/useModal";
import {StoreState} from "../redux/StoreState";
import SimpleModal from "../presentational-components/SimpleModal";
import Header from "../presentational-components/Header";
import React, {useEffect} from "react";
import TableDisplay from "../presentational-components/TableDisplay";
import {addSocialInteraction, getAllSocialInteractions} from "../redux/actions/social-interactions/Actions";
import {useHistory} from "react-router";
import NotificationsList from "../presentational-components/NotificationsList";

const Dashboard = () => {

    // ------------- Variable Initializations
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getAllSocialInteractions(dispatch)
    }, [])

    const socialInteractionsChartData = useSelector<StoreState>(
        (state) => getSocialInteractionsChartData(state.socialInteractions)
    ) as { x: number, y: number }[];

    // ------------- Modal functionalities
    const socialInteractionModal = useModal();
    const placeExposureModal = useModal();

    return (
        <div>

            {/*------------- HEADER -------------*/}
            <Header
                title='COVID Exposure Tracker Tool'
                tabInformation={[
                    {
                        title: 'Add Social Interaction',
                        onTabClick: socialInteractionModal.showModal
                    },
                    {
                        title: 'Add Place Exposure',
                        onTabClick: placeExposureModal.showModal
                    },
                    {
                        title: 'Reset Data',
                        onTabClick: () => console.log('Reset Data')
                    },
                ]}
            />

            {/*------------- NOTIFICATIONS -------------*/}
            <NotificationsList/>

            {/*------------- TABLES -------------*/}
            <div className="columns is-gapless">
                <div className="column">
                    {/*<TableDisplay*/}
                    {/*    title={"Recent Visited Places"}*/}
                    {/*    onViewAll={sampleTabClick}*/}
                    {/*    chartData={[*/}
                    {/*        {x: 1, y: 5},*/}
                    {/*        {x: 2, y: 15},*/}
                    {/*        {x: 3, y: 25},*/}
                    {/*        {x: 4, y: 35},*/}
                    {/*    ]}*/}
                    {/*    chartTickValues={[1,2,3,4]}*/}
                    {/*    chartLabelX={["Jan 1", "Jan 2", "Jan 3", "Jan 4"]}*/}
                    {/*    chartLabelYFunction={(x) => (`$${x / 100}k`)}*/}
                    {/*/>*/}
                </div>
                <div className="column">
                    <TableDisplay
                        title={"Recent Social Places"}
                        onViewAll={() => history.push('/social-interactions')}
                        chartData={socialInteractionsChartData}
                        chartTickValues={[1, 2, 3, 4, 5, 6, 7]}
                        chartLabelX={getDayAndMonthNDaysAgo(7, new Date())}
                        chartLabelY={'Number of Social Interactions'}
                    />
                </div>
            </div>

            {/*------------- MODALS -------------*/}
            <SimpleModal
                title="Add Social Interaction"
                show={socialInteractionModal.isShown}
                handleClose={socialInteractionModal.hideModal}>
                <SocialInteractionForm
                    handleClose={socialInteractionModal.hideModal}
                    handleSubmit={(socialInteraction) => addSocialInteraction(dispatch, socialInteraction)}
                />
            </SimpleModal>

            {/*<SimpleModal*/}
            {/*    title="Add Visited Place"*/}
            {/*    show={placeExposureModal.isShown}*/}
            {/*    handleClose={placeExposureModal.hideModal}>*/}
            {/*    <PlaceExposureForm*/}
            {/*        handleSubmit={() => {*/}
            {/*            console.log('Form Submitted');*/}
            {/*        }}*/}
            {/*        handleClose={placeExposureModal.hideModal}/>*/}
            {/*</SimpleModal>*/}

        </div>
    );
}

export default Dashboard;
