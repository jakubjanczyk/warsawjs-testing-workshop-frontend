import React, { useEffect, useMemo, useState } from 'react';
import styles from './Products.module.css';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { Select } from '../../components/Select/Select';
import _ from 'lodash';

const itemsPerPageOptions = [
    {key: 5, label: '5'},
    {key: 10, label: '10'},
    {key: 15, label: '15'},
];

const sortOrderOptions = [
    {key: 'asc', label: 'A-Z'},
    {key: 'desc', label: 'Z-A'}
]

export const Products = ({ products = [] }) => {
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortOrder, setSortOrder] = useState('asc');

    const currentProducts = useMemo(() => {
        const pageStart = currentPage * itemsPerPage;
        const sorted = _.orderBy(products, 'name', sortOrder);
        return sorted.slice(pageStart, pageStart + itemsPerPage);
    }, [products, itemsPerPage, currentPage, sortOrder]);

    useEffect(() => {
        setCurrentPage(0);
    }, [products, itemsPerPage]);

    const maxPage = products.length < currentPage * itemsPerPage + itemsPerPage;

    return (
      <div className={styles.container}>
          <div className={styles.paging}>
              <div className={styles.pagingButtons}>
                  <Button disabled={currentPage === 0} onClick={() => setCurrentPage(page => page - 1)}>Poprzednie</Button>
                  <Button disabled={maxPage} onClick={() => setCurrentPage(page => page + 1)}>Następne</Button>
              </div>

              <label className={styles.perPageSelect}>
                  Rozmiar strony:
                  <Select className={styles.select} onSelect={setItemsPerPage} options={itemsPerPageOptions} selected={itemsPerPage}/>
              </label>
              <label className={styles.sortSelect}>
                  Sortuj:
                  <Select className={styles.select} onSelect={setSortOrder} options={sortOrderOptions} selected={sortOrder}/>
              </label>
          </div>
          <div className={styles.products} data-testid={'products'}>
              {
                  currentProducts.map(product => {
                      return (
                        <div className={styles.product} key={product.id} data-testid={'product'}>
                            <img
                              className={styles.productImage}
                              alt={product.name}
                              src={product.image}
                            />
                            <div className={styles.description}>
                                <Link to={`/products/${product.id}`}><h4>{product.name}</h4></Link>
                                <div>{product.shortDescription}</div>
                            </div>
                        </div>
                      );
                  })
              }
          </div>
      </div>
    );
};
