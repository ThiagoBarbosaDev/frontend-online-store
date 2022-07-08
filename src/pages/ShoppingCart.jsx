import React from 'react';
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

  render() {
    return (
      <div>
        ShoppingCart
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>
        {this.renderCartData()}
      </div>
    );
  }
}

export default ShoppingCart;
