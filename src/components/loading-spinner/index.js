import React from 'react';
import styles from './loading-spinner.module.scss';

/**
 * This is taken from the website https://tobiasahlin.com/spinkit/
 */
function LoadingSpinner() {
  return (
    <div className={styles["sk-fading-circle"]}>
      <div className={`${styles["sk-circle1"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle2"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle3"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle4"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle5"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle6"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle7"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle8"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle9"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle10"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle11"]} ${styles["sk-circle"]}`}></div>
      <div className={`${styles["sk-circle12"]} ${styles["sk-circle"]}`}></div>
    </div>
  )
}

export default LoadingSpinner;