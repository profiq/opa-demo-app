import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers'; // for prod
//import {composeWithDevTools} from "redux-devtools-extension"; // for debug

const store = createStore(rootReducer); // for prod
//const store = createStore(rootReducer, composeWithDevTools()); // for debug

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
