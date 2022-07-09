import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Components/Button';
import { Link } from 'react-router-dom';

class ItemDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      itemData: {},
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchItemData(id);
  }

  fetchItemData = async (id) => {
    const endPointUrl = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(endPointUrl);
    const data = await response.json();
    this.setState({ itemData: data });
  }

  saveToCart = (newCartItemData) => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const getCartData = () => JSON.parse(localStorage.getItem('cartItems'));
    const existingCartData = getCartData();
    const saveCartData = () => localStorage
      .setItem('cartItems', JSON.stringify([...existingCartData, newCartItemData]));
    saveCartData();
  }

  render() {
    const { itemData } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Cart
        </Link>
        <h3 data-testid="product-detail-name">{ itemData.title }</h3>
        <img
          alt="Imagem produto"
          src={ itemData.thumbnail }
        />
        <p>{ itemData.price }</p>
        <Button
          dataTestId="product-detail-add-to-cart"
          type="button"
          onClick={ () => this.saveToCart(itemData) }
        >
          Comprar
        </Button>
      </div>
    );
  }
}

export default ItemDetails;

ItemDetails.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape(
      { id: PropTypes.number.isRequired },
    ).isRequired,
    }.isRequired,
  ).isRequired,
};
