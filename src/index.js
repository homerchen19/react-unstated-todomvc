import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'unstated';

import Header from './components/Header';
import MainSection from './components/MainSection';

import 'todomvc-app-css/index.css';

render(
  <Provider>
    <div className="todoapp">
      <Header />
      <MainSection />
    </div>
  </Provider>,
  document.getElementById('root')
);
