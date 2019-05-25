import React from 'react';
import PropTypes from 'prop-types';

export const Tab = props => {
  const onClick = () => {
    props.onClick(props.label);
  };

  let className = 'tabs__btn';

  if (props.activeTab === props.label) {
    className += ' tabs__btn--clicked';
  }
  return (
    <li className={className} onClick={onClick}>
      {props.label}
    </li>
  );
};

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};
