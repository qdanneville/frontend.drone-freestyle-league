import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux'
import configureStore from './store/store'

import App from './App';


module.exports = function svgrParcelPlugin(bundler) {
    // Parcel requires that the asset be passed in as a module path.
    bundler.addAssetType('svg', require.resolve('../assets/svg'))
}

const store = configureStore();
const MOUNT_NODE = document.getElementById('app');


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    MOUNT_NODE
)