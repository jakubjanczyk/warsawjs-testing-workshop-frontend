import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Counter } from '../components/Counter/Counter';
import { Button } from '../components/Button/Button';
import styles from './Basket.module.css';
import { BackToList } from '../components/BackToList/BackToList';
import { changeCountInBasket, removeFromBasket } from '../actions/basket-actions';
import { calculateFullPrice, calculateProductPrice } from '../common/product-price';
import { calculateDeliveryFee } from '../common/delivery-fee';
import { Page } from '../components/Page/Page';

export const Basket = () => {
    const currentBasket = useSelector(state => state.basket);
    const dispatch = useDispatch();


    const handleProductCountChange = (product, count) => {
        dispatch(changeCountInBasket(product.id, count));
    };

    const handleProductRemove = (product) => {
        dispatch(removeFromBasket(product.id));
    };

    const fullPrice = calculateFullPrice(currentBasket);
    const { remainingToFreeDelivery, deliveryCost } = calculateDeliveryFee(fullPrice);
    return (
      <Page>
          <BackToList />
          <div className={styles.content}>
              {
                  currentBasket.length === 0
                    ? (
                      <h1 className={styles.noProducts}>Brak produktów w koszyku</h1>
                    )
                    : (
                      <div className={styles.productsContent}>
                          <h2 className={styles.basketHeader}>Produkty w koszyku:</h2>

                          <ul className={styles.products}>
                              {currentBasket.map(product => {
                                  return (
                                    <li className={styles.product} key={product.id}>
                                        <img className={styles.image} src={product.image} alt={product.name} />
                                        <Link to={`/products/${product.id}`}>
                                            <strong className={styles.name} data-testid={'product-name'}>
                                                {product.name}
                                            </strong>
                                        </Link>
                                        <div className={styles.productActions}>
                                            <div className={styles.counter}>
                                                <strong>Ilość:</strong>
                                                <Counter
                                                  initialValue={product.count}
                                                  onChange={(count) => handleProductCountChange(product, count)}
                                                  max={product.remaining}
                                                />
                                            </div>
                                            <div className={styles.remove}>
                                                <Button onClick={() => handleProductRemove(product)}>Usuń</Button>
                                            </div>
                                            <div>
                                                {calculateProductPrice(product).toFixed(2)}
                                            </div>
                                        </div>
                                    </li>
                                  );
                              })}
                              <li className={styles.deliveryCostContainer}>
                                  <div className={styles.deliveryCostTitle}>
                                      <strong>
                                          Dostawa
                                      </strong>
                                      {
                                          remainingToFreeDelivery > 0
                                            ? (
                                              <div className={styles.deliveryCostNotice}>
                                                  Zamów dodatkowo produkty za {remainingToFreeDelivery.toFixed(2)}, aby otrzymać darmową dostawę!
                                              </div>
                                            )
                                            : null
                                      }
                                  </div>

                                  <div className={styles.deliveryCost}>
                                      {deliveryCost.toFixed(2)}
                                  </div>
                              </li>
                          </ul>
                          <div className={styles.sum}>
                              <strong>Suma: {fullPrice.toFixed(2)}</strong>
                          </div>

                          <div className={styles.order}>
                              <Link to={'/order'}>
                                  <Button className={styles.orderButton}>
                                      Zamów
                                  </Button>
                              </Link>
                          </div>
                      </div>
                    )
              }
          </div>
      </Page>
    );
};
