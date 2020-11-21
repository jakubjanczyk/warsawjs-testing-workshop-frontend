import React from 'react';
import { Button } from '../components/Button/Button';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../components/Input/Input';

// https://github.com/testing-library/jest-dom

describe('Button', () => {

    it('should render provided text', () => {
        render(<Button>Tekst na przycisku</Button>)

        const buttonElement = screen.getByRole('button');

        expect(buttonElement).toHaveTextContent('Tekst na przycisku');
    });

    it('should allow to disable button', () => {
        render(<Button disabled>Tekst</Button>);

        const buttonElement = screen.getByRole('button');

        expect(buttonElement).toBeDisabled();
    });

    it('should make a callback when button clicked', () => {
        const clickHandler = jest.fn();
        render(<Button onClick={clickHandler}>Tekst</Button>);

        const buttonElement = screen.getByRole('button');
        userEvent.click(buttonElement);

        expect(clickHandler).toHaveBeenCalled();
    });
});

describe('Input', () => {
    // TODO: Napisz testy komponentu Input

    // 1. Zweryfikuj że wprowadzona wartość jest wyświetlana
    // HINT: wartość podawana jest poprzez property "value"
    // HINT: możesz użyć metod screen.getByPlaceholderText(text) albo screen.getByRole() w celu odnalezienia inputu w drzewie dom
    // HINT: w razie potrzeby możesz użyć metody screen.debug() w celu wyświetlenia wyrenderowanego komponentu
    it('should display provided value', () => {
        render(<Input placeholder={'Szukaj...'} value={'wartość'}/>)

        const input = screen.getByPlaceholderText('Szukaj...');

        expect(input).toHaveDisplayValue('wartość');
    });

    // 2. Zweryfikuj, że callback onChange zostanie odpalony gdy zmienimy tekst inputa
    // HINT: użyj metody z obiektu userEvent w celu zmiany tekstu
    // HINT: użyj zamockowanej metody w celu weryfikacji
    it('should make a callback when value changed', () => {
        const changeHandler = jest.fn();
        render(<Input placeholder={'Szukaj...'} onChange={changeHandler} />);

        const input = screen.getByPlaceholderText('Szukaj...');
        userEvent.type(input, 'nowa wartość')

        expect(changeHandler).toHaveBeenCalledWith('nowa wartość');
    });

});
