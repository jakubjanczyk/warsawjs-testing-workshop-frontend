import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../products-list/SearchBar/SearchBar';
import React from 'react';

describe('SearchBar', () => {

    const getInputAndTypeText = text => {
        const input = screen.getByPlaceholderText('Szukaj produktu...');
        userEvent.type(input, text);
        return input;
    };

    const getClearButton = () => {
        return screen.queryByRole('button', { name: /Wyczyść/ });
    };

    it('should show typed text in input', () => {
        render(<SearchBar />);

        const input = getInputAndTypeText('samsung');

        expect(input).toHaveDisplayValue('samsung');
    });

    it('should not show clear button when no text typed', () => {
        render(<SearchBar />);

        const clearButton = getClearButton();

        expect(clearButton).not.toBeInTheDocument();
    });

    it('should show clear button when some text typed', () => {
        render(<SearchBar />);

        getInputAndTypeText('samsung');
        const clearButton = getClearButton();

        expect(clearButton).toBeInTheDocument();
    });

    // TODO Zadania:
    // 1. Napisz test który sprawdzi, że po kliknięciu przycisku "Wyczyść" uprzednio wprowadzony tekst zostanie usunięty

    // 2. Napisz test który sprawdzi, że przycisk "Szukaj" będzie miał status disabled gdy brak tekstu

    // 3. Napisz test który sprawdzi, że funkcja onSearch zostanie odpalona z odpowiednim tekstem, gdy wpisano tekst i kliknięto przycisk
    // HINT: użyj asercji toHaveBeenCalledWith()
});
