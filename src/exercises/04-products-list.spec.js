import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import _ from 'lodash';

describe('ProductsList', () => {
    const defaultCategories = [{ key: 'smartfon', label: 'smartfon' }, { key: 'smartwatch', label: 'smartwatch' }];

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    const givenProducts = (products) => {
        nock('http://localhost')
          .get('/products')
          .once()
          .reply(200, products);
    };

    const givenFilteredProducts = (filters, products) => {
        nock('http://localhost')
          .get('/products')
          .query(filters)
          .once()
          .reply(200, products);
    };

    const givenCategories = (categories = defaultCategories) => {
        nock('http://localhost')
          .get('/categories')
          .once()
          .reply(200, categories);
    };

    const renderComponent = async (products = [], categories = defaultCategories) => {
        givenProducts([]);
        givenCategories(categories);
        render(<MemoryRouter><ProductsList /></MemoryRouter>);
        await waitForElementToBeRemoved(() => screen.getByText('Wczytywanie...'));
    };

    const getDisplayedProducts = async () => {
        const productsContainer = await screen.findByTestId('products');
        const productsNames = await within(productsContainer).findAllByRole('heading', {level: 4});
        // const productsNames = await screen.findAllByTestId('product');

        return productsNames.map(item => item.textContent);
    }

    const typeTextIntoSearchBar = typedText => {
        const input = screen.getByPlaceholderText('Szukaj produktu...');
        userEvent.type(input, typedText);
    };
    const clickSearchButton = () => {
        userEvent.click(screen.getByRole('button', { name: /Szukaj/ }));
    };
    const waitForProductsToBeDisplayed = async (expectedNames) => {
        return waitFor(async () => {
            const displayedNames = await getDisplayedProducts();
            return _.isEqual(displayedNames, expectedNames) ? Promise.resolve(displayedNames) : Promise.reject(displayedNames);
        });
    }

    it('should display available categories', async () => {
        const categories = [{ key: 'smartfon', label: 'smartfon' }, { key: 'smartwatch', label: 'smartwatch' }];
        await renderComponent([], categories);

        const items = screen.getAllByRole('listitem');

        expect(items.map(item => item.textContent)).toEqual(['smartfon', 'smartwatch']);
    });

    it('should display products on a list', async () => {
        const products = [{ id: '234', name: 'Apple', shortDescription: '' }, { id: '123', name: 'Samsung', shortDescription: '' }];
        await renderComponent(products);

        const displayedProductsNames = await getDisplayedProducts();

        expect(displayedProductsNames).toEqual(['Apple', 'Samsung']);
    });

    it('should filter list when searched for some text', async () => {
        const products = [{ id: '123', name: 'Samsung', shortDescription: '' }, { id: '234', name: 'Apple', shortDescription: '' }];
        await renderComponent(products);

        const typedText = 'Sams';
        givenFilteredProducts({name_like: typedText}, [{ id: '123', name: 'Samsung', shortDescription: '' }]);
        typeTextIntoSearchBar(typedText);
        clickSearchButton();

        const displayedProductNames = await waitForProductsToBeDisplayed(['Samsung']);

        expect(displayedProductNames).toEqual(['Samsung']);
    });

    // TODO: Napisz test weryfikujący, że po kliknięciu na kategorię przefiltrujemy listę produktów
    // HINT: zweryfikuj, że odpowiednie parametry zostały wysłane do API
    // HINT: poczekaj, aż produkty się przerenderują na stronie
    it('should filter list when selected some category', async () => {

    });
});
