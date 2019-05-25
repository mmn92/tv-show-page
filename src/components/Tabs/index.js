import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tab } from '../Tab';

/* 
    This is a generic Tab component for a tab menu
    It receives a class name so you can create and style independent tab menus
    It holds which tab is currently active and renders it
*/
export default class Tabs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: ''
    };
  }

  componentDidMount() {
    this.setState({
      activeTab: this.props.children[0].props.label
    });
  }

  handleClick = tabLabel => {
    this.setState({
      activeTab: tabLabel
    });
  };

  render() {
    return (
      <div className={this.props.tabClass}>
        <ol className='tabs__list'>
          {this.props.children.map(child => {
            const { label } = child.props;
            return (
              <Tab
                activeTab={this.state.activeTab}
                key={label}
                label={label}
                onClick={this.handleClick}
              />
            );
          })}
        </ol>
        <div className='tabs__content'>
          {this.props.children.filter(child =>
            child.props.label === this.state.activeTab
              ? child.props.children
              : undefined
          )}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
  tabsClass: PropTypes.string.isRequired
};
