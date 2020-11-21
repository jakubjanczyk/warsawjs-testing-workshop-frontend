import { cleanup, render, screen, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ProductsList } from '../products-list/ProductsList';
import nock from 'nock';
import { MemoryRouter } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

describe('ProductsList Sorting', () => {

    // TODO: Dodaj funkcjonalność sortowania przy pomocy TDD
    it('should by default sort alphabetically - ascending', async () => {

    });

    it('should have ascending and descending options available to select', async () => {

    });

    it('should by default have selected ascending sort option', async () => {

    });

    it('should change sort order to descending', async () => {

    });
});
