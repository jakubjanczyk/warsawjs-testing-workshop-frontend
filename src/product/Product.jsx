import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './Product.module.css';
import { Button } from '../components/Button/Button';
import { Counter } from '../components/Counter/Counter';
import { ColorPicker } from './ColorPicker/ColorPicker';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket } from '../actions/basket-actions';
import { BackToList } from '../components/BackToList/BackToList';
import { calculateProductPrice } from '../common/product-price';
import { Page } from '../components/Page/Page';

export const ProductPage = () => {
    const dispatch = useDispatch();
    const currentBasket = useSelector(state => state.basket);
    const [product, setProduct] = useState(undefined);
    const [currentProductState, setCurrentProductState] = useState({ count: 1, color: undefined });
    const params = useParams();
    const productId = params.id;
    useEffect(() => {
        fetch(`/products/${productId}`)
          .then(response => response.json())
          .then(result => {
              setProduct(result);
              if (result.colors) {
                  setCurrentProductState((prev) => ({ ...prev, color: result.colors[0].key }));
              }
          });
    }, [productId]);


    const handleAddToBasket = () => {
        const productToAdd = {
            ...product,
            ...(currentProductState.color ? {color: currentProductState.color} : {}),
            count: currentProductState.count
        };
        dispatch(addToBasket(productToAdd));
    };

    if (!product) {
        return <div>Wczytywanie...</div>;
    }

    return (
      <Page>
          <BackToList />
          <div className={styles.productDetails}>
              <img className={styles.productImage} src={product.image} alt={product.name} />
              <div className={styles.productDescription}>
                  <h2>{product.name}</h2>
                  <div className={styles.descriptionElement}>
                      <strong className={styles.descriptionLabel}>Producent:</strong>
                      <div>{product.manufacturer}</div>
                  </div>
                  <div className={styles.descriptionElement}>
                      <strong className={styles.descriptionLabel}>Opis:</strong>
                      <div>{product.description}</div>
                  </div>
                  {product.colors ? (
                      <div className={styles.colorPicker}>
                          <strong>Kolor:</strong>
                          <ColorPicker
                            initial={product.colors[0].key}
                            colors={product.colors}
                            onChange={(color) => setCurrentProductState(prev => ({ ...prev, color }))}
                          />
                      </div>
                    )
                    : null
                  }
              </div>
              <div className={styles.buyContainer}>
                  {
                      product.remaining > 0
                        ? (
                          <>
                              <h2 className={styles.price}>Cena: {calculateProductPrice(product).toFixed(2)}</h2>
                              {
                                  currentBasket.find(basketItem => basketItem.id === product.id)
                                    ? (
                                      <strong>Produkt w koszyku</strong>
                                    )
                                    : (
                                      <>
                                          <div className={styles.productCounter}>
                                              <strong>Ilość</strong>
                                              <Counter initialValue={1} onChange={(count) => setCurrentProductState(prev => ({ ...prev, count }))}
                                                       max={product.remaining} />
                                          </div>
                                          <Button className={styles.addToBasket} onClick={handleAddToBasket}>Do koszyka</Button>
                                      </>
                                    )
                              }
                          </>
                        )
                        : (
                          <h2 className={styles.notAvailable}>Produkt niedostępny</h2>
                        )
                  }
              </div>
          </div>
      </Page>
    );
};
