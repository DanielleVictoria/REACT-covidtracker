import React from 'react';
import {ValidatorReturnObject} from "../models/ValidatorReturnObject";

type Props = {
    validatorObject: ValidatorReturnObject
}

const ErrorTable: React.FC<Props> = (props: Props) => {

    const {validatorObject} = props;

    return (
        <table className="table is-fullwidth">
            <thead>
            <tr>
                <th>Column</th>
                <th>Error message</th>
            </tr>
            </thead>
            <tbody>
            {
                validatorObject.messages.map(message => {
                    return (
                        <tr key={message.property + message.message}>
                            <td>{message.property}</td>
                            <td>{message.message}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}

export default ErrorTable;
