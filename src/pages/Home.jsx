import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';
import Button from './Button';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
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

  renderCategories = () => {
    const { categories } = this.state;
    return categories.map((data) => (
      <Button
        onClick={ () => console.log('xablau') }
        type="button"
        data-testid="category"
        key={ data.id }
      >
        {data.name}
      </Button>
    ));
  };

  render() {
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          Cart
        </Link>
        <div>{this.renderCategories()}</div>
        <p data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </p>
      </div>
    );
  }
}

export default Home;
