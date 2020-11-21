import React, { useState } from 'react';
import { Input } from '../components/Input/Input';
import { Select } from '../components/Select/Select';
import { Button } from '../components/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { BackToList } from '../components/BackToList/BackToList';
import { clearBasket } from '../actions/basket-actions';
import styles from './Order.module.css';
import { Page } from '../components/Page/Page';
import { TextArea } from '../components/TextArea/TextArea';

const paymentOptions = [
    { key: 'online', label: 'Przelew online' },
    { key: 'card', label: 'Karta kredytowa' },
    { key: 'delivery', label: 'Za pobraniem' }
];

export const Order = () => {
    const basket = useSelector(state => state.basket);
    const dispatch = useDispatch();
    const [finalized, setFinalized] = useState(false);
    const [orderDetails, setOrderDetails] = useState({
        payment: 'online',
        firstName: '',
        lastName: '',
        address: ''
    });

    const changePayment = (payment) => setOrderDetails(prev => ({...prev, payment}));
    const changeFirstName = (firstName) => setOrderDetails(prev => ({...prev, firstName}));
    const changeLastName = (lastName) => setOrderDetails(prev => ({...prev, lastName}));
    const changeAddress = (address) => setOrderDetails(prev => ({...prev, address}));

    const finalizeOrder = (event) => {
        event.preventDefault();
        const body = {
            basket: basket.map(product => ({
                id: product.id,
                count: product.count
            })),
            details: orderDetails
        }
        fetch('/orders', { method: 'post', body: JSON.stringify(body) })
          .then(() => dispatch(clearBasket()))
          .then(() => setFinalized(true));
    }

    const validForm = orderDetails.firstName && orderDetails.lastName && orderDetails.address;

    if (basket.length === 0 && !finalized) {
        return <div/>
    }

    return (
      <Page>
          {!finalized ?
            (
              <div className={styles.notFinalizedPage}>
                  <BackToList/>
                  <h2 className={styles.header}>Podaj dane do zamówienia</h2>
              <form className={styles.form} onSubmit={finalizeOrder}>
                  <div className={styles.formElements}>
                      <label className={styles.formElement}>
                          <strong>Imię</strong>
                          <Input value={orderDetails.firstName} onChange={changeFirstName} />
                      </label>
                      <label className={styles.formElement}>
                          <strong>Nazwisko</strong>
                          <Input value={orderDetails.lastName} onChange={changeLastName} />
                      </label>
                      <label className={styles.formElement}>
                          <strong>Adres</strong>
                          <TextArea value={orderDetails.address} onChange={changeAddress} />
                      </label>
                      <label className={styles.formElement}>
                          <strong>Metoda płatności</strong>
                          <Select options={paymentOptions} selected={orderDetails.payment} onSelect={changePayment} />
                      </label>
                  </div>
                  <Button disabled={!validForm} type={'submit'}>Finalizacja zamówienia</Button>
              </form>
              </div>
            ) : (
              <div className={styles.finalizedPage}>
                  <h2>Dziękujemy! Zamówienie zostało złożone.</h2>
                  <BackToList />
              </div>
            )
          }
      </Page>
    );
};
