import { useState, useEffect } from 'react'

let PREFIX = "chess-"

export const useLocalStorage = (key, value) => {

    key = PREFIX + key;

    const [storedValue, setStoredValue] = useState(() => {
        const fetchedValue = localStorage.getItem(key);
        if (fetchedValue !== null) return JSON.parse(fetchedValue);
        return value;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(storedValue));
    }, [storedValue, key]);

    return [storedValue, setStoredValue];

}