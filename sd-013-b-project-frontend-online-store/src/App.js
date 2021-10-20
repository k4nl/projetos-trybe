import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cart from './pages/Cart';
import Homepage from './pages/Homepage';
import CardDetails from './pages/CardDetails';
import Pusharse from './pages/Pusharse';
import 'bulma/css/bulma.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Homepage } />
          <Route exact path="/cart" component={ Cart } />
          <Route path="/product/:categoryId/:query" component={ CardDetails } />
          <Route exact path="/pusharse" component={ Pusharse } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
