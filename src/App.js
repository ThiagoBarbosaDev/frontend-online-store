import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/cart" component={ ShoppingCart } />
          <Route exact path="/" component={ Home } />
          <Route path="/*" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
