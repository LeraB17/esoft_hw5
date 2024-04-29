import { useEffect, useState } from "react";

export const useDebounce = (value, delay = 1000) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("start");
      setDebouncedValue(value);
    }, delay);

    return () => {
      console.log("end");
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
