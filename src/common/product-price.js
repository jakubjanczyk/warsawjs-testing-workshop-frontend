export const calculateProductPrice = (product) => {
    return product.price * (product.count || 1);
};

export const calculateFullPrice = (basket) => {
    return basket.reduce((sum, product) => sum + calculateProductPrice(product, product.color), 0);
};
