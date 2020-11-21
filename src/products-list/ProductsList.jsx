import React, { useEffect, useState } from 'react';
import { SearchBar } from './SearchBar/SearchBar';
import styles from './ProductsList.module.css';
import { Categories } from './Categories/Categories';
import { Products } from './Products/Products';
import { Page } from '../components/Page/Page';

const fetchProducts = (filters) => {
    const urlParams = new URLSearchParams();
    if (filters.text) {
        urlParams.append('name_like', filters.text);
    }
    if (filters.category) {
        urlParams.append('category', filters.category);
    }
    const url = '/products' + (urlParams.toString().length > 0 ? `?${urlParams.toString()}` : '');
    return fetch(url)
      .then(response => response.ok ? response.json() : []);
};

const fetchCategories = () =>
  fetch('/categories')
    .then(response => response.ok ? response.json() : []);

export const ProductsList = () => {
    const [products, setProducts] = useState(undefined);
    const [categories, setCategories] = useState(undefined);
    const [filters, setFilters] = useState({ text: '', category: undefined });

    useEffect(() => {
        fetchProducts(filters)
          .then(result => {
              setProducts(result);
          });
    }, [filters]);

    useEffect(() => {
        fetchCategories()
          .then(result => {
              setCategories(result);
          });
    }, []);

    const handleCategoryChange = (category) => setFilters((prev) => ({ ...prev, category }));
    const handleSearchTextChange = (text) => setFilters((prev) => ({ ...prev, text }));
    if (!categories || !products) {
        return (
          <Page>
              Wczytywanie...
          </Page>
        );
    }
    return (
      <Page>
          <div className={styles.container}>
              <Categories categories={categories} onSelect={handleCategoryChange} />
              <div>
                  <SearchBar onSearch={handleSearchTextChange} />
                  <Products products={products} />
              </div>
          </div>
      </Page>
    );
};
