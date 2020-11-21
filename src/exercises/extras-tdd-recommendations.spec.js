import { cleanup } from '@testing-library/react';
import React from 'react';
import nock from 'nock';

describe('Recommendations TDD', () => {

    beforeEach(() => {
        nock.cleanAll();
    });

    afterEach(cleanup);

    it.skip('', () => {

    })

    // TODO: Stwórz komponent wyświetlający rekomendowane produkty
    // 1. Komponent powinien dostać listę rekomendowanych produktów
    // 2. Komponent powinien wyświetlić pierwsze 3 produkty
    // 3. Komponent powinien móc przejść na kolejną stronę, gdy więcej niż 3 rekomendacje
    // 3. Komponent powinien móc przejść na poprzednią stronę, gdy więcej niż 3 rekomendacje
    // 3. Gdy liczba rekomendacji jest niepodzielna przez 3 - pokazuj cyklicznie rekomendacje
});
