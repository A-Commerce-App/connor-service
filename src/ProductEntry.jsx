import React, { useState } from 'react';
// import styled from 'styled-components';
import styles from './styles.module.css';
const primeIcon = 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/primeCheck.png';
const emptyStar = 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/empty-star.png';
const halfStar = 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/half-star.png';
const fullStar = 'https://fec-related-items.s3-us-west-2.amazonaws.com/bars/full-star.png';

const ProductEntry = ({props}) => {

  // React hook to cycle through images on image hover
  const [currentImg, setImage] = useState(0);
  const setImgHelper = (run) => { // figure out how to use setInterval to cycle through images
    if(run) {
      setImage(1);
    } else {
      setImage(0);
    }
  }

  // adds stars
  let starRating = (rating) => {
    let fills = [];
    while(rating !== 0 || fills.length < 5) {
      if(rating - 2 >= 0) {
        fills.push(fullStar);
        rating -=2;
      } else if (rating -1 >= 0) {
        fills.push(halfStar);
        rating -= 1;
      } else {
        fills.push(emptyStar);
      }
    }
    return (
      <div>
        {fills.map((star) => {
          return <img className={styles.Stars} src={star}/>
        }
      )}
      <span> {props.numRatings}</span>
      </div>
    );
  }

  return (
    <div className={styles.Entry} onClick={() => console.log('This is where you would be redirected to', props.name)}>
      <div className={styles.HoverBox}>
        <img className={styles.ProdImg}
          src={props.image1}
          alt='productImg'
          onMouseEnter={() => setImgHelper(true)}
          onMouseLeave={() => setImgHelper(false)}
        />
        <div>{props.name}</div>
      </div>
      <div>{starRating(props.rating)}</div>
      <div className={styles.Price}>${props.price}<span>
        <img className={styles.Prime} hidden={props.prime} alt='primeIcon' src={primeIcon}/>
        </span>
      </div>

    </div>
  );
}

export default ProductEntry;