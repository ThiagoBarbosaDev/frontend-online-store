import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromCategoryAndQuery, getCategories } from '../services/api';
import Button from '../Components/Button';
import CardItem from '../Components/CardItem';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      queryData: [],
      categories: [],
      cartItems: 0,
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    const categories = await getCategories();
    this.setState({ categories });
  };

  onClick = async (id) => {
    const queryData = await getProductsFromCategoryAndQuery(id);
    this.setState({ queryData: queryData.results });
  }

  renderCategories = () => {
    const { categories } = this.state;
    return categories.map((data) => (
      <Button
        onClick={ () => this.onClick(data.id) }
        type="button"
        data-testid="category"
        key={ data.id }
      >
        {data.name}
      </Button>
    ));
  };

  fetchAPI = async () => {
    const { inputSearch } = this.state;
    const queryData = await getProductsFromCategoryAndQuery('', inputSearch);
    this.setState({ queryData: queryData.results });
  }

  renderCards = () => {
    const { queryData } = this.state;
    const data = queryData;
    return data.map((item) => (<CardItem
      key={ item.id }
      data={ item }
      onClick={ this.saveToCart }
    />));
  }

  handleInput = (e) => {
    this.setState({
      inputSearch: e.target.value,
    });
  }

  saveToCart = (newCartItemData) => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const getCartData = () => JSON.parse(localStorage.getItem('cartItems'));
    const existingCartData = getCartData();
    const updatedCart = [...existingCartData, newCartItemData];
    this.setState({ cartItems: updatedCart.length });
    const saveCartData = () => localStorage
      .setItem('cartItems', JSON.stringify(updatedCart));
    saveCartData();
  }

  render() {
    const { inputSearch, queryData, cartItems } = this.state;
    return (
      <div>
        <input
          onChange={ this.handleInput }
          value={ inputSearch }
          type="text"
          data-testid="query-input"
        />
        <Button
          onClick={ this.fetchAPI }
          type="button"
          dataTestId="query-button"
        >
          Search
        </Button>
        <Link to="/cart" data-testid="shopping-cart-button">
          Cart
        </Link>
        <span data-testid="shopping-cart-size">
          {cartItems}
        </span>
        <div>{this.renderCategories()}</div>
        { queryData.length ? this.renderCards() : <p>Nenhum produto foi encontrado</p> }
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>

    );
  }
}

export default Home;
