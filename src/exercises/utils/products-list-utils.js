import nock from 'nock';
import { render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ProductsList } from '../../products-list/ProductsList';
import userEvent from '@testing-library/user-event';
import _ from 'lodash';
import React from 'react';

export const givenProducts = (products) => {
    nock('http://localhost')
      .get('/products')
      .once()
      .reply(200, products);
};

export const givenFilteredProducts = (filters, products) => {
    nock('http://localhost')
      .get('/products')
      .query(filters)
      .once()
      .reply(200, products);
};

export const givenCategories = (categories = []) => {
    nock('http://localhost')
      .get('/categories')
      .once()
      .reply(200, categories);
};

export const renderComponent = async (products = [], categories = []) => {
    givenProducts(products);
    givenCategories(categories);
    render(<MemoryRouter><ProductsList /></MemoryRouter>);
    await waitForElementToBeRemoved(() => screen.getByText('Wczytywanie...'));
};

export const getDisplayedProducts = async () => {
    const productsContainer = await screen.findByTestId('products');
    const productsNames = await within(productsContainer).findAllByRole('heading', {level: 4});
    // const productsNames = await screen.findAllByTestId('product');

    return productsNames.map(item => item.textContent);
}

export const typeTextIntoSearchBar = typedText => {
    const input = screen.getByPlaceholderText('Szukaj produktu...');
    userEvent.type(input, typedText);
};
export const clickSearchButton = () => {
    userEvent.click(screen.getByRole('button', { name: /Szukaj/ }));
};

export const waitForProductsToBeDisplayed = async (expectedNames) => {
    return waitFor(async () => {
        const displayedNames = await getDisplayedProducts();
        return _.isEqual(displayedNames, expectedNames) ? Promise.resolve(displayedNames) : Promise.reject(displayedNames);
    });
}
