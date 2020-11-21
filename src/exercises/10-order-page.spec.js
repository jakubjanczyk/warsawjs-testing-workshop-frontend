import { cleanup, render, screen } from '@testing-library/react';
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

    const givenSendOrder = (basket, details) => {
        nock('http://localhost')
          .post('/orders', {
              basket: basket.map(product => ({
                  id: product.id,
                  count: product.count
              })),
              details
          })
          .reply(201, {});
    };
    const renderComponent = (store) => {
        render(
          <BrowserRouter>
              <Provider store={store}>
                  <Order />
              </Provider>
          </BrowserRouter>
        );
    };
    it('should gather data and send order', async () => {
        // TODO: Napisz test, który przejdzie przez cały proces finalizacji zamówienia
        // 1. Ustaw stan koszyka
        // 2. wyrenderuj komponent Order
        // 3. Uzupełnij formularz wszystkimi wymaganymi danymi (ustaw płatność Kartą Kredytową)
        // 4. Sfinalizuj zamówienie przyciskiem
        // 5. Zweryfikuj, że pojawił się odpowiedni ekran oraz koszyk został wyczyszczony (w reduxie)

        const basket = [
            { id: '1', name: 'Samsung', count: 1, remaining: 10, price: 1200.0 },
            { id: '2', name: 'Apple', count: 2, remaining: 10, price: 1500.0 }
        ];
        const personalDetails = {
            firstName: 'Jakub',
            lastName: 'Janczyk',
            address: 'Warszawa',
            payment: 'card'
        }
        givenSendOrder(basket, personalDetails);

        const store = getStore({ basket: basket });
        renderComponent(store);

        userEvent.type(screen.getByLabelText('Imię'), 'Jakub');
        userEvent.type(screen.getByLabelText('Nazwisko'), 'Janczyk');
        userEvent.type(screen.getByLabelText('Adres'), 'Warszawa');
        userEvent.selectOptions(screen.getByLabelText('Metoda płatności'), 'Karta kredytowa');

        userEvent.click(screen.getByRole('button', { name: 'Finalizacja zamówienia' }));

        expect(await screen.findByText('Dziękujemy! Zamówienie zostało złożone.')).toBeInTheDocument();
        expect(store.getState().basket).toHaveLength(0);
    });

    // HINT: początkowy stan ustaw w reduxie

    // HINT: przy finalizacji wysyłany jest request POST pod adres http://localhost/orders - użyj biblioteki nock:
    // nock(...).post(...).reply(...)
    // schemat body requestu: {basket: {id: string, count: number}[], details: {firstName: string, lastName: string, address: string, payment: string}}

    // HINT: pamiętaj o wyrenderowaniu Routera

    // HINT: pamiętaj o asynchroniczności po kliknięciu przycisku

    // HINT: iputy do wprowadzania tekstu najlepiej znaleźć po tekście etykiety (label)
});
