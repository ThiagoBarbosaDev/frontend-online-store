import React from 'react';
import { Link } from 'react-router-dom';

class ShoppingCartIcon extends React.Component {
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

  render() {
    const { cartData } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Cart
        </Link>
        <span data-testid="shopping-cart-size">
          {cartData.length}
        </span>
      </div>
    );
  }
}

export default ShoppingCartIcon;
