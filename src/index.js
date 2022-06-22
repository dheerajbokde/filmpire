import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import App from './components/App';
import store from './app/store';
import './index.css'
import ToggleColorModeProvider from './utils/ToggleColorMode';

ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter basename="/filmpire">
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>
  </Provider>,
  document.getElementById('root'),
);
