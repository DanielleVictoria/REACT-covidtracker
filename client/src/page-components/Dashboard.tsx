import {getDayAndMonthNDaysAgo} from "../services/DateHelperService";
import SocialInteractionForm from "../forms/SocialInteractionForm";
import {getSocialInteractionsChartData} from "../filters/SocialInteractionsFilters";
import {useDispatch, useSelector} from "react-redux";
import useModal from "../hooks/useModal";
import SimpleModal from "../presentational-components/SimpleModal";
import Header from "../presentational-components/Header";
import React, {useEffect} from "react";
import TableDisplay from "../presentational-components/TableDisplay";
import {addSocialInteraction, getAllSocialInteractions} from "../redux/actions/SocialInteractionsActions";
import {useHistory} from "react-router";
import NotificationsList from "../smart-components/NotificationsList";
import VisitedPlaceForm from "../forms/VisitedPlaceForm";
import {addVisitedPlace, getAllVisitedPlaces} from "../redux/actions/VisitedPlacesActions";
import {getVisitedPlacesChartData} from "../filters/VisitedPlacesFilters";
import {StoreState} from "../redux/StoreState";

// TODO : Implement ResetData
// TODO : Apply confirmation when deleting
// TODO : Refractor codes and create folders for smart components
const Dashboard = () => {

    // ------------- Variable Initializations
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        getAllSocialInteractions(dispatch);
        getAllVisitedPlaces(dispatch);
    }, [])

    const socialInteractionsChartData = useSelector<StoreState>(
        (state) => getSocialInteractionsChartData(state.socialInteractions)
    ) as { x: number, y: number }[];

    const visitedPlacesChartData = useSelector<StoreState>(
        (state) => getVisitedPlacesChartData(state.visitedPlaces)
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
                        title: 'Add Place Exposure',
                        onTabClick: placeExposureModal.showModal
                    },
                    {
                        title: 'Add Social Interaction',
                        onTabClick: socialInteractionModal.showModal
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
                    <TableDisplay
                        title={"Recent Visited Places"}
                        onViewAll={() => history.push('/visited-places')}
                        chartData={visitedPlacesChartData}
                        chartTickValues={[1, 2, 3, 4, 5, 6, 7]}
                        chartLabelX={getDayAndMonthNDaysAgo(7, new Date())}
                        chartLabelY={'Number of Visited Places'}
                    />
                </div>
                <div className="column">
                    <TableDisplay
                        title={"Recent Social Interactions"}
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
                    handleSubmit={socialInteraction => addSocialInteraction(dispatch, socialInteraction)}
                />
            </SimpleModal>

            <SimpleModal
                title="Add Visited Place"
                show={placeExposureModal.isShown}
                handleClose={placeExposureModal.hideModal}>
                <VisitedPlaceForm
                    handleClose={placeExposureModal.hideModal}
                    handleSubmit={visitedPlace => addVisitedPlace(dispatch, visitedPlace)}
                />
            </SimpleModal>

        </div>
    );
}

export default Dashboard;
