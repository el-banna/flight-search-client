import React, { useState, useEffect, useCallback, useRef } from 'react';
import { debounce } from 'lodash';
import styles from './auto-suggest.module.scss';
import LoadingSpinner from '../loading-spinner';
import { ReactComponent as ListItemIcon } from '../../assets/list-item-icon.svg';

const SERVER_URL = "https://flight-search-server.banna.now.sh/airports";
// const SERVER_URL = "http://localhost:1337/airports";

function AutoSuggest({ onAirportSelected, selectedAirport }) {
  const [autoSuggestList, setAutoSuggestList] = useState([]);
  const [isSuggestListVisible, setIsSuggestListVisible] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputEl = useRef(null);

  useEffect(() => {
    if (selectedAirport) {
      updateInputField(selectedAirport);
    }
  }, [selectedAirport])

  const fetchAirports = useCallback(debounce(
    newQuery => {
      if (newQuery.length > 2) {
        setIsLoading(true);

        fetch(`${SERVER_URL}?query=${newQuery}`)
          .then(res => res.json())
          .then(items => {
            // this if condition is meant to handle race conditions that might result from typing fast
            if (newQuery === inputEl.current.value) {
              setAutoSuggestList(items);
              setIsSuggestListVisible(true);
              setIsLoading(false);
            }
          });

      } else {
        setIsSuggestListVisible(false);
      }
    }, 500),
    []);

  function handleQueryChange(event) {
    let newQuery = event.target.value;
    setQuery(newQuery);

    fetchAirports(newQuery);
  }

  function onBlur() {
    if (selectedAirport) {
      updateInputField(selectedAirport);
    }
    setIsSuggestListVisible(false)
  }

  function handleAirportSelected(airportIndex) {
    const selectedAirport = autoSuggestList[airportIndex];
    onAirportSelected(selectedAirport);
    updateInputField(selectedAirport);
  }

  function updateInputField(selectedAirport) {
    setQuery(`${selectedAirport.name} ${selectedAirport.iata}`);
  }

  function getHighlightedText(text) {
    const pattern = new RegExp(query, 'i')
    if (pattern.test(text)) {
      const stringParts = text.split(pattern);
      if (stringParts.length === 1) {
        return (
          <>
            <strong>{stringParts[0]}</strong>
          </>
        );
      }
      else if (stringParts.length === 3) {
        return (
          <>
            <span>{stringParts[0]}</span><strong>{text.match(pattern)[0]}</strong><span>{stringParts[2]}</span>
          </>
        );
      } else {
        // either the first part is the matching part or the second one
        if (pattern.test(stringParts[0])) {
          return (
            <>
              <strong>{text.match(pattern)[0]}</strong><span>{stringParts[1]}</span>
            </>
          );
        } else {
          return (
            <>
              <span>{stringParts[0]}</span><strong>{text.match(pattern)[0]}</strong>
            </>
          );
        }
      }
    }
    return <span>{text}</span>;
  }

  return (
    <div className={styles['container']} onBlur={onBlur} >
      {isLoading &&
        <div className={styles['loading-spinner']}>
          <LoadingSpinner />
        </div>
      }
      <input ref={inputEl} type="text" value={query} onChange={handleQueryChange} />

      {isSuggestListVisible &&
        <div className={styles['arrow-up']}></div>
      }
      {isSuggestListVisible &&
        <ul className={styles['list']}>
          {autoSuggestList.map((item, index) => {
            return (
              <li className="" key={index} onMouseDown={handleAirportSelected.bind(this, index)}>
                <ListItemIcon />
                <div className="">
                  <div>{getHighlightedText(item.name)} {item.iata && getHighlightedText(item.iata)}</div>
                  <div className={styles['country']}>{getHighlightedText(item.country)}</div>
                </div>
              </li>
            );
          })}
          {autoSuggestList.length === 0 && <li className={styles['no-result-found']}>No result found</li>}
        </ul>
      }
    </div>
  );
}

export default AutoSuggest;
