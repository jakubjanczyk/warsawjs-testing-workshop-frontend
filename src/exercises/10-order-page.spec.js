import { cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import nock from 'nock';
import { Provider } from 'react-redux';
import { getStore } from '../store';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Order } from '../order/Order';

describe('Order Page', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    it('should gather data and send order', async () => {
        // TODO: Napisz test, który przejdzie przez cały proces finalizacji zamówienia
        // 1. Ustaw stan koszyka
        // 2. wyrenderuj komponent Order
        // 3. Uzupełnij formularz wszystkimi wymaganymi danymi (ustaw płatność Kartą Kredytową)
        // 4. Sfinalizuj zamówienie przyciskiem
        // 5. Zweryfikuj, że pojawił się odpowiedni ekran oraz koszyk został wyczyszczony (w reduxie)


    });

    // HINT: początkowy stan ustaw w reduxie

    // HINT: przy finalizacji wysyłany jest request POST pod adres http://localhost/orders - użyj biblioteki nock:
    // nock(...).post(...).reply(...)
    // schemat body requestu: {basket: {id: string, count: number}[], details: {firstName: string, lastName: string, address: string, payment: string}}

    // HINT: pamiętaj o wyrenderowaniu Routera

    // HINT: pamiętaj o asynchroniczności po kliknięciu przycisku

    // HINT: iputy do wprowadzania tekstu najlepiej znaleźć po tekście etykiety (label)
});
