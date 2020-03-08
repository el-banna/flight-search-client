import React, { useState } from 'react';
import styles from './additional-travel-info.module.scss';
import { ReactComponent as ArrowDown } from '../../assets/arrow-down.svg';

function AdditionalTravelInfo({ onDataChange, initData }) {

  const [cabinClass, setCabinClass] = useState(initData.cabinClass);
  const [noOfAdults, setNoOfAdults] = useState(initData.noOfAdults);
  const [noOfChildren, setNoOfChildren] = useState(initData.noOfChildren);

  const [isBoxOpened, setIsBoxOpened] = useState(false);

  function triggerBoxOpenState() {
    setIsBoxOpened(!isBoxOpened);
  }

  function onCabinClassChange(event) {
    setCabinClass(event.target.value);
  }

  function changeNoOfPassengers(type, operation) {
    if (type === 'noOfAdults') {
      operation === "+" ? setNoOfAdults(noOfAdults + 1) : setNoOfAdults(noOfAdults - 1);
    } else {
      operation === "+" ? setNoOfChildren(noOfChildren + 1) : setNoOfChildren(noOfChildren - 1);
    }
  }

  function onDone() {
    onDataChange({
      cabinClass,
      noOfAdults,
      noOfChildren
    });
    triggerBoxOpenState();
  }

  return (
    <div className={styles['container']}>
      <div className={styles['input-preview-container']} onClick={triggerBoxOpenState}>
        <span>{`${noOfAdults + noOfChildren} traveler(s), ${cabinClass}`}</span>
        <ArrowDown className={styles['arrow-down']} />
      </div>

      {isBoxOpened && <div className={styles['arrow-up']}></div>}

      {isBoxOpened &&
        <div className={styles['controls']}>
          <div className={styles['mini-form-container']}>
            <label>Cabin Class</label>
            <div className={styles['mini-form-control']}>
              <ArrowDown className={styles['arrow-down']} />
              <select className={styles['class-select']} value={cabinClass} onChange={onCabinClassChange}>
                <option value="Economy">Economy</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          <div className={styles['mini-form-container']}>
            <label>Adults</label>
            <div className={styles['number-controls']}>
              <button disabled={noOfAdults === 0} className={styles['number-button']} type="button" onClick={changeNoOfPassengers.bind(this, "noOfAdults", "-")}>–</button>
              <span className={styles['number-text']}>{noOfAdults}</span>
              <button className={styles['number-button']} type="button" onClick={changeNoOfPassengers.bind(this, "noOfAdults", "+")}>+</button>
              <span className={styles['number-control-bonus-info']}>16+ years</span>
            </div>
          </div>

          <div className={styles['mini-form-container']}>
            <label>Children</label>
            <div className={styles['number-controls']}>
              <button disabled={noOfChildren === 0} className={styles['number-button']} type="button" onClick={changeNoOfPassengers.bind(this, "noOfChildren", "-")}>–</button>
              <span className={styles['number-text']}>{noOfChildren}</span>
              <button className={styles['number-button']} type="button" onClick={changeNoOfPassengers.bind(this, "noOfChildren", "+")}>+</button>
              <span className={styles['number-control-bonus-info']}>0-15 years</span>
            </div>
          </div>

          <div className={styles['done-button']}>
            <button type="button" onClick={onDone}>Done</button>
          </div>
        </div>
      }
    </div>
  );
}

export default AdditionalTravelInfo;
