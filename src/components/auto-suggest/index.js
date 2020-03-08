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
    setIsSuggestListVisible(false);

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
    if (!text) return null;

    const pattern = new RegExp(query, 'i');
    const matchResult = text.match(pattern);
    if (matchResult) {
      let index = matchResult.index;
      debugger;

      if (index === 0 && text.length === query.length) {
        return <strong>{text}</strong>;
      }
      else if (index === 0 && text.length !== query.length) {
        // highlight is on the left
        return (
          <>
            <strong>{text.substring(0, query.length)}</strong>
            <span>{text.substring(query.length, text.length)}</span>
          </>
        );
      }
      else if (index > 0 && index + query.length === text.length) {
        // highlight is on the right
        return (
          <>
            <span>{text.substring(0, index)}</span>
            <strong>{text.substring(index, text.length)}</strong>
          </>
        );
      }
      else {
        // highlight is in between both sides
        return (
          <>
            <span>{text.substring(0, index)}</span>
            <strong>{text.substring(index, index + query.length)}</strong>
            <span>{text.substring(index + query.length, text.length)}</span>
          </>
        );
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
                  <div>{getHighlightedText(item.name)} {item.iata && <>({getHighlightedText(item.iata)})</>}</div>
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
