import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Categories } from '../products-list/Categories/Categories';

describe('Categories', () => {
    it('should display provided categories', () => {
        const categories = [{key: 'smartfon', label: 'smartfon'}, {key: 'smartwatch', label: 'smartwatch'}];
        render(<Categories categories={categories} />);

        const items = screen.getAllByRole('listitem');

        expect(items.map(item => item.textContent)).toEqual(['smartfon', 'smartwatch']);
    });

    it('should allow to select provided category', () => {
        const categories = [{key: 'smartfon', label: 'smartfon'}, {key: 'smartwatch', label: 'smartwatch'}];
        const handleSelect = jest.fn();
        render(<Categories categories={categories} onSelect={handleSelect} />);

        const item = screen.getByText('smartfon');
        userEvent.click(item);

        expect(handleSelect).toHaveBeenCalledWith('smartfon');
        expect(screen.getByTestId('selected-category')).toEqual(item);
    });
});
