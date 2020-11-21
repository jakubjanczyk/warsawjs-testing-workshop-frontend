import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

describe('ProductsList', () => {
    it('should display available categories', async () => {
        // DEMO
    });

    it('should display products on a list', async () => {
        // DEMO
    });

    it('should filter list when searched for some text', async () => {
        // DEMO
    });

    // TODO: Napisz test weryfikujący, że po kliknięciu na kategorię przefiltrujemy listę produktów
    // HINT: zweryfikuj, że odpowiednie parametry zostały wysłane do API
    // HINT: poczekaj, aż produkty się przerenderują na stronie
    it('should filter list when selected some category', async () => {

    });
});
