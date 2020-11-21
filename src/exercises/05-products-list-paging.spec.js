import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import nock from 'nock';
import { getDisplayedProducts, renderComponent } from './utils/products-list-utils';

describe('ProductsList Paging', () => {
    const products = [
        { id: '2', name: 'Apple', shortDescription: '' },
        { id: '5', name: 'Apple 10', shortDescription: '' },
        { id: '4', name: 'Apple 11', shortDescription: '' },
        { id: '3', name: 'Apple 12', shortDescription: '' },
        { id: '6', name: 'Apple 9', shortDescription: '' },
        { id: '1', name: 'Samsung', shortDescription: '' }
    ];

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    it('should show maximum 5 products by default', async () => {
        await renderComponent(products);

        const productsNames = await getDisplayedProducts();

        expect(productsNames).toEqual(['Apple', 'Apple 10', 'Apple 11', 'Apple 12', 'Apple 9']);
    });


    // TODO: Napisz test, który zmieni stronę i zweryfikuje, że odpowiednie produkty zostały wyświetlone
    it('should show next products when changed page', async () => {
        await renderComponent(products);

        userEvent.click(screen.getByRole('button', { name: /Następne/ }));

        expect(await getDisplayedProducts()).toEqual(['Samsung']);
    });

    // TODO: Napisz test, który zweryfikuje funkcjonalność zmiany liczby produktów na stronie
    it('should change items per page', async () => {
        await renderComponent(products);

        const select = screen.getByLabelText('Rozmiar strony:');
        userEvent.selectOptions(select, '10');

        expect(await getDisplayedProducts()).toEqual(['Apple', 'Apple 10', 'Apple 11', 'Apple 12', 'Apple 9', 'Samsung']);
    });
});
