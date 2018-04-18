import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch } from "react-router-dom";
import { IntlProvider } from "react-redux-multilingual";
import configureStore from "../../store";
import DevToolsContainer from "../DevToolsContainer/DevToolsContainer";
import AppContainer from "../AppContainer/AppContainer";
import translations from "../../translations/Translations";

const store = configureStore();

export default () => (
  <Provider store={store}>
    <IntlProvider translations={translations}>
      <div>
        <HashRouter>
          <Switch>
            <AppContainer />
          </Switch>
        </HashRouter>
        {process.env.NODE_ENV !== "production" && <DevToolsContainer />}
      </div>
    </IntlProvider>
  </Provider>
);
