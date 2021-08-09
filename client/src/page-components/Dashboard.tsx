import React, {useEffect, useState} from "react";
import Header from "../presentational-components/Header";
import TableDisplay from "../presentational-components/TableDisplay";
import SimpleModal from "../presentational-components/SimpleModal";
import useModal from "../hooks/useModal";
import SocialInteractionForm from "../forms/SocialInteractionForm";
import PlaceExposureForm from "../forms/PlaceExposureForm";
import {SocialInteraction} from "../models/SocialInteraction";
import {addSocialInteraction, getAllNames} from "../services/SocialInteractionService";
import useSocialInteractionsData from "../hooks/useSocialInteractionsData";
import {getDayAndMonthNDaysAgo} from "../services/DateHelperService";
import {useDispatch, useSelector} from "react-redux";
import {getAllSocialInteractions} from "../redux/actions/social-interactions/Actions";
import {StoreState} from "../redux/StoreState";

const Dashboard = () => {

    // Modal functionalities
    const socialInteractionModal = useModal();
    const placeExposureModal = useModal();

    // States
    const [updateData, setUpdateData] = useState<boolean>(false);

    // Submit functions
    const submitSocialInteraction = (socialInteractionData: SocialInteraction) => {
        addSocialInteraction(socialInteractionData).then(r => {
            setUpdateData(!updateData);
            retrieveSocialInteractionData();
        });
    }

    // Test
    // const dispatch = useDispatch();
    // useEffect(() => {
    //     getAllSocialInteractions(dispatch)
    // }, [])
    //
    // const names = useSelector<StoreState>(
    //     (state) => getAllNames(state.socialInteractions)
    // ) as string[];
    // console.log('Names : ', names);

    const {
        socialInteractionsData,
        getSocialInteractionChartData,
        retrieveSocialInteractionData
    } = useSocialInteractionsData();

    return (
        <div>

            {/*------------- HEADER -------------*/}
            <Header
                title='🏥 COVID Exposure Tracker Tool'
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
                        onViewAll={() => console.log('Recent Social Places OnViewAll')}
                        chartData={getSocialInteractionChartData(socialInteractionsData)}
                        chartTickValues={[1, 2, 3, 4, 5, 6, 7]}
                        chartLabelX={getDayAndMonthNDaysAgo(7, new Date())}
                        chartLabelYFunction={(x) => x}
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
                    handleSubmit={submitSocialInteraction}
                    updateData={updateData}
                />
            </SimpleModal>

            <SimpleModal
                title="Add Visited Place"
                show={placeExposureModal.isShown}
                handleClose={placeExposureModal.hideModal}>
                <PlaceExposureForm
                    handleSubmit={() => {
                        console.log('Form Submitted');
                    }}
                    handleClose={placeExposureModal.hideModal}/>
            </SimpleModal>

        </div>
    );
}

export default Dashboard;
