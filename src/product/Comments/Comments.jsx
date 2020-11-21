import React, { useEffect, useRef, useState } from 'react';
import { Input } from '../../components/Input/Input';
import { TextArea } from '../../components/TextArea/TextArea';
import { Button } from '../../components/Button/Button';

export const Comments = ({ productId }) => {
    const [comments, setComments] = useState(undefined);
    const [newComment, setNewComment] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [page, setPage] = useState(0);
    const unmountedRef = useRef(false);

    useEffect(() => {
        fetch(`/products/${productId}/comments`)
          .then(response => response.json())
          .then(result => setComments(result));
        return () => unmountedRef.current = true;
    }, []);

    const publishComment = () => {
        fetch(`/products/${productId}/comments`, { method: 'post', body: JSON.stringify({ comment: newComment, username: newAuthor }) })
          .then(response => response.json())
          .then(newItem => {
              if (!unmountedRef.current) {
                  setComments((prev) => [...prev, newItem]);
                  setNewAuthor('');
                  setNewComment('');
              }
          });
    };

    const nextPage = () => setPage(prev => prev + 1)

    const previousPage = () => setPage(prev => prev - 1)

    if (!comments) {
        return (
          <div>Wczytywanie...</div>
        );
    }

    const displayedComments = comments.slice(page * 5, page + 5);

    return (
      <div>
          <div>
              <label>
                  Autor
                  <Input value={newAuthor} onChange={setNewAuthor}/>
              </label>
              <label>
                  Komentarz
                  <TextArea value={newComment} onChange={setNewComment}/>
              </label>
              <Button onClick={() => publishComment()}>Publikuj</Button>
          </div>
          <div>
              {
                  displayedComments.map(comment => {
                      return (
                        <div key={comment.id}>
                            <div data-testid={'comment-text'}>{comment.comment}</div>
                        </div>
                      );
                  })
              }
              <Button onClick={previousPage}>Poprzednie</Button>
              <Button onClick={nextPage}>Następne</Button>
          </div>
      </div>
    );
};
