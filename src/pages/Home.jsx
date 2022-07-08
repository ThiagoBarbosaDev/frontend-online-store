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
    console.log(queryData);
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
    // console.log(queryData);
  }

  renderCards = () => {
    const { queryData } = this.state;
    const data = queryData;
    console.log(queryData.results);
    return data.map((item) => <CardItem key={ item.id } data={ item } />);
  }

  handleInput = (e) => {
    this.setState({
      inputSearch: e.target.value,
    });
    // console.log(e.target.value);
  }

  render() {
    const { inputSearch, queryData } = this.state;
    // console.log(queryData.length);
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
        {/* <button
          onClick={ this.fetchAPI }
          type="button"
          data-testid="query-button"
        >
          Search
        </button> */}
        <Link to="/cart" data-testid="shopping-cart-button">
          Cart
        </Link>
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
