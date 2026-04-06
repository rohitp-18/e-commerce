import { useEffect, useState } from "react";

function useDebounce(value, delay) {
  const [debounceVal, setDebounceVal] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceVal(value);
    }, delay);

    return () => clearTimeout(timer);
  });

  return debounceVal;
}

export default useDebounce;
