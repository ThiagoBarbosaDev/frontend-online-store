import React from 'react';
import PropTypes from 'prop-types';

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
    console.log(data);
  }

  render() {
    const { itemData } = this.state;
    return (
      <div>
        <h3 data-testid="product-detail-name">{ itemData.title }</h3>
        <img
          alt="Imagem produto"
          src={ itemData.thumbnail }
        />
        <p>{ itemData.price }</p>
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
