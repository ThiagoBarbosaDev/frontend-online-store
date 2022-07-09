import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import CardDetails from './CardDetails';

class CardItem extends React.Component {
  // handleId = (e) => {
  //   const { data } = e.target.value;
  //   return data.title;
  // }

  render() {
    const { data } = this.props;
    return (

      <div
        data-testid="product"
      >

        <Link
          // onClick={ this.handleId }
          to={ `/item/${data.id}` }
          data-testid="product-detail-link"
        >
          <div>
            <p>{ data.title }</p>
            <img
              src={ data.thumbnail }
              alt="imagem produto"
            />
            <p>{ data.price }</p>
          </div>
        </Link>
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
