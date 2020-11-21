import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import {
    clickSearchButton,
    getDisplayedProducts,
    givenCategories,
    givenFilteredProducts,
    givenProducts,
    typeTextIntoSearchBar, waitForProductsToBeDisplayed
} from './utils/products-list-utils';

describe('ProductsList', () => {
    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    const renderComponent = async (products = [], categories = []) => {
        givenProducts(products);
        givenCategories(categories);
        render(<MemoryRouter><ProductsList /></MemoryRouter>);
        await waitForElementToBeRemoved(() => screen.getByText('Wczytywanie...'));
    };

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
        const products = [{ id: '123', name: 'Samsung', shortDescription: '' }, { id: '234', name: 'Apple', shortDescription: '' }];
        const categories = [{ key: 'smartfon', label: 'smartfon' }, { key: 'smartwatch', label: 'smartwatch' }];
        await renderComponent(products, categories);

        const selectedCategory = 'smartfon';
        givenFilteredProducts({category: selectedCategory}, [{ id: '123', name: 'Samsung', shortDescription: '' }]);
        userEvent.click(screen.getByText(selectedCategory));
        const displayedProductNames = await waitForProductsToBeDisplayed(['Samsung']);

        expect(displayedProductNames).toEqual(['Samsung']);
    });
});
