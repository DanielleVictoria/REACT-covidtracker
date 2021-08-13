import React from "react";
import {NotificationType} from "../models/NotificationType";
import {InformationCircleOutline, WarningOutline} from "react-ionicons";

type Props = {
    type: NotificationType,
    message: string;
};

const Notification: React.FC<Props> = (props: Props) => {

    const getNotificationClass = (type: NotificationType) => {
        let className = 'notification ';
        className += type === NotificationType.DANGER ? 'is-danger' : 'is-success';
        return className;
    }

    return (
        <div className={getNotificationClass(props.type)}>
            <div className="columns">
                <div className="column is-2">
                    {(() => {
                        if (props.type === NotificationType.DANGER) {
                            return (
                                <WarningOutline color={'#ffffff'} title={''} height="100%" width="100%"/>
                            )
                        } else {
                            return (
                                <InformationCircleOutline color={'#ffffff'} title={''} height="100%" width="100%"/>
                            )
                        }
                    })()}
                </div>
                <div className="column">
                    {props.message}
                </div>
            </div>
        </div>
    )
}

export default Notification;
