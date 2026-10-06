import { useEffect, useState } from "react";

export const useDebounce = (cb: string, delay: number) => {
  const [debancedValue, setDebouncedValue] = useState(cb);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(cb);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [cb]);
  return debancedValue;
};
