import React from 'react';
import PropTypes from 'prop-types';

/*
  This component renders a single button on the tab menu
  It receives the onClick function as a prop and uses it
  to notify its parent when it's clicked
*/
export const Tab = props => {
  let className = 'tabs__btn';

  if (props.activeTab === props.label) {
    className += ' tabs__btn--clicked';
  }
  return (
    <li className={className} onClick={props.onClick}>
      {props.label}
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
