import React from 'react';
import PropTypes from 'prop-types';

class ShoppingCartItem extends React.Component {
  constructor() {
    super();
    this.state = {
      quantity: 1,
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { data: { available_quantity: qty } } = this.props;
    return nextState.quantity && nextState.quantity <= qty;
  }

  increaseItem = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  }

  decreaseItem = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity - 1 }));
  }

  render() {
    const { data } = this.props;
    const { quantity } = this.state;
    return (
      <li>
        <p data-testid="shopping-cart-product-name">{ data.title }</p>
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ this.decreaseItem }
        >
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">{ quantity }</p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ this.increaseItem }
        >
          +
        </button>
        <p>{ data.price }</p>
      </li>
    );
  }
}

ShoppingCartItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    available_quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default ShoppingCartItem;
