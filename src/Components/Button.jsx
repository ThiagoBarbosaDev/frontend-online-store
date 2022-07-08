import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  render() {
    const { dataTestId, children, type, onClick,
      ...otherProps } = this.props;
    return (
      <button
        data-testid={ dataTestId }
        type={ type === 'button' ? 'button' : 'submit' }
        onClick={ onClick }
        { ...otherProps }
      >
        { children }
      </button>
    );
  }
}
Button.propTypes = {
  type: PropTypes.string,
  dataTestId: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {
  type: 'button',
  dataTestId: '',
  children: '',
};
export default Button;
