import { cleanup, render, screen, within } from '@testing-library/react';
import React from 'react';
import nock from 'nock';
import { Provider } from 'react-redux';
import { getStore } from '../store';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Basket } from '../basket/Basket';

describe('Basket Page', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    const renderComponent = initialState => {
        const store = getStore(initialState);
        render(
          <BrowserRouter>
              <Provider store={store}>
                  <Basket />
              </Provider>
          </BrowserRouter>
        );
    };

    it('should display products from basket', async () => {
        const initialState = {
            basket: [
                {id: '1', name: 'Samsung', count: 1, remaining: 10, price: 1200.0},
                {id: '2', name: 'Apple', count: 2, remaining: 10, price: 1500.0}
            ]
        }
        renderComponent(initialState);

        const basketItems = screen.getAllByTestId('product-name');

        expect(basketItems.map(item => item.textContent)).toEqual(['Samsung', 'Apple']);
    });

    // TODO: Napisz test, który sprawdzi, że wyświetlona została poprawna suma cen produktów
    it('should display total price for all items', async () => {

    });

    // TODO: Napisz test, który usunie jeden z produktów z koszyka
    it('should remove product from basket', async () => {

    });

    // TODO: Napisz test, który zmieni ilość jednego z produktów
    it('should allow to add amount to one of the product and change price', async () => {

    });
});
