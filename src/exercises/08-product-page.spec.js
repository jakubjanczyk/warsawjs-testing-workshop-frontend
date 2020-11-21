import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import nock from 'nock';
import { MemoryRouter, Route } from 'react-router';
import { ProductPage } from '../product/Product';
import { Provider } from 'react-redux';
import { getStore } from '../store';
import userEvent from '@testing-library/user-event';

describe('Product Page', () => {


    it('should display name of a product', async () => {
        // DEMO
    });

    // TODO: Napisz test sprawdzający, że wyświetlona jest poprawna cena produktu
    // HINT: cena wyświetlana jest w formacie "500.30"
    it('should display price of a product', async () => {

    });

    // TODO: Napisz test sprawdzający, że wyświetlona jest informacja o niedostępny produkcie, oraz że nie pojawia się wtedy przycisk dodania do koszyka
    it('should display unavailable product', async () => {

    });


    // TODO: Napisz test który doda produkt do koszyka
    it('should add product to the basket', async () => {

    });

    // DEMO
    it('should put product into a basket store', async () => {

    });
});
