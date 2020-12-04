import React from 'react';
import ProductEntry from './ProductEntry.jsx';
//import styled from 'styled-components';
import styles from './styles.module.css';



const ProductList = ({products, page}) => { // display 5-7 products at a time depending on window size
  //sconsole.log('products list', products);

  let startIndex = (page - 1) * 7;
  let pageProducts = products.slice(startIndex, (startIndex + 7));

  return (
    <div className={styles.ProductCarousel}>
      {pageProducts.map((aProduct) => {
        return <ProductEntry props={aProduct}/>
      }
    )}
    </div>
  );
}

export default ProductList;