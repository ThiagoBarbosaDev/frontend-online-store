import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Components/Button';
import ShoppingCartItem from '../Components/ShoppingCartItem';

class ShoppingCart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartData: [],
    };
  }

  componentDidMount() {
    this.setState({ cartData: this.getCartData() });
  }

  getCartData = () => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }

    const getCartDataFromLocalStorage = () => JSON
      .parse(localStorage.getItem('cartItems'));
    const existingCartData = getCartDataFromLocalStorage();

    return existingCartData;
  }

  renderCartData = () => {
    const { cartData } = this.state;
    return cartData
      .map((cartItem) => <ShoppingCartItem key={ cartItem.id } data={ cartItem } />);
  }

  handleClick = async () => {
    const { history: { push } } = this.props;
    push('/checkout');
  }

  render() {
    return (
      <div>
        ShoppingCart
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
        {this.renderCartData()}
        <Button
          type="button"
          dataTestId="checkout-products"
          onClick={ this.handleClick }
        >
          Pagar
        </Button>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};

export default ShoppingCart;
