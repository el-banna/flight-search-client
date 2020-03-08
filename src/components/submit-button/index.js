import React from 'react';
import styles from './submit-button.module.scss';
import { ReactComponent as SubmitArrow } from '../../assets/submit-arrow.svg';

function SubmitButton() {
  return (
    <button type="submit" className={styles['submit-button']}>
      <span className={styles['text']}>Search flights</span>
      <SubmitArrow />
    </button>
  );
}

export default SubmitButton;