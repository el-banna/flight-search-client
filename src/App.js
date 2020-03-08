import React, { useState, useEffect } from 'react';
import styles from './app.module.scss';
import AutoSuggest from './components/auto-suggest';
import DatePicker from './components/date-picker';
import CheckBox from './components/check-box';
import AdditionalTravelInfo from './components/additional-travel-info';
import SubmitButton from './components/submit-button';
import { ReactComponent as SwapIcon } from './assets/swap-arrows.svg'

function App() {
  const [formState, setFormState] = useState({
    fromAirport: "",
    toAirport: "",
    departDate: "",
    returnDate: "",
    isNonStopFlights: false,
    additionalInfo: {
      noOfAdults: 0,
      noOfChildren: 0,
      cabinClass: "Economy",
    },
  });
  const [isSwapButtonEnabled, setIsSwapButtonEnabled] = useState(false);

  useEffect(() => {
    if (formState.fromAirport && formState.toAirport) {
      setIsSwapButtonEnabled(true);
    }
  }, [formState])


  function onFormChange(formField, data) {
    setFormState({
      ...formState,
      [formField]: data
    });

  }

  function swapFromAndTo() {
    setFormState({
      ...formState,
      fromAirport: formState.toAirport,
      toAirport: formState.fromAirport
    });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    window.location = "https://www.google.com/travel/flights";
  }

  return (
    <div className={styles['App']}>
      <div className={styles['app-wrapper']}>
        <header className={styles['App-header']}>
          Where to next?
      </header>

        <form className={styles['form-container']} onSubmit={handleFormSubmit}>

          <div className={styles['higher-section']}>
            <div className={styles['form-item']}>
              <label>From</label>
              <AutoSuggest onAirportSelected={onFormChange.bind(this, "fromAirport")} selectedAirport={formState.fromAirport} />
            </div>

            <button className={styles['swap-button']} type="button" onClick={swapFromAndTo} disabled={!isSwapButtonEnabled}>
              <SwapIcon />
            </button>

            <div className={styles['form-item']}>
              <label>To</label>
              <AutoSuggest onAirportSelected={onFormChange.bind(this, "toAirport")} selectedAirport={formState.toAirport} />
            </div>

            <div className={styles['form-item-small']}>
              <label>Depart</label>
              <DatePicker onDateChange={onFormChange.bind(this, "departDate")} startDate={formState.departDate} />
            </div>

            <div className={styles['form-item-small']}>
              <label>Return</label>
              <DatePicker onDateChange={onFormChange.bind(this, "returnDate")} startDate={formState.returnDate} />
            </div>

            <div className={styles['form-item']}>
              <label>Cabin Class & Traverls</label>
              <AdditionalTravelInfo onDataChange={onFormChange.bind(this, "additionalInfo")} initData={formState.additionalInfo} />
            </div>
          </div>

          <div className={styles['footer']}>
            <CheckBox label="Non-stop flights" initState={formState.isNonStopFlights} onDataChange={onFormChange.bind(this, "isNonStopFlights")} />
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
