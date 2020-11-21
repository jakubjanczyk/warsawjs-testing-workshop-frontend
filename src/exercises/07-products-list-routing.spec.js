import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import { BrowserRouter } from 'react-router-dom';
import { givenCategories, givenProducts } from './utils/products-list-utils';

describe('ProductsList Routing', () => {
    it('should go to product page when clicked on product name', async () => {
        const products = [
            { id: '2', name: 'Apple', shortDescription: '' },
            { id: '1', name: 'Samsung', shortDescription: '' }
        ];
        givenProducts(products);
        givenCategories([]);
        render(<BrowserRouter><ProductsList /></BrowserRouter>);
        await waitForElementToBeRemoved(() => screen.getByText('Wczytywanie...'));

        const product = await screen.findByRole('heading', { level: 4, name: /samsung/i });
        userEvent.click(product);

        expect(window.location.pathname).toEqual('/products/1');
    });
});
