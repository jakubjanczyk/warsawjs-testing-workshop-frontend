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

    const getDisplayedBasketItems = () => screen.getAllByTestId('product-name').map(item => item.textContent);

    it('should display products from basket', async () => {
        const initialState = {
            basket: [
                {id: '1', name: 'Samsung', count: 1, remaining: 10, price: 1200.0},
                {id: '2', name: 'Apple', count: 2, remaining: 10, price: 1500.0}
            ]
        }
        renderComponent(initialState);

        expect(getDisplayedBasketItems()).toEqual(['Samsung', 'Apple']);
    });

    // TODO: Napisz test, który sprawdzi, że wyświetlona została poprawna suma cen produktów
    it('should display total price for all items', async () => {
        const initialState = {
            basket: [
                {id: '1', name: 'Samsung', count: 1, remaining: 10, price: 1200.0},
                {id: '2', name: 'Apple', count: 2, remaining: 10, price: 1500.0}
            ]
        }
        renderComponent(initialState);

        expect(screen.getByText(/Suma:/)).toHaveTextContent(/4200\.00/);
    });

    // TODO: Napisz test, który usunie jeden z produktów z koszyka
    it('should remove product from basket', async () => {
        const initialState = {
            basket: [
                {id: '1', name: 'Samsung', count: 1, remaining: 10, price: 1200.0},
                {id: '2', name: 'Apple', count: 2, remaining: 10, price: 1500.0}
            ]
        }
        renderComponent(initialState);

        const basketItemToRemove = screen.getByText(/Samsung/i, {selector: 'strong'}).closest('li');
        const removeButton = within(basketItemToRemove).getByRole('button', {name: /Usuń/i});
        userEvent.click(removeButton);

        expect(getDisplayedBasketItems()).toEqual(['Apple']);
    });

    // TODO: Napisz test, który zmieni ilość jednego z produktów
    it('should allow to add amount to one of the product and change price', async () => {
        const initialState = {
            basket: [
                {id: '1', name: 'Samsung', count: 1, remaining: 10, price: 1200.0},
                {id: '2', name: 'Apple', count: 2, remaining: 10, price: 1500.0}
            ]
        }
        renderComponent(initialState);

        const basketItem = screen.getByText(/Samsung/i, {selector: 'strong'}).closest('li');
        const increaseButton = within(basketItem).getByRole('button', {name: /\+/});
        userEvent.click(increaseButton);

        expect(screen.getByText(/Suma:/)).toHaveTextContent(/5400\.00/);
    });
});
