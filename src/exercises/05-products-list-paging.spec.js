import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

describe('ProductsList Paging', () => {

    it('should show maximum 5 products by default', async () => {
        // DEMO
    });


    // TODO: Napisz test, który zmieni stronę i zweryfikuje, że odpowiednie produkty zostały wyświetlone
    it('should show next products when changed page', async () => {

    });

    // TODO: Napisz test, który zweryfikuje funkcjonalność zmiany liczby produktów na stronie
    it('should change items per page', async () => {

    });
});
