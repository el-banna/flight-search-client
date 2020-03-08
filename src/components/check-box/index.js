import React, { useState } from 'react';
import styles from './check-box.module.scss';

function CheckBox({ label, initState, onDataChange }) {
  const [isChecked, setIsChecked] = useState(initState);

  function handleInputChange(event) {
    setIsChecked(event.target.checked);
    onDataChange(event.target.checked);
  }

  return (
    <label className={styles['container']}>{label}
      <input className={styles['original-checkbox']} id="non-stop-flights" type="checkbox" checked={isChecked} onChange={handleInputChange} />
      <span className={styles['custom-checkbox']}></span>
    </label>
  );
}

export default CheckBox;