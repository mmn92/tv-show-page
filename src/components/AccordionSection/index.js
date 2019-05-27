import React from 'react';
import PropTypes from 'prop-types';

/*
    This component is responsible for rendering the header and the
    content of a single accordion menu section.
    The onClick function passed as a props is used to notify its parent
    when a section is clicked.
*/
export const AccordionSection = props => {
  let className = 'accordion__section';

  if (props.isOpen) {
    className += ' accordion__section--open';
  }

  return (
    <div className={className}>
      <div className='section__header' onClick={props.onClick}>
        {props.label}
        <div className='icon'>{!props.isOpen && 'ICON'}</div>
      </div>
      {props.isOpen && <div className='section__content'>{props.children}</div>}
    </div>
  );
};

AccordionSection.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
