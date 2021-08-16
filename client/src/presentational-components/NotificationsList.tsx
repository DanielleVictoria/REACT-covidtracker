import React from 'react';
import {HappyOutline} from "react-ionicons";
import Notification from "./Notification";
import {NotificationType} from "../models/NotificationType";
import {filterLastNDays} from "../filters/SocialInteractionsFilters";
import {useSelector} from "react-redux";
import {StoreState} from "../redux/StoreState";
import {filterLastNDaysVisitedPlaces} from "../filters/VisitedPlacesFilters";

type Props = {};

const NotificationsList: React.FC<Props> = (props: Props) => {

    const hadInteractions = useSelector<StoreState>(
        (state) => (
            filterLastNDays(14, state.socialInteractions)
                .filter(interaction => !interaction.isSocialDistancing)
                .length !== 0
        )
    ) as boolean;

    const exposedToCrowdedPlaces = useSelector<StoreState>(
        (state) => (
            filterLastNDaysVisitedPlaces(14, state.visitedPlaces)
                .filter(place => place.isCrowded)
                .length !== 0
        )
    ) as boolean;

    return (
        <div className='section is-small pb-0'>

            {/*------------- HEADER -------------*/}
            <h1 className="title is-size-4">
                <div className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <HappyOutline color={'#00000'} title={''} height="40px" width="40px"
                            />
                        </div>
                        <div className="level-item">
                            <span className='mx-2'>Welcome Back</span>
                        </div>
                    </div>
                </div>
            </h1>
            <h2 className="subtitle">Here are the things you don't want to miss out</h2>

            <div className="columns">

                <div className="column">

                    {/*Visited Places Notification*/}
                    {(() => {
                        if (exposedToCrowdedPlaces) {
                            return (
                                <Notification
                                    type={NotificationType.DANGER}
                                    message={'You have been exposed to a crowded place for the last 14 days. ' +
                                    'Try to avoid crowded places to minimize your exposure risk.'}/>)
                        } else {
                            return (
                                <Notification
                                    type={NotificationType.SUCCESS}
                                    message={'Thank you for helping to stop spread the virus by staying home.'}/>)
                        }
                    })()}
                </div>

                {/*Social Interaction Notification*/}
                <div className="column">
                    {(() => {
                        if (hadInteractions) {
                            return (
                                <Notification
                                    type={NotificationType.DANGER}
                                    message={'You did not practice social distancing for the last 14 days. ' +
                                    'Stay at home and maintain 1-2 meters away from other people'}/>)
                        } else {
                            return (
                                <Notification
                                    type={NotificationType.SUCCESS}
                                    message={'You are maintaining proper social distancing. Keep it up!'}/>)
                        }
                    })()}
                </div>

            </div>

        </div>
    )
}

export default NotificationsList;
