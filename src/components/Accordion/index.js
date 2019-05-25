import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { AccordionSection } from '../AccordionSection';

/*
    This is the component responsible for rendering the accordion menu.
    It receives a class name so you can create and style independent accordion menus.
    It holds which section is currently active to be rendered.
    It is implemented in a way to only allow one section open at a time.
*/
export default class Accordion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openSection: {}
    };
  }

  handleClick = sectionLabel => {
    const isOpen = !!this.state.openSection[sectionLabel];
    this.setState({
      openSection: {
        [sectionLabel]: !isOpen
      }
    });
  };

  render() {
    return (
      <div className={this.props.accordionClass}>
        {this.props.children.map(child => (
          <AccordionSection
            isOpen={!!this.state.openSection[child.props.label]}
            label={child.props.label}
            key={child.props.label}
            onClick={this.handleClick}
          >
            {child.props.children}
          </AccordionSection>
        ))}
      </div>
    );
  }
}

Accordion.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  accordionClass: PropTypes.string.isRequired
};
