import { cleanup, render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import React from 'react';
import nock from 'nock';
import { Comments } from '../product/Comments/Comments';
import userEvent from '@testing-library/user-event';

describe('Comments TDD', () => {

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

    const givenComments = (comments = []) => {
        nock('http://localhost')
          .get('/products/1/comments')
          .once()
          .reply(200, comments);
    };
    const renderComponent = async () => {
        render(<Comments productId={'1'} />);
        await waitForElementToBeRemoved(() => screen.getByText('Wczytywanie...'));
    };
    it('should display fetched comments', async () => {
        const comments = [
            { id: '1', comment: 'Komentarz 1', username: 'User 1' },
            { id: '2', comment: 'Komentarz 2', username: 'User 1' },
        ];
        givenComments(comments);
        await renderComponent();

        expect(await getDisplayedComments()).toEqual(['Komentarz 1', 'Komentarz 2']);
    });

    it('should allow to type new comment', async () => {
        givenComments([]);
        await renderComponent();

        userEvent.type(commentInput(), 'Nowy komentarz');

        expect(commentInput()).toHaveDisplayValue('Nowy komentarz');
    });

    it('should allow to type new author name', async () => {
        givenComments([]);
        await renderComponent();

        userEvent.type(authorInput(), 'User 1');

        expect(authorInput()).toHaveDisplayValue('User 1');
    });

    it('should allow to save new comment', async () => {
        givenComments([]);
        givenPublishComment({ comment: 'Nowy komentarz', username: 'User 1' });
        await renderComponent();

        userEvent.type(commentInput(), 'Nowy komentarz');
        userEvent.type(authorInput(), 'User 1');

        userEvent.click(screen.getByRole('button', { name: 'Publikuj' }));

        expect(await getDisplayedComments()).toEqual(['Nowy komentarz']);
    });

    it('should clear inputs on new comment', async () => {
        givenComments([]);
        givenPublishComment({ comment: 'Nowy komentarz', username: 'User 1' });
        await renderComponent();

        userEvent.type(commentInput(), 'Nowy komentarz');
        userEvent.type(authorInput(), 'User 1');
        userEvent.click(screen.getByRole('button', { name: 'Publikuj' }));

        expect(await screen.findByLabelText('Komentarz')).toHaveDisplayValue('');
        expect(await screen.findByLabelText('Autor')).toHaveDisplayValue('');
    });

    describe('paging', () => {
        const comments = [
            {id: '1', author: 'user', comment: 'Komentarz 1'},
            {id: '2', author: 'user', comment: 'Komentarz 2'},
            {id: '3', author: 'user', comment: 'Komentarz 3'},
            {id: '4', author: 'user', comment: 'Komentarz 4'},
            {id: '5', author: 'user', comment: 'Komentarz 5'},
            {id: '6', author: 'user', comment: 'Komentarz 6'},
        ];
        beforeEach(() => {
            givenComments(comments);
        })

        it('should render at most 5 comments by default', async () => {
            await renderComponent();

            expect(await getDisplayedComments()).toEqual([
                'Komentarz 1',
                'Komentarz 2',
                'Komentarz 3',
                'Komentarz 4',
                'Komentarz 5'
            ]);
        });

        it('should allow to switch to the next page', async () => {
            await renderComponent();

            userEvent.click(screen.getByRole('button', { name: 'Następne' }));

            expect(await getDisplayedComments()).toEqual([
                'Komentarz 6'
            ]);
        });

        it('should allow to switch back to the previous page', async () => {
            await renderComponent();

            userEvent.click(screen.getByRole('button', { name: 'Następne' }));
            userEvent.click(screen.getByRole('button', { name: 'Poprzednie' }));

            expect(await getDisplayedComments()).toEqual([
                'Komentarz 1',
                'Komentarz 2',
                'Komentarz 3',
                'Komentarz 4',
                'Komentarz 5'
            ]);
        });
    });

    // TODO: add more cases

    const commentInput = () => screen.getByLabelText('Komentarz');

    const authorInput = () => screen.getByLabelText('Autor');

    const getDisplayedComments = async () => {
        const comments = await screen.findAllByTestId('comment-text');
        return comments.map(comment => comment.textContent);
    };

    const givenPublishComment = (comment) => {
        nock('http://localhost')
          .post('/products/1/comments', comment)
          .once()
          .reply(201, { ...comment, id: '123' });
    };
});
