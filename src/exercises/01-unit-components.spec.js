import React from 'react';
import { Button } from '../components/Button/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input/Input';

// https://github.com/testing-library/jest-dom

describe('Button', () => {

    it('should render provided text', () => {
        // DEMO
    });

    it('should allow to disable button', () => {
        // DEMO
    });

    it('should make a callback when button clicked', () => {
        // DEMO
    });
});

describe('Input', () => {
    // TODO: Napisz testy komponentu Input

    // 1. Zweryfikuj że wprowadzona wartość jest wyświetlana
    // HINT: wartość podawana jest poprzez property "value"
    // HINT: możesz użyć metod screen.getByPlaceholderText(text) albo screen.getByRole() w celu odnalezienia inputu w drzewie dom
    // HINT: w razie potrzeby możesz użyć metody screen.debug() w celu wyświetlenia wyrenderowanego komponentu

    // 2. Zweryfikuj, że callback onChange zostanie odpalony gdy zmienimy tekst inputa
    // HINT: użyj metody z obiektu userEvent w celu zmiany tekstu
    // HINT: użyj zamockowanej metody w celu weryfikacji

});
