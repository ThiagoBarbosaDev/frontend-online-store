import React from 'react';
import PropTypes from 'prop-types';

class CardItem extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <div
        data-testid="product"
      >
        <p>{ data.title }</p>
        <img
          src={ data.thumbnail }
          alt="imagem produto"
        />
        <p>{ data.price }</p>

      </div>
    );
  }
}

export default CardItem;

CardItem.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
