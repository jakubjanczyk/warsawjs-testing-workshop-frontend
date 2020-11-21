import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { getDisplayedProducts, renderComponent } from './utils/products-list-utils';

describe('ProductsList Sorting', () => {
    const products = [
        { id: '2', name: 'Apple', shortDescription: '' },
        { id: '1', name: 'Samsung', shortDescription: '' },
        { id: '4', name: 'Apple 11', shortDescription: '' },
        { id: '3', name: 'Apple 12', shortDescription: '' },
        { id: '6', name: 'Apple 9', shortDescription: '' },
        { id: '5', name: 'Apple 10', shortDescription: '' }
    ];

    // TODO: Dodaj funkcjonalność sortowania przy pomocy TDD
    it('should by default sort alphabetically - ascending', async () => {
        await renderComponent(products);

        expect(await getDisplayedProducts()).toEqual(['Apple', 'Apple 10', 'Apple 11', 'Apple 12', 'Apple 9']);
    });

    it('should have ascending and descending options available to select', async () => {
        await renderComponent(products);

        const select = screen.getByLabelText('Sortuj:');
        const options = within(select).getAllByRole('option');

        expect(options.map(option => option.textContent)).toEqual(['A-Z', 'Z-A']);
    });

    it('should by default have selected ascending sort option', async () => {
        await renderComponent(products);

        expect(screen.getByLabelText('Sortuj:')).toHaveDisplayValue('A-Z');
    });

    it('should change sort order to descending', async () => {
        await renderComponent(products);

        const selectSort = screen.getByLabelText('Sortuj:');
        userEvent.selectOptions(selectSort, 'Z-A');

        expect(await getDisplayedProducts()).toEqual(['Samsung', 'Apple 9', 'Apple 12', 'Apple 11', 'Apple 10']);
    });
});
