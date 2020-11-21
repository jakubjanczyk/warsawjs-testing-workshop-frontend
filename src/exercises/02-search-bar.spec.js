import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../products-list/SearchBar/SearchBar';
import React from 'react';

describe('SearchBar', () => {

    it('should show typed text in input', () => {
        // DEMO
    });

    it('should not show clear button when no text typed', () => {
        // DEMO
    });

    it('should show clear button when some text typed', () => {
        // DEMO
    });

    // TODO Zadania:
    // 1. Napisz test który sprawdzi, że po kliknięciu przycisku "Wyczyść" uprzednio wprowadzony tekst zostanie usunięty

    // 2. Napisz test który sprawdzi, że przycisk "Szukaj" będzie miał status disabled gdy brak tekstu

    // 3. Napisz test który sprawdzi, że funkcja onSearch zostanie odpalona z odpowiednim tekstem, gdy wpisano tekst i kliknięto przycisk
    // HINT: użyj asercji toHaveBeenCalledWith()
});
