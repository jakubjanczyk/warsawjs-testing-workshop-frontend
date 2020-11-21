import './App.css';
import { Route, Switch } from 'react-router';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ProductsList } from './products-list/ProductsList';
import { ProductPage } from './product/Product';
import { Header } from './Header';
import { Basket } from './basket/Basket';
import { Order } from './order/Order';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className={'mainContent'}>
          <Switch>
            <Route path={'/basket'} component={Basket} />
            <Route path={'/order'} component={Order} />
            <Route path={'/products/:id'} component={ProductPage} />
            <Route path={'/'} component={ProductsList} />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
