import React from 'react';
import '../bulma/mystyles.css';
import {PulseOutline} from "react-ionicons";

type Props = {
    title: string;
    tabInformation?: {
        title: string;
        onTabClick: () => void;
    }[];
};

const Header: React.FC<Props> = (props: Props) => {

    let {title, tabInformation} = props;
    tabInformation = tabInformation ?? [];

    return (
        <section className="hero is-primary">

            {/*------------- HERO BODY -------------*/}
            <div className="hero-body">
                <p className="title">
                    <span className="level">
                        <span className="level-right">
                            <span className="level-item">
                            <PulseOutline
                                color={'#ffffff'}
                                title={''}
                                height="100px"
                                width="100px"
                            />
                            </span>
                            <span className="level-item">
                                {title}
                            </span>
                        </span>
                    </span>
                </p>
            </div>

            {/*------------- HERO FOOT -------------*/}
            <div className="hero-foot">
                <nav className="tabs is-boxed">
                    <div className="container">
                        <ul>
                            {tabInformation.map((tab) => (
                                <li key={tab.title} onClick={tab.onTabClick}>
                                    <a>{tab.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            </div>

        </section>
    );
}

export default Header;
