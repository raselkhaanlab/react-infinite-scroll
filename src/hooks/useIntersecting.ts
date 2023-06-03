import { useEffect, useRef, useState } from "react";

export const useIntersecting = (options?:IntersectionObserverInit) =>{
  const elementRef = useRef(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);
  
  useEffect(()=>{
    
    const observerOptions = {threshold:1, ...(options ? options : {})}
     
    observer.current = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=> {
        setIsIntersecting(entry.isIntersecting);
      });
    },observerOptions);

    if(elementRef.current) {
      observer.current.observe(elementRef.current);
    }

    return ()=>{
      if(observer.current) observer.current.disconnect();
    }
  },[elementRef, options]);

  return {elementRef, isIntersecting};
};

