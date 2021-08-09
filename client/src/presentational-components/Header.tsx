import React, {ReactNode} from 'react';
import '../bulma/mystyles.css';

type Props = {
    title: string;
    tabInformation: {
        title: string;
        onTabClick: () => void;
    }[];
};

const Header: React.FC<Props> = (props: Props) => {

    const {title, tabInformation} = props;

    return (
        <section className="hero is-primary">

            {/*------------- HERO BODY -------------*/}
            <div className="hero-body">
                <p className="title">
                    {title}
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
