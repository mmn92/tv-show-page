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

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (Array.isArray(this.props.children)) {
      this.setState({
        activeTab: this.props.children[0].props.label
      });
    } else {
      this.setState({
        activeTab: this.props.children.props.label
      });
    }
  }

  handleClick = tabLabel => {
    this.setState({
      activeTab: tabLabel
    });
  };

  render() {
    return (
      <div className={this.props.tabsClass}>
        <ol className='tabs__list'>
          {Array.isArray(this.props.children) ? (
            this.props.children.map(child => {
              const { label } = child.props;
              return (
                <Tab
                  activeTab={this.state.activeTab}
                  key={label}
                  label={label}
                  onClick={this.handleClick}
                />
              );
            })
          ) : (
            <Tab
              activeTab={this.state.activeTab}
              key={this.props.children.props.label}
              label={this.props.children.props.label}
              onClick={this.handleClick}
            />
          )}
        </ol>
        <div className='tabs__content'>
          {Array.isArray(this.props.children)
            ? this.props.children.filter(child =>
                child.props.label === this.state.activeTab
                  ? child.props.children
                  : undefined
              )
            : this.props.children.props.children}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = {
  tabsClass: PropTypes.string.isRequired
};
