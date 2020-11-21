import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import nock from 'nock';
import { MemoryRouter, Route } from 'react-router';
import { ProductPage } from '../product/Product';
import { Provider } from 'react-redux';
import { getStore } from '../store';
import userEvent from '@testing-library/user-event';

describe('Product Page', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    const givenProduct = (product) => {
        nock('http://localhost')
          .get(`/products/${product.id}`)
          .once()
          .reply(200, product);
    };

    const renderComponent = async (store = getStore()) => {
        render(
          <MemoryRouter initialEntries={['/products/1']}>
              <Provider store={store}>
                  <Route path="/products/:id" component={ProductPage} />
              </Provider>
          </MemoryRouter>
        );
        await waitForElementToBeRemoved(() => screen.getByText('Wczytywanie...'));
    };
    it('should display name of a product', async () => {
        givenProduct({ id: '1', name: 'Samsung', price: 1200.00, remaining: 10 });
        await renderComponent();

        const nameElement = screen.getByText('Samsung');

        expect(nameElement).toBeInTheDocument();
    });

    // TODO: Napisz test sprawdzający, że wyświetlona jest poprawna cena produktu
    // HINT: cena wyświetlana jest w formacie "500.30"
    it('should display price of a product', async () => {
        givenProduct({ id: '1', name: 'Samsung', price: 1200.00, remaining: 10 });
        await renderComponent();

        const priceElement = screen.getByText(/1200\.00/);

        expect(priceElement).toBeInTheDocument();
    });

    // TODO: Napisz test sprawdzający, że wyświetlona jest informacja o niedostępny produkcie, oraz że nie pojawia się wtedy przycisk dodania do koszyka
    it('should display unavailable product', async () => {
        givenProduct({ id: '1', name: 'Samsung', price: 1200.00, remaining: 0 });
        await renderComponent();

        expect(screen.queryByText(/1200\.00/)).not.toBeInTheDocument();
        expect(screen.getByText('Produkt niedostępny')).toBeInTheDocument();
        expect(screen.queryByText('button', {name: /Do koszyka/i})).not.toBeInTheDocument();
    });


    // TODO: Napisz test który doda produkt do koszyka
    it('should add product to the basket', async () => {
        givenProduct({ id: '1', name: 'Samsung', price: 1200.00, remaining: 10 });
        await renderComponent();

        const addButton = screen.getByRole('button', {name: /Do koszyka/i});
        userEvent.click(addButton);

        expect(addButton).not.toBeInTheDocument();
        expect(screen.getByText('Produkt w koszyku')).toBeInTheDocument();
    });

    // DEMO
    it('should put product into a basket store', async () => {
        givenProduct({ id: '1', name: 'Samsung', price: 1200.00, remaining: 10 });
        const store = getStore();
        await renderComponent(store);

        const addButton = screen.getByRole('button', {name: /Do koszyka/i});
        userEvent.click(addButton);

        expect(store.getState().basket).toContainEqual({id: '1', name: 'Samsung', price: 1200.00, remaining: 10, count: 1});
    });
});
