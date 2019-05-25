import React, { Component, Fragment } from 'react';

import Tabs from './components/Tabs';
import Accordion from './components/Accordion';

import './temp/tempcss.css';

export default class App extends Component {
  render() {
    return (
      <Fragment>
        <main>
          <Accordion accordionClass='accordion'>
            <div label='First Section'>
              <p>Paragraph inside first section</p>
            </div>
            <div label='Second Section'>
              <p>Paragraph inside second section</p>
            </div>
            <div label='Third Section'>
              <p>Paragraph inside third section</p>
            </div>
          </Accordion>
        </main>
        <footer>
          <Tabs tabsClass='footer__tabs'>
            <div label='First'>This is the first tab.</div>
            <div label='Second'>This is the second tab.</div>
            <div label='Third'>This is the third tab.</div>
          </Tabs>
        </footer>
      </Fragment>
    );
  }
}
