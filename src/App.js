import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ItemDetails from './pages/ItemDetails';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/cart" component={ ShoppingCart } />
          <Route exact path="/" component={ Home } />
          <Route path="/item/:id" component={ ItemDetails } />
          <Route path="/*" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
