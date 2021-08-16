import React from 'react';
import './App.css';
import './bulma/mystyles.css'
import Dashboard from "./page-components/Dashboard";
import {Switch, Route} from "react-router";
import {BrowserRouter} from "react-router-dom";
import SocialInteractionsMasterList from "./page-components/SocialInteractionsMasterList";
import { Provider as ReduxProvider } from "react-redux";
import configureState from "./redux/configureStore";
import VisitedPlacesMasterList from "./page-components/VisitedPlacesMasterList";

function App() {

    return (
        <div className="App">
            <ReduxProvider store={configureState()}>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/" component={Dashboard}/>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/social-interactions" component={SocialInteractionsMasterList}/>
                        <Route path="/visited-places" component={VisitedPlacesMasterList}/>
                    </Switch>
                </BrowserRouter>
            </ReduxProvider>
        </div>
    );
}

export default App;
