import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from './Button';

class CardItem extends React.Component {
  render() {
    const { data, onClick } = this.props;
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
          onClick={ () => onClick(data) }
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
  onClick: PropTypes.func.isRequired,
};
