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


    it('should display products from basket', async () => {
        // DEMO
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
