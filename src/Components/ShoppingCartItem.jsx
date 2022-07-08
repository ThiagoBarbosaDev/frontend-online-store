import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCartItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <li>
        <p data-testid="shopping-cart-product-name">{ data.title }</p>
        <p data-testid="shopping-cart-product-quantity">1</p>
        <p>{ data.price }</p>
      </li>
    );
  }
}

ShoppingCartItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ShoppingCartItem;
