import { createBrowserHistory } from "history";
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import configureStore from "./configureStore";
import registerServiceWorker from './registerServiceWorker';

const history = createBrowserHistory();
const store = configureStore({ history });

const main = (
  <Provider store={store}>
    <App history={history} />
  </Provider>
);

ReactDOM.render(main, document.getElementById('root'));
registerServiceWorker();
