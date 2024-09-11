import { useState, useEffect } from 'react';

/*
  Defines a custom React hook that synchronizes a state variable with the browser’s localStorage. 
  - This hook helps persist values across browser sessions by storing them in localStorage. 
  - It also listens for changes to localStorage, ensuring that if the stored value changes 
    elsewhere (e.g., in another tab), it gets updated.
*/

function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        // retrieve the item that is stored in the local storage of the browser
        const storedValue = localStorage.getItem(key);

        if (storedValue === null) {
            return defaultValue;
        }

        return JSON.parse(storedValue);
    });

    useEffect(() => {
        // The event listener checks if the change is happening in localStorage and whether the key 
        // being changed matches the provided key.
        const listener = (e) => {
            if (e.storageArea === localStorage && e.key === key) {
                setValue(JSON.parse(e.newValue));
            }
        };
        // Adds the storage event listener when the component mounts.
        window.addEventListener('storage', listener);

        // Cleans up the event listener when the component unmounts.
        return () => {
            window.removeEventListener('storage', listener);
        };

    }, [value, key]);

    // updates both the localStorage value and the state.
    const setValueInLocalStorage = (newValue) => {
        setValue((currentValue) => {
            let result;
            // If newValue is a func. Allows setting state based on the previous state, which is important 
            // for cases like counters or toggles.
            if (typeof newValue === 'function') {
                result = newValue(currentValue);
            } else {
                result = newValue;
            }

            localStorage.setItem(key, JSON.stringify(result));

            return result;
        });
    };

    // value: The current state synchronized with localStorage.
    // setValueInLocalStorage: The function to update the state and localStorage simultaneously.
    return [value, setValueInLocalStorage];
}

export default useLocalStorage;