import React, { Component, Fragment } from 'react';

import Tabs from './components/Tabs';

import './temp/tempcss.css';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <footer>
          <Tabs tabClass='footer__tabs'>
            <div label='First'>This is the first tab.</div>
            <div label='Second'>This is the second tab.</div>
            <div label='Third'>This is the third tab.</div>
          </Tabs>
        </footer>
      </Fragment>
    );
  }
}
