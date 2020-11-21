import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

describe('ProductsList Routing', () => {
    it('should go to product page when clicked on product name', async () => {
        // DEMO
    });
});
