import { cleanup } from '@testing-library/react';
import React from 'react';
import nock from 'nock';

describe.skip('Comments TDD', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    // TODO: stwórz komponent komentarzy za pomocą techniki TDD
    // 1. Komponent ten na wejściu powienien dostać ID produktu, na podstawie którego pobrane zostaną komentarze
    // HINT: użyj endpointu /products/:id/comments

    // 2. Komponent powinien wyświetlić wszystkie pobrane komentarze

    // 3. Komponent powinien pozwalać na wpisanie nowego komentarza - użytkownik musi wprowadzić nazwę użytkownika (pole "username") oraz treść komentarza (pole "comment")

    // 4. Komponent powinien pozwolić na opublikowanie komentarza za pomocą metody POST do adresu /products/:id/comments

    // 5. Opublikowany komentarz powinien pojawić się na liście komentarzy po poprawnym zapisaniu

    // 6. Powinna istnieć możliwość page'owania komentarzy - domyślnie wyświetla się 5 komentarzy

    // 7. Powinna istnieć możliwość przechodzenia na kolejną i poprzednią stronę komentarzy

    it('', () => {

    });
});
