import { useEffect, useRef, useState } from "react";

export const useDebounce = <T>(value:T, delay:number)=>{
  const [debounceValue, setDebounceValue] = useState<T | null>(null);
  const timeoutId = useRef<number | null>(null);
  
  useEffect(()=>{
    if(timeoutId.current) clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(()=> {
      setDebounceValue(value);
    }, delay);

    return ()=>{
      if(timeoutId.current) clearTimeout(timeoutId.current);
    }
  },[value, delay]);

  return debounceValue;
}