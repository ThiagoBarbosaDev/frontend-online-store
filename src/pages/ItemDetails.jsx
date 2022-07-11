import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../Components/Button';
import Input from '../Components/Input';
import UserReview from '../Components/UserReview';

class ItemDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      itemData: {},
      email: '',
      description: '',
      rating: 1,
      reviewData: [],
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchItemData(id);
    this.getReviewData();
  }

  getReviewData = () => {
    const reviewData = this.getCartData();
    this.setState({ reviewData });
  }

  getCartData = () => {
    if (!JSON.parse(localStorage.getItem('reviews'))) {
      localStorage.setItem('reviews', JSON.stringify([]));
    }
    const getReviewData = () => JSON
      .parse(localStorage.getItem('reviews'));
    const existingCartData = getReviewData();
    return existingCartData;
  }

  fetchItemData = async (id) => {
    const endPointUrl = `https://api.mercadolibre.com/items/${id}`;
    const response = await fetch(endPointUrl);
    const data = await response.json();
    this.setState({ itemData: data });
  }

  saveToCart = (key, newCartItemData) => {
    if (!JSON.parse(localStorage.getItem(key))) {
      localStorage.setItem(key, JSON.stringify([]));
    }
    const getCartData = () => JSON.parse(localStorage.getItem(key));
    const existingCartData = getCartData();
    const saveCartData = () => localStorage
      .setItem(key, JSON.stringify([...existingCartData, newCartItemData]));
    saveCartData();
  }

  handleChange = ({ target: { name, value } }) => this.setState({ [name]: value });

  handleClick = () => {
    const { email, description, rating } = this.state;
    this.setState((prvState) => ({
      email: '',
      description: '',
      reviewData: [...prvState.reviewData, {
        email,
        description,
        rating,
      }],
    }));
    this.saveToCart('reviews', { email, description, rating });
  }

  renderRateButtons = () => {
    const maxRating = 5;
    const buttonsValues = Array.from(Array(maxRating + 1).keys()).slice(1);
    return buttonsValues.map((rating) => (
      <Button
        dataTestId={ `${rating}-rating` }
        type="button"
        onClick={ () => this.setState({ rating }) }
        key={ rating }
      >
        {rating}
      </Button>
    ));
  }

  renderReviewCards = () => {
    const { reviewData } = this.state;
    return reviewData
      .map((review) => <UserReview data={ review } key={ review.email } />);
  }

  render() {
    const { itemData, email, description, reviewData } = this.state;
    return (
      <div>
        <section>
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
            onClick={ () => this.saveToCart('cartItems', itemData) }
          >
            Comprar
          </Button>
        </section>
        <form>
          <Input
            type="email"
            name="email"
            dataTestId="product-detail-email"
            onChange={ this.handleChange }
            value={ email }
          >
            Email:
          </Input>
          <textarea
            name="description"
            value={ description }
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
          />
          { this.renderRateButtons() }
          <Button
            dataTestId="submit-review-btn"
            type="button"
            onClick={ this.handleClick }
          >
            Enviar
          </Button>
        </form>
        <section>
          {reviewData.length && this.renderReviewCards()}
        </section>
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
