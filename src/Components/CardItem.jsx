import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

class CardItem extends React.Component {
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
    const { data } = this.props;
    return (
      <div data-testid="product">
        <Link
          to={ `/item/${data.id}` }
          data-testid="product-detail-link"
        >
          <div>
            <p>{data.title}</p>
            <img src={ data.thumbnail } alt="imagem produto" />
            <p>{data.price}</p>
          </div>
        </Link>
        <Button
          dataTestId="product-add-to-cart"
          type="button"
          onClick={ () => this.saveToCart(data) }
        >
          Comprar
        </Button>
      </div>
    );
  }
}

export default CardItem;

CardItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
